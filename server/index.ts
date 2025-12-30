
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


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Osikani BFF running on modified port ${PORT}`);
});
