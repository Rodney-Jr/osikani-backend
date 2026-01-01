
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateChatResponse } from './routes/chat';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Required for Twilio Webhooks

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'Osikani BFF' });
});


import { ragRouter } from './routes/rag';
import { handleWhatsAppMessage } from './routes/whatsapp';

app.use('/api/rag', ragRouter);
app.post('/api/chat', generateChatResponse);
app.post('/api/whatsapp', handleWhatsAppMessage);

// Static Serving for Production
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../client');
    app.use(express.static(clientDistPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Osikani BFF running on modified port ${PORT}`);
});
