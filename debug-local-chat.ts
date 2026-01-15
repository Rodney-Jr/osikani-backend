
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testChat() {
    const url = 'http://localhost:3002/api/chat/generate';
    console.log(`Testing Backend Chat Endpoint at ${url}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "My name is Kofi.",
                userId: "debug-user-" + Date.now(),
                history: [
                    { role: 'model', content: "Welcome! Tell me your name." },
                    { role: 'user', content: "My name is Kofi." }
                ]
            })
        });

        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log("Response:", text);

    } catch (error: any) {
        console.error("Fetch Error:", error.cause || error);
    }
}

testChat();
