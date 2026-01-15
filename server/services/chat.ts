
import { GoogleGenerativeAI } from '@google/generative-ai';
import { runSecurityGateway, SEMANTIC_AUDIT_INSTRUCTION } from './security';
import { searchKnowledgeBase } from './rag';
import { OSIKANI_SYSTEM_INSTRUCTION } from '../constants';
import { getOrCreateUser, getUserProfile } from './userService';
import { logTransaction, checkLoanReadiness, createSavingsGoal, updateUserProfile } from './toolService';
import { processGameMove } from './gameEngine'; // Gamification

let genAI: GoogleGenerativeAI | null = null;
const getClient = () => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API Key is missing from server environment.");
        genAI = new GoogleGenerativeAI(apiKey);
    }
    return genAI;
};

export interface ChatResponse {
    text: string;
    confidence: number;
    securityLogs: string[];
}

// Tool Definitions
// Note: SDK types use 'object', 'string' etc directly
const TOOLS: any[] = [
    {
        functionDeclarations: [
            {
                name: "logTransaction",
                description: "Log a financial transaction (income/expense) for the user.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        type: { type: "STRING", enum: ["INCOME", "EXPENSE"] },
                        amount: { type: "NUMBER", description: "Amount in Cedis (GHS)" },
                        category: { type: "STRING", description: "Category e.g., Food, Transport, Sales" },
                        description: { type: "STRING", description: "Short description of the item" }
                    },
                    required: ["type", "amount", "category"]
                }
            },
            {
                name: "checkLoanReadiness",
                description: "Check if the user is ready for a loan based on their transaction history.",
                parameters: {
                    type: "OBJECT",
                    properties: {},
                }
            },
            {
                name: "createSavingsGoal",
                description: "Create a new savings goal for the user.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        title: { type: "STRING", description: "Title of the goal e.g. Paying School Fees" },
                        targetAmount: { type: "NUMBER", description: "Target amount in GHS" }
                    },
                    required: ["title", "targetAmount"]
                }
            },
            {
                name: "listMarketplaceProducts",
                description: "Find digital products (Ebooks, Tools) to sell to the user when they need help.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        category: { type: "STRING", enum: ["EBOOK", "TOOL"] }
                    }
                }
            },
            {
                name: "recommendSubscription",
                description: "Recommend upgrading to Osikani Plus or Pro when user needs continuous help.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        tier: { type: "STRING", enum: ["PLUS", "PRO"] },
                        reason: { type: "STRING" }
                    },
                    required: ["tier", "reason"]
                }
            },
            {
                name: "updateUserProfile",
                description: "Update the user's profile with their Name and Business Type during onboarding.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        name: { type: "STRING", description: "The user's name" },
                        businessType: { type: "STRING", description: "What they do (e.g., Market Trader, Student)" },
                        age: { type: "NUMBER", description: "User's age (optional)" },
                        gender: { type: "STRING", description: "Gender (Male/Female/Other) (optional)" },
                        location: { type: "STRING", description: "City or Town (optional)" }
                    },
                    required: ["name", "businessType"]
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
    const client = getClient();
    let user = null;

    try {
        // Fetch or Create User & Context
        user = await getOrCreateUser(phoneNumber);
        const profile = await getUserProfile(phoneNumber);

        let userContext = `\n\n**USER PROFILE:**\nName: ${user?.name || 'Friend'}\nPhone: ${user?.phoneNumber || phoneNumber}\nCurrency: ${profile?.profile?.currency || 'GHS'}`;

        if (profile?.transactions && profile.transactions.length > 0) {
            userContext += `\n\n**RECENT TRANSACTIONS:**\n${profile.transactions.map((t: any) => `- ${t.date.toISOString().split('T')[0]}: ${t.type} ${t.amount} (${t.category})`).join('\n')}`;
        }

        let fullSystemInstruction = OSIKANI_SYSTEM_INSTRUCTION + userContext;

        // Onboarding Check
        if (!user.onboarding) {
            const onboardingInstruction = `
\n\n**CRITICAL: NEW USER DETECTED**
The UI has just asked the user for their **Name, Business, and Location**.
IF the user's message contains this information (e.g., "I am Ama, a seamstress in Accra"):
   - Call the \`updateUserProfile\` tool IMMEDIATELY with the extracted details (Name, Business, Location).
   - If Age or Gender is missing, you can infer Gender from name if obvious, or ask for Age politely in the next turn.

IF the user's message does NOT contain this info (e.g. just "Hi"):
   - Ask for their Name, Business, and Location again in Ghanaian English.
`;
            fullSystemInstruction += onboardingInstruction;
        }

        if (context) userContext += `\n\n**ADDITIONAL CONTEXT:**\n${context}`;

        // 0. Gamification Interceptor (Skipped for brevity/focus)
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
        if (scan.logs) securityLogs.push(...scan.logs);

        if (!scan.isSafe) {
            securityLogs.push(`🛑 BLOCK: ${scan.threatsDetected.join(", ")}`);
            return {
                text: "Chale, I no fit process that request. My security sensors dey ring.",
                confidence: 0,
                securityLogs
            };
        }

        // LAYER 3: CORE INFERENCE
        // Switching to Gemini 2.5 Flash (Fresh Quota)
        // const modelName = 'models/gemini-2.0-flash-lite-preview-02-05';
        const modelName = 'models/gemini-2.5-flash';
        fullSystemInstruction += "\n\nCRITICAL INSTRUCTION: If the user describes a financial event (sale, purchase, expense, income), YOU MUST call the `logTransaction` tool immediately. Do not ask for more details if the amount and category are clear.";

        // RAG Search
        const ragResults = await searchKnowledgeBase(message || "");
        if (ragResults.length > 0) {
            fullSystemInstruction += `\n\n**KNOWLEDGE BASE (RAG):**\n${ragResults.join("\n---\n")}`;
            securityLogs.push(`RAG: Found ${ragResults.length} relevant documents.`);
        }

        const parts: any[] = [{ text: scan.redactedText }];
        if (audioData) {
            // New SDK Format for inline data?
            parts.push({ inlineData: { mimeType: "audio/mp3", data: audioData } });
        }

        // Sanitize History
        // Gemini SDK requires history to start with 'user'. 
        // We filter out any leading 'model' messages (like the welcome message).
        let safeHistory = Array.isArray(history) ? history.map((msg: any) => ({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
            parts: msg.parts || [{ text: msg.content || "" }]
        })) : [];

        // Find first user message
        const firstUserIndex = safeHistory.findIndex(msg => msg.role === 'user');
        if (firstUserIndex === -1) {
            safeHistory = []; // No user messages? Reset history.
        } else {
            safeHistory = safeHistory.slice(firstUserIndex); // Start from first proper user interaction
        }

        // --- FIRST CALL (Logic decision) ---
        const model = client.getGenerativeModel({
            model: modelName,
            systemInstruction: fullSystemInstruction,
            tools: TOOLS
        });

        const chat = model.startChat({
            history: safeHistory
        });

        const result = await chat.sendMessage(parts);
        const response = result.response;
        const text = response.text();
        const functionCalls = response.functionCalls();

        // Check for Function Call
        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            const { name } = call;
            const args: any = call.args;
            securityLogs.push(`🤖 TOOL USE: Calling ${name}...`);

            let toolResult: any = { message: "Tool execution failed" };

            // Execute Tool
            if (name === 'logTransaction') {
                toolResult = await logTransaction(user.id, args.type as any, args.amount as number, args.category as string, args.description as string);
            } else if (name === 'checkLoanReadiness') {
                toolResult = await checkLoanReadiness(user.id);
            } else if (name === 'createSavingsGoal') {
                toolResult = await createSavingsGoal(user.id, args.title as string, args.targetAmount as number);
            } else if (name === 'listMarketplaceProducts') {
                const { listProducts } = await import('./subscriptionService');
                const products = await listProducts(args.category as any);
                toolResult = products.map(p => ({
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    action: `[BUY NOW: ${p.title} for GHS ${p.price}]`
                }));
            } else if (name === 'recommendSubscription') {
                toolResult = {
                    message: "Offer generated. Encourage user to upgrade.",
                    link: `/pricing?tier=${args.tier}`,
                    tier: args.tier
                };
            } else if (name === 'updateUserProfile') {
                toolResult = await updateUserProfile(user.id, args.name, args.businessType, args.age, args.gender, args.location);
            }

            // --- SECOND CALL (Response Generation with Tool Output) ---
            // New SDK handles history automatically in chat session, but we need to feed the tool result back
            const result2 = await chat.sendMessage([
                {
                    functionResponse: {
                        name: name,
                        response: { result: toolResult }
                    }
                }
            ]);

            return {
                text: result2.response.text(),
                confidence: scan.confidenceScore,
                securityLogs: [...securityLogs, `Tool Output: ${JSON.stringify(toolResult).substring(0, 50)}...`]
            };
        }

        return {
            text: text || "I dey listen.",
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
