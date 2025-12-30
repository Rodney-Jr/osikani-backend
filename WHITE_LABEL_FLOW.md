# 🏢 Osikani White-Label Onboarding Flow

This document outlines the end-to-end process for onboarding a partner institution (e.g., Banks, Microfinance, NGOs) onto the Osikani platform using the **White-Label Studio**.

---

## 1. Visual Identity Configuration
The first step is establishing the partner's brand presence within the Osikani ecosystem.
*   **Brand Colors:** Define `primaryColor` (for buttons/highlights) and `secondaryColor` (for headers).
*   **Naming:** Set the `botDisplayName` (e.g., "EcoBank Mentor") to replace the default "Osikani" persona.
*   **Welcome Experience:** Customize the `welcomeMessage` to align with the partner’s communication style (Formal vs. Casual).

## 2. Institutional Knowledge (RAG Augmentation)
To ensure the bot is an expert in the partner's specific products:
*   **Document Upload:** Partner-specific brochures, product terms, and FAQs are uploaded to the **Knowledge Base**.
*   **Vector Namespacing:** These documents are embedded into a private namespace. When a user interacts with the partner’s version of the bot, the RAG engine prioritizes this namespace over the general curriculum.

## 3. Infrastructure & Channel Linking
Osikani is delivered where the users are.
*   **API Endpoint Generation:** The system automatically generates a unique tenant URL: `https://osikani.nexus.gh/v1/{partner-name}`.
*   **Meta Cloud Integration:** Link the partner’s official **WhatsApp Business Phone ID** and **Access Token**. This allows the partner to own the customer relationship on their own verified number.
*   **CORS Proxying:** Configure secure routing to bypass browser-based restrictions for the management dashboard.

## 4. Governance & Role Assignment
The Superuser delegates control to the partner's internal team:
*   **Partner Admin:** Full control over their tenant's branding and supplemental knowledge base.
*   **Partner Auditor:** Read-only access to forensic logs and the **Impact Console** for compliance and CSR reporting.

## 5. Deployment & Impact Monitoring
Once "Commit Changes" is triggered:
*   **Live Propagation:** Branding changes reflect instantly across WhatsApp and Web Simulators.
*   **Filtered Analytics:** The partner gains access to a dedicated **Impact Console** view, showing *Inclusion Velocity* and *Fraud Hits* specific only to their user base.

---

**Institutional Compliance:** All white-label instances adhere to the core **Osikani Ethical Guardrails**, ensuring that no matter the branding, the advice remains non-exploitative and grounded in the core 10 Intent Clusters.
