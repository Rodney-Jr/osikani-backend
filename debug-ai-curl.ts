
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGemini2() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key");
        return;
    }

    // Try Gemini 2.0 Flash Experimental as seen in list
    const model = 'gemini-2.0-flash-exp';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`Testing ${model}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hello, are you online?" }] }]
            })
        });

        if (!response.ok) {
            console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response Body:", text);
        } else {
            const data = await response.json();
            console.log("✅ Success! Model responded.");
            // console.log(JSON.stringify(data, null, 2));
            console.log(data.candidates?.[0]?.content?.parts?.[0]?.text);
        }

    } catch (e: any) {
        console.error("Fetch Error:", e.message);
    }
}

testGemini2();
