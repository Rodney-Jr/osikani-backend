
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelsToTest = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash-001',
        'gemini-pro',
        'gemini-1.0-pro',
        'gemini-2.0-flash-exp'
    ];

    console.log("🔍 Testing Gemini Models with @google/generative-ai...");

    for (const modelName of modelsToTest) {
        console.log(`\nTesting: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you online?");
            const response = await result.response;
            const text = response.text();

            if (text) {
                console.log(`✅ SUCCESS: ${modelName} responded!`);
                console.log(`   Response: "${text.substring(0, 50)}..."`);
                return; // Stop after finding the first working model
            }
        } catch (error: any) {
            console.log(`❌ FAILED: ${modelName}`);
            // console.log(`   Error: ${error.message}`);
            if (error.message.includes("404")) console.log("   Reason: 404 Not Found (Invalid Name)");
            else if (error.message.includes("429")) console.log("   Reason: 429 Rate Limit");
            else console.log(`   Reason: ${error.message.substring(0, 100)}`);
        }
    }
}

testModels();
