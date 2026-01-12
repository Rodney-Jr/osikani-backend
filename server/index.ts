
console.log('🚀 Server process starting...');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateChatResponse } from './routes/chat';

dotenv.config({ path: '.env.local' });
dotenv.config();

// Debugging: Catch silent crashes
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

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

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(projectRoot, '../client');
    app.use(express.static(clientDistPath));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });
}


// Start Server
// Start Server
const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✅ Osikani BFF running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('❌ Server failed to start:', err);
});
