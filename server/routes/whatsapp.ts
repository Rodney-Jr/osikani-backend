
import { Request, Response } from 'express';
import twilio from 'twilio';
import { processUserMessage } from '../services/chat';

const { MessagingResponse } = twilio.twiml;

export const handleWhatsAppMessage = async (req: Request, res: Response) => {
    // Twilio sends data as application/x-www-form-urlencoded
    const messageBody = req.body.Body || "";
    const sender = req.body.From; // e.g., "whatsapp:+1234567890"

    console.log(`WhatsApp Message from ${sender}: ${messageBody}`);

    const twiml = new MessagingResponse();

    try {
        // Send typing indicator (optional, but good UX)
        // Note: TwiML for typing isn't standard in free tier sometimes, keeping it simple.

        // Process with AI
        // Pass sender as phoneNumber for persistence
        const response = await processUserMessage(
            messageBody,
            [], // No history for MVP yet
            null,
            `User is chatting via WhatsApp. Phone: ${sender}`,
            sender
        );

        // Reply with TwiML
        twiml.message(response.text);

    } catch (error: any) {
        console.error("WhatsApp Error:", error);
        twiml.message("Sorry, Osikani is momentarily unavailable. Please try again later.");
    }

    res.type('text/xml').send(twiml.toString());
};
