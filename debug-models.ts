
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key");
        process.exit(1);
    }

    console.log("Initializing client with key:", apiKey.substring(0, 8) + "...");

    try {
        // Attempt to verify model availability by listing them (if supported) 
        // or by trying a simple generation with a known stable model.
        // The @google/genai package might not expose listModels directly on the client instance the same way.
        // Let's try to infer from a simple request to 'gemini-1.5-flash'

        const client = new GoogleGenAI({ apiKey });

        console.log("Testing gemini-1.5-flash-latest...");
        try {
            const response = await client.models.generateContent({
                model: 'gemini-1.5-flash-latest',
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log("✅ gemini-1.5-flash-latest WORKED!");
        } catch (e: any) {
            console.log("❌ gemini-1.5-flash-latest failed:", e.message);
        }

        console.log("Testing gemini-1.5-flash...");
        try {
            const response = await client.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log("✅ gemini-1.5-flash WORKED!");
        } catch (e: any) {
            console.log("❌ gemini-1.5-flash failed:", e.message);
        }

        console.log("Testing models/gemini-1.5-flash...");
        try {
            const response = await client.models.generateContent({
                model: 'models/gemini-1.5-flash',
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log("✅ models/gemini-1.5-flash WORKED!");
        } catch (e: any) {
            console.log("❌ models/gemini-1.5-flash failed:", e.message);
        }

        console.log("Testing gemini-pro...");
        try {
            const response = await client.models.generateContent({
                model: 'gemini-pro',
                contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
            });
            console.log("✅ gemini-pro WORKED!");
        } catch (e: any) {
            console.log("❌ gemini-pro failed:", e.message);
        }


    } catch (e: any) {
        console.error("Fatal Error:", e);
    }
}

listModels();
