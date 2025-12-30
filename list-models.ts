
import { GoogleGenAI } from "@google/genai";
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
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    try {
        const response: any = await ai.models.list();
        console.log("Available Models:");

        if (response.pageInternal) {
            response.pageInternal.forEach((m: any) => console.log(m.name));
        } else {
            console.log("Raw response (no pageInternal):", response);
        }
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
