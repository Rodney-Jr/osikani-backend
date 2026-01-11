
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
import { verifyCloudWebhook, handleCloudMessage } from './routes/whatsapp-cloud';

app.use('/api/rag', ragRouter);
app.post('/api/chat', generateChatResponse);

// Twilio Adapter
app.post('/api/whatsapp', handleWhatsAppMessage);

// Meta Cloud API Adapter (Parallel)
app.get('/api/whatsapp-cloud', verifyCloudWebhook);
app.post('/api/whatsapp-cloud', handleCloudMessage);

// Gamification
import { gamificationRouter } from './routes/gamification';
app.use('/api/gamify', gamificationRouter);

// Campaigns & Broadcasts
import { campaignRouter } from './routes/campaigns';
app.use('/api/campaigns', campaignRouter);

// Partner Portal
import { partnerRouter } from './routes/partner';
app.use('/api/partner', partnerRouter);

// Static Serving for Production
import path from 'path';
import { fileURLToPath } from 'url';

const __thisFilename = fileURLToPath(import.meta.url);
const __thisDirname = path.dirname(__thisFilename);
// In CJS (production), __dirname is global. In ESM (dev), we derive it.
const __dirname = typeof globalThis.__dirname === 'string' ? globalThis.__dirname : __thisDirname;

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
