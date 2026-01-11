# 🚀 Deploying Osikani to Railway

This guide provides step-by-step instructions to get **Osikani v1.0** deployed and fully operational on [Railway.app](https://railway.app/).

## 📋 Prerequisites
1.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository.
2.  **Railway Account**: Sign up at [railway.app](https://railway.app/).
3.  **Meta Developers Account**: You need your WhatsApp Cloud API credentials ready.
4.  **Google AI Studio Key**: You need your `GEMINI_API_KEY`.

---

## 🛠️ Step 1: Prepare Codebase for Production

### 1. Update Database Provider
Railway works best with **PostgreSQL** in production.
1.  Open `prisma/schema.prisma`.
2.  Change the `datasource` provider from `"sqlite"` to `"postgresql"`.

```prisma
datasource db {
  provider = "postgresql" // CHANGED from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 2. Commit Changes
Push this change to your GitHub repository.
```bash
git add .
git commit -m "chore: switch prisma to postgres for production"
git push origin main
```

---

## 🚂 Step 2: Railway Project Setup

1.  **New Project**: Go to Railway Dashboard -> **New Project** -> **Deploy from GitHub repo**.
2.  **Select Repo**: Choose your `osikani-hybrid-backend-dashboard` repository.
3.  **Deploy Now?**: Click **"Deploy Now"**. The first build *might* fail because variables aren't set yet. That is normal.

---

## 🗄️ Step 3: Add Database (Postgres)

1.  In your Railway Project view, right-click the empty space (or click "New").
2.  Select **Database** -> **Add PostgreSQL**.
3.  Wait for the Postgres service to initialize.

---

## 🔑 Step 4: Configure Environment Variables

1.  Click on your **Osikani App Service** card.
2.  Go to the **Variables** tab.
3.  Add the following variables:

| Variable | Value / Source |
| :--- | :--- |
| `DATABASE_URL` | **Reference Variable**: Type `${{Postgres.DATABASE_URL}}` to auto-link. |
| `GEMINI_API_KEY` | Your Google Gemini API Key. |
| `WHATSAPP_CLOUD_TOKEN` | From Meta App Dashboard (System User Token recommended). |
| `WHATSAPP_CLOUD_PHONE_ID` | From Meta App Dashboard (Phone Number ID). |
| `WHATSAPP_CLOUD_VERIFY_TOKEN` | Your custom string (e.g., `osikani_secure_token`). |
| `NODE_ENV` | `production` |
| `PORT` | `3001` (Optional, Railway sets generic PORT, but Osikani defaults to 3001). |

---

## 🚀 Step 5: Configure Build & Deploy Commands

We need to ensure Prisma migrations run *before* the app starts.

1.  Go to the **Settings** tab of your **Osikani App Service**.
2.  Scroll down to the **Deploy** section.
3.  **Build Command**: Leave empty (Railway automatically uses the Dockerfile).
4.  **Deploy Command** (or Start Command):
    *   Set this to: `npx prisma migrate deploy && npm start`
    *   *Explanation*: This ensures the database schema is always up-to-date with your code before the server boots.

---

## 🔄 Step 6: Redeploy & Verify

1.  Railway usually auto-deploys when variables change. If not, click **Deploy** manually in the top-right.
2.  Wait for the "Build" and "Deploy" steps to finish.
3.  **Check Logs**: Go to the **Logs** tab. You should see:
    ```
    ✅ Osikani BFF running on modified port ...
    ```
4.  **Get Public URL**:
    *   Go to **Settings** -> **Networking**.
    *   Click **Generate Domain** (e.g., `osikani-production.up.railway.app`).

---

## 🔗 Step 7: Connect WhatsApp Webhook

1.  Go to your **Meta Developers Console** -> **WhatsApp** -> **Configuration**.
2.  **Callback URL**: Enter your Railway URL + `/api/whatsapp-cloud`.
    *   Example: `https://osikani-production.up.railway.app/api/whatsapp-cloud`
3.  **Verify Token**: Enter the value you set for `WHATSAPP_CLOUD_VERIFY_TOKEN`.
4.  Click **Verify and Save**.

✅ **Done! Your Osikani instance is now live on the global edge network.**

---

## 📱 Step 8: Verify & Test
1.  Open WhatsApp on your phone.
2.  Send a message (e.g., "Hello" or "Menu") to your **WhatsApp Business Test Number**.
3.  Check your **Railway Logs**:
    *   You should see `📩 Cloud API Message from ...`
    *   Followed by `🤖 AI Response generated...`


---

## 🆘 Troubleshooting

### Database Migration Failed (P3009)
If you see an error like `P3009: migrate found failed migrations`, you need to reset the database using the **Public Connection URL**.

1.  Get the **Public URL** from Railway -> Postgres -> Connect.
2.  Run this locally:
    ```bash
    # Windows PowerShell
    $env:DATABASE_URL="postgresql://..."; npx prisma migrate reset --force
    ```

