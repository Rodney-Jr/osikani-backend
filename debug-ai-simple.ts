
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing from .env");
        return;
    }
    console.log("✅ API Key found:", apiKey.substring(0, 5) + "...");

    try {
        const client = new GoogleGenAI({ apiKey });
        const model = client.models.generateContent; // correct access for @google/genai? 
        // Checking usage in chat.ts: client.models.generateContent({ model: ..., contents: ... })
        // Wait, chat.ts uses: client.models.generateContent

        console.log("Attempting to connect to Gemini...");

        // List models to debug "NOT_FOUND" 
        // This is a hypothetical method, checking SDK docs or assuming standard list call
        try {
            // Note: The @google/genai SDK might be the new one (0.0.1 or similar) or the Google AI Studio one. 
            // Checking package.json... it said @google/genai ^1.33.0?? No, package.json said "@google/genai": "^1.33.0" ??
            // Actually package.json said "@google/genai": "^0.1.1" usually or similar. 
            // Wait, step 13 showed "@google/genai": "^1.33.0". That version number is huge for the new SDK. 
            // Maybe it is "@google/generative-ai"? 

            // Let's try to just list models if possible, or try a known safe model 'gemini-pro'

            const response = await client.models.generateContent({
                model: 'gemini-1.5-flash', // Try without 'models/' again, maybe previous failure was unrelated?
                contents: [{ role: 'user', parts: [{ text: "Hello" }] }]
            });
            console.log("✅ Response received:", response.text);

        } catch (e) {
            console.log("Error with gemini-1.5-flash");
        }

        try {
            console.log("Trying 'gemini-pro'...");
            const response = await client.models.generateContent({
                model: 'gemini-pro',
                contents: [{ role: 'user', parts: [{ text: "Hello" }] }]
            });
            console.log("✅ Response received for gemini-pro:", response.text);
        } catch (e: any) {
            console.log("Error with gemini-pro:", e.message);
        }

    } catch (error: any) {
        console.error("❌ Gemini API Error:", error.message);
        if (error.response) {
            console.error("Response data:", JSON.stringify(error.response, null, 2));
        }
    }
}

testGemini();
