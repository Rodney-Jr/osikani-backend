# WhatsApp Integration Procedure for Osikani

This document outlines the step-by-step procedure to integrate WhatsApp as a communication channel for Osikani, enabling users to chat with the AI assistant via their preferred messaging app.

We recommend using **Twilio** as the Business Solution Provider (BSP) for ease of development and robust API features, although the **Meta Cloud API** is a direct alternative.

---

## Phase 1: Account Setup & Configuration

### 1. Twilio Setup
1.  **Create Account:** Sign up at [twilio.com](https://www.twilio.com).
2.  **Buy a Number:** Purchase a phone number with SMS/WhatsApp capabilities.
3.  **Activate Sandbox:** Go to `Messaging > Try it out > Send a WhatsApp message`. This allows you to test without business verification.
4.  **Get Credentials:** detailed in the Console Dashboard:
    *   `Account SID`
    *   `Auth Token`

### 2. Meta Business Verification (For Production)
*Note: You can skip this for testing/UAT if using the Sandbox.*
1.  **Business Manager:** You must have a verified Meta Business Manager account.
2.  **Display Name:** The name "Osikani" must be approved by WhatsApp.
3.  **Usage Tier:** You start with 1,000 free conversations/month.

---

## Phase 2: Backend Implementation

### 1. Environment Variables
Add the following to your `.env` (and `.env.local`):
```bash
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### 2. Create Webhook Endpoint
You need a new route in the server to receive messages from WhatsApp.

**File:** `server/routes/whatsapp.ts`
```typescript
import express from 'express';
import { MessagingResponse } from 'twilio.twiml';
import { processUserMessage } from '../services/chat';

const router = express.Router();

router.post('/webhook', async (req, res) => {
    const incomingMsg = req.body.Body; // The text message
    const from = req.body.From; // The user's phone number (e.g., whatsapp:+233...)
    
    // 1. Process with Gemini (Osikani Brain)
    // We use the phone number as the unique userId for context persistence
    const aiResponse = await processUserMessage(incomingMsg, [], null, null, from);

    // 2. Format Response for Twilio
    const twiml = new MessagingResponse();
    twiml.message(aiResponse.text);

    // 3. Send back TwiML XML
    res.type('text/xml').send(twiml.toString());
});

export default router;
```

### 3. Register Route
Update `server/index.ts` to use the new route:
```typescript
import whatsappRouter from './routes/whatsapp';
// ...
app.use('/api/whatsapp', whatsappRouter); // Mounts at POST /api/whatsapp/webhook
```

---

## Phase 3: Wiring It Up

### 1. Expose Local Server (Tunneling)
Since Twilio needs to hit your local `localhost:3002` during dev, use **ngrok**:
```bash
ngrok http 3002
```
*   Copy the HTTPS URL generated (e.g., `https://a1b2.ngrok.io`).

### 2. Configure Twilio Webhook
1.  Go to **WhatsApp Sandbox Settings** in Twilio Console.
2.  Paste your ngrok URL into the **"When a message comes in"** field.
3.  Append the path: `https://a1b2.ngrok.io/api/whatsapp/webhook`.
4.  Save.

---

## Phase 4: Omnichannel Testing (UAT)

1.  **Join Sandbox:** Send the specific "join code" (e.g., `join something-name`) from your WhatsApp mobile app to the Twilio Sandbox number.
2.  **Say Hello:** Text "Hi Osikani".
3.  **Verification:**
    *   The backend should receive the POST request.
    *   Gemini should process it.
    *   You should receive a reply in WhatsApp.

---

## Phase 5: Production Deployment

1.  **Deploy Backend:** Push changes to Railway.
2.  **Update Webhook:** Change the Twilio Webhook URL from `ngrok` to your actual Railway domain:
    `https://osikani-backend.up.railway.app/api/whatsapp/webhook`
3.  **Move to Live:** Move "Osikani" from the Twilio Sandbox to a Live Sender (requires Business Verification).

---
**Estimated Dev Time:** 2-4 Hours
**Estimated Cost:** See `UAT_COST_ESTIMATE.md`
