
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function listModels() {
    console.log("Key length:", process.env.GEMINI_API_KEY?.length);
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    try {
        // GoogleGenerativeAI class doesn't have a direct 'models.list()' method in standard usage of this SDK version?
        // Actually, for this SDK, listing models is often done via a different manager or simple HTTP request.
        // Let's use a raw fetch to be sure since the SDK might not expose it easily on the main client.
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const fetchRes = await fetch(url);
        const data = await fetchRes.json();

        console.log("Available Models:");
        if (data.models) {
            data.models.forEach((m: any) => console.log(m.name));
        } else {
            console.log("Raw response:", data);
        }
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
