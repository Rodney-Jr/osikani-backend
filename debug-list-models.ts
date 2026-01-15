
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { console.log("NO_KEY"); return; }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            data.models.forEach((m: any) => {
                // Return generic resource name 'models/gemini-pro'
                console.log(m.name);
            });
        } else {
            console.log("NO_MODELS_FOUND");
            console.log(JSON.stringify(data));
        }
    } catch (e: any) {
        console.log("ERROR_" + e.message);
    }
}
listModels();
