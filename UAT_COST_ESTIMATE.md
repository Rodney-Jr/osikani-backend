# Cost Estimate for Full UAT (Osikani) - 200 Users

To ensure a smooth User Acceptance Testing (UAT) phase for **200 users** without "Rate Limits" or "Server Crashes", we recommend upgrading to paid production tiers.

Below is the monthly breakdown estimated for this volume.

---

## 1. AI Intelligence (Google Gemini)
**Current Status:** Free Tier (Not viable for 200 concurrent users).
**UAT Requirement:** Paid Tier (Pay-as-you-go).

| Item | Pricing (Gemini 1.5 Flash) | Est. UAT Monthly Cost (200 Users) |
| :--- | :--- | :--- |
| **Input Tokens** | $0.075 / 1 Million tokens | ~$4.00 |
| **Output Tokens** | $0.30 / 1 Million tokens | ~$8.00 |
| **Context Caching** | Varies | ~$3.00 |
| **Total** | | **~$15.00 / month** |

> **Note:** The "Rate Limit" errors will vanish immediately with a paid API key.

---

## 2. Cloud Infrastructure (Railway)
**Current Status:** Trial / Developer Plan.
**UAT Requirement:** Pro Plan (Always-on, higher RAM for Vector DB).

| Item | Cost | Reason |
| :--- | :--- | :--- |
| **Pro Subscription** | $5.00 / month | Removes "execution hour" limits. |
| **Compute (RAM/CPU)** | ~$12.00 / month | Scaling for 200 potential concurrent connections. |
| **Database Storage** | ~$3.00 / month | User Profiles, Logs, and Vector Data. |
| **Total** | | **~$20.00 / month** |

---

## 3. Communication Channels (Optional)
If UAT includes testing WhatsApp (Omni-channel).

| Item | Provider | Cost |
| :--- | :--- | :--- |
| **WhatsApp Numbers** | Twilio/Meta | ~$15.00 / month |
| **Conversation Fees** | Meta | First 1,000 conversations are free. |
| **Overage** | ~$0.03-0.05 / convo | Est. 1,000 paid conversations (active testing). |
| **Total** | | **~$45.00 / month** |

---

## 💰 Grand Total Estimate

| Scenario | Est. Cost (Monthly) | Notes |
| :--- | :--- | :--- |
| **Web-Only UAT** | **~$35.00** | Covers 200 users on Dashboard & Web Chat. |
| **Full Omni-channel** | **~$80.00** | Includes WhatsApp traffic for 200 users. |

### Recommendation
For the upcoming UAT with **200 users**:
1.  **Google Cloud:** Enable billing ($15/mo budget is plenty/safe).
2.  **Railway:** Upgrade to Pro ($5 base + utilization). It will auto-scale.
3.  **WhatsApp:** Only enable if critical for this phase, as it doubles the cost.
