
import { Request, Response } from 'express';
import { processUserMessage } from '../services/chat';

export const generateChatResponse = async (req: Request, res: Response) => {
    const { message, history, context, audioData, userId } = req.body;

    try {
        const response = await processUserMessage(message, history, audioData, context, userId || "web-user");
        res.json(response);
    } catch (error: any) {
        console.error("Chat Route Error:", error);
        const statusCode = error.message === "Message or audio data required" ? 400 : 500;
        res.status(statusCode).json({
            text: "Sorry o, my brain dey buffer (Server Error). Try again.",
            securityLogs: ["Error: Operation Failed", error.message]
        });
    }
};
