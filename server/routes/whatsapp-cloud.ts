import { Request, Response } from 'express';
import { processUserMessage } from '../services/chat';
import axios from 'axios';

const VERIFY_TOKEN = process.env.WHATSAPP_CLOUD_VERIFY_TOKEN || 'osikani_secure_token';
const WHATSAPP_TOKEN = process.env.WHATSAPP_CLOUD_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_CLOUD_PHONE_ID;

// 1. Webhook Verification (Required by Meta)
export const verifyCloudWebhook = (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
};

// 2. Message Handling
export const handleCloudMessage = async (req: Request, res: Response) => {
    const body = req.body;

    // Check if it's a WhatsApp status update or message
    if (body.object) {
        if (
            body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0].value.messages &&
            body.entry[0].changes[0].value.messages[0]
        ) {
            const message = body.entry[0].changes[0].value.messages[0];
            const from = message.from; // User's phone number
            const messageBody = message.text?.body || "";

            // Only process text messages for now
            if (message.type === 'text') {
                try {
                    console.log(`📩 Cloud API Message from ${from}: ${messageBody}`);

                    // Call the Shared Brain
                    const aiResponse = await processUserMessage(messageBody, [], null, null, from);

                    // Reply via Cloud API
                    await sendMessage(from, aiResponse.text);
                } catch (error) {
                    console.error('Error processing Cloud API message:', error);
                }
            }
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

// 3. Send Message Helper (Exported for Campaigns)
export const sendMessage = async (to: string, text: string) => {
    try {
        if (!process.env.WHATSAPP_CLOUD_PHONE_ID || !process.env.WHATSAPP_CLOUD_TOKEN) {
            console.error("Missing Cloud API Credentials");
            return;
        }
        await axios.post(
            `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_CLOUD_PHONE_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to,
                text: { body: text },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error: any) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
};
