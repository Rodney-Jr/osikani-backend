import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const createGameFromContent = async (title: string, textContent: string) => {
    // 1. Prompt Gemini to create questions
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `You are an expert educational game designer for children.
    Analyze the following text and extract 5 key learning concepts.
    Convert these concepts into multiple-choice trivia questions for a WhatsApp-based game.
    
    Content:
    "${textContent.substring(0, 10000)}"
    
    Output Format (JSON Array):
    [
        {
            "id": "q1",
            "question": "What is ...?",
            "options": ["A", "B", "C"],
            "correctAnswer": "A",
            "explanation": "Because..."
        }
    ]`
                    }
                ]
            }
        ]
    });

    const response = result.response;
    const resultText = response.text() || "[]";
    const jsonString = resultText.replace(/```json|```/g, "").trim();

    try {
        const questions = JSON.parse(jsonString);

        // 2. Save to Database
        const game = await prisma.gameModule.create({
            data: {
                title,
                rawContent: textContent,
                questions: JSON.stringify(questions)
            }
        });

        return game;
    } catch (e) {
        console.error("Failed to parse AI game generation", e);
        throw new Error("AI failed to generate valid JSON");
    }
};

export const getGameSession = async (userId: string, moduleId: string) => {
    let session = await prisma.gameSession.findFirst({
        where: { userId, moduleId, status: "IN_PROGRESS" }
    });

    if (!session) {
        session = await prisma.gameSession.create({
            data: {
                userId,
                moduleId,
                status: "IN_PROGRESS"
            }
        });
    }
    return session;
};
