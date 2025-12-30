
try {
    const body = new URLSearchParams();
    body.append('Body', 'Debug Check');
    body.append('From', 'whatsapp:+simulated');

    console.log("Sending simulation request...");
    const response = await fetch('http://localhost:3001/api/whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', text);
} catch (error) {
    console.error('Connection Error:', error);
}
