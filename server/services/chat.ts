
import { GoogleGenAI, Type } from '@google/genai';
import { runSecurityGateway, SEMANTIC_AUDIT_INSTRUCTION } from './security';
import { searchKnowledgeBase } from './rag';
import { OSIKANI_SYSTEM_INSTRUCTION } from '../constants';
import { getOrCreateUser, getUserProfile } from './userService';
import { logTransaction, checkLoanReadiness, createSavingsGoal } from './toolService';
import { processGameMove } from './gameEngine'; // Gamification

let client: GoogleGenAI | null = null;
const getClient = () => {
    if (!client) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API Key is missing from server environment.");
        client = new GoogleGenAI({ apiKey });
    }
    return client;
};

export interface ChatResponse {
    text: string;
    confidence: number;
    securityLogs: string[];
}

// Tool Definitions
const TOOLS: any[] = [
    {
        functionDeclarations: [
            {
                name: "logTransaction",
                description: "Log a financial transaction (income/expense) for the user.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        type: { type: Type.STRING, enum: ["INCOME", "EXPENSE"] },
                        amount: { type: Type.NUMBER, description: "Amount in Cedis (GHS)" },
                        category: { type: Type.STRING, description: "Category e.g., Food, Transport, Sales" },
                        description: { type: Type.STRING, description: "Short description of the item" }
                    },
                    required: ["type", "amount", "category"]
                }
            },
            {
                name: "checkLoanReadiness",
                description: "Check if the user is ready for a loan based on their transaction history.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {},
                }
            },
            {
                name: "createSavingsGoal",
                description: "Create a new savings goal for the user.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "Title of the goal e.g. Paying School Fees" },
                        targetAmount: { type: Type.NUMBER, description: "Target amount in GHS" }
                    },
                    required: ["title", "targetAmount"]
                }
            }
        ]
    }
];

export const processUserMessage = async (
    message: string,
    history: any[] = [],
    audioData: string | null = null,
    context: string | null = null,
    phoneNumber: string = "web-user" // Default for web, overridden by WhatsApp
): Promise<ChatResponse> => {

    if (!message && !audioData) {
        throw new Error("Message or audio data required");
    }

    const securityLogs: string[] = [];
    const ai = getClient();
    let user = null;

    try {
        // Fetch or Create User & Context
        user = await getOrCreateUser(phoneNumber);
        const profile = await getUserProfile(phoneNumber);

        let userContext = `\n\n**USER PROFILE:**\nName: ${user?.name || 'Friend'}\nPhone: ${user?.phoneNumber || phoneNumber}\nCurrency: ${profile?.profile?.currency || 'GHS'}`;

        if (profile?.transactions && profile.transactions.length > 0) {
            userContext += `\n\n**RECENT TRANSACTIONS:**\n${profile.transactions.map((t: any) => `- ${t.date.toISOString().split('T')[0]}: ${t.type} ${t.amount} (${t.category})`).join('\n')}`;
        }

        if (context) userContext += `\n\n**ADDITIONAL CONTEXT:**\n${context}`;

        // 0. Gamification Interceptor
        // If the user is in an active game session, the Game Engine takes over.
        try {
            const gameResponse = await processGameMove(phoneNumber, message);
            if (gameResponse) {
                return {
                    text: gameResponse,
                    confidence: 1,
                    securityLogs: ["Game Engine: Active Session handled response."]
                };
            }
        } catch (e) {
            console.warn("Game Engine skipped (DB not ready?)");
        }

        // LAYER 1: SECURITY GATEWAY
        const scan = await runSecurityGateway(message, audioData);
        const securityLogs = scan.logs ? [...scan.logs] : [];

        if (!scan.isSafe) {
            securityLogs.push(`🛑 BLOCK: ${scan.threatsDetected.join(", ")}`);
            return {
                text: "Chale, I no fit process that request. My security sensors dey ring.",
                confidence: 0,
                securityLogs
            };
        }

        // LAYER 2: SEMANTIC AI AUDIT
        if (scan.isSemanticScanRequired) {
            securityLogs.push("Semantic Audit: Skipped (Optimization)");
        }

        // LAYER 3: CORE INFERENCE
        const modelName = 'gemini-flash-latest';
        let fullSystemInstruction = OSIKANI_SYSTEM_INSTRUCTION + userContext;
        fullSystemInstruction += "\n\nCRITICAL INSTRUCTION: If the user describes a financial event (sale, purchase, expense, income), YOU MUST call the `logTransaction` tool immediately. Do not ask for more details if the amount and category are clear.";

        // RAG Search
        const ragResults = await searchKnowledgeBase(message || "");
        if (ragResults.length > 0) {
            fullSystemInstruction += `\n\n**KNOWLEDGE BASE (RAG):**\n${ragResults.join("\n---\n")}`;
            securityLogs.push(`RAG: Found ${ragResults.length} relevant documents.`);
        }

        const parts: any[] = [{ text: scan.redactedText }];
        if (audioData) {
            parts.push({ inlineData: audioData });
        }

        // Sanitize History
        const safeHistory = Array.isArray(history) ? history.map((msg: any) => ({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
            parts: msg.parts || [{ text: msg.content || "" }]
        })) : [];

        const contents = [
            ...safeHistory,
            { role: 'user', parts }
        ];

        // --- FIRST CALL (Logic decision) ---
        const initialResponse = await ai.models.generateContent({
            model: modelName,
            contents,
            tools: TOOLS,
            config: {
                systemInstruction: fullSystemInstruction,
                temperature: 0.65,
            },
        });

        // Check for Function Call - SDK Agnostic Access
        const candidates = initialResponse.candidates;
        const firstCandidate = candidates && candidates[0];
        const firstPart = firstCandidate?.content?.parts?.[0];
        const functionCall = firstPart?.functionCall;

        if (functionCall) {
            const { name, args } = functionCall;
            securityLogs.push(`🤖 TOOL USE: Calling ${name}...`);

            let toolResult: any = { message: "Tool execution failed" };

            // Execute Tool
            if (name === 'logTransaction') {
                toolResult = await logTransaction(user.id, args.type as any, args.amount as number, args.category as string, args.description as string);
            } else if (name === 'checkLoanReadiness') {
                toolResult = await checkLoanReadiness(user.id);
            } else if (name === 'createSavingsGoal') {
                toolResult = await createSavingsGoal(user.id, args.title as string, args.targetAmount as number);
            }

            // --- SECOND CALL (Response Generation) ---
            const response2 = await ai.models.generateContent({
                model: modelName,
                contents: [
                    ...contents,
                    { role: 'model', parts: [firstPart] },
                    { role: 'function', parts: [{ functionResponse: { name, response: { result: toolResult } } }] }
                ],
                config: {
                    systemInstruction: fullSystemInstruction
                }
            });

            return {
                text: response2.text || "Transaction processed.",
                confidence: scan.confidenceScore,
                securityLogs: [...securityLogs, `Tool Output: ${JSON.stringify(toolResult).substring(0, 50)}...`]
            };
        }

        return {
            text: initialResponse.text || "I dey listen.",
            confidence: scan.confidenceScore,
            securityLogs
        };

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return {
            text: "Sorry o, connection error. Try again.",
            confidence: 0,
            securityLogs: ["Error: " + error.message]
        };
    }
};
