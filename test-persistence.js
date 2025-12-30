
try {
    const body = new URLSearchParams();
    body.append('Body', 'I sold 50 cedis of corn today');
    body.append('From', 'whatsapp:+15550005678'); // Unique dummy number 2

    console.log("Sending transaction request...");
    const response = await fetch('http://localhost:3001/api/whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response TwiML:', text);

} catch (error) {
    console.error('Connection Error:', error);
}
