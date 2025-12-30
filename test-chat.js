
try {
    const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Hello Osikani Refactored',
            history: []
        })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
} catch (error) {
    console.error('Connection Error:', error);
}
