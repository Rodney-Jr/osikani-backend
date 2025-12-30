
/**
 * OFFICIAL WHATSAPP BUSINESS API SERVICE (META)
 * Handles communication with Meta Graph API v21.0 using centralized EnvService.
 */
import { EnvService } from './env';

const BASE_URL = "https://graph.facebook.com/v21.0";

const getTargetUrl = (path: string) => {
  const env = EnvService.getEnv();
  let proxy = env.CORS_PROXY;
  if (proxy && !proxy.endsWith('/')) {
    proxy += '/';
  }
  return `${proxy}${BASE_URL}/${path}`;
};

/**
 * Verifies the connection by fetching the Phone Number profile from Meta.
 */
export const getChannelStatus = async (token?: string, phoneNumberId?: string) => {
  const env = EnvService.getEnv();
  const activeToken = token || env.META_ACCESS_TOKEN;
  const activeId = phoneNumberId || env.META_PHONE_NUMBER_ID;

  if (env.MOCK_MODE) {
    return { status: "connected", device_name: "Mock Meta Account" };
  }

  if (!activeToken || !activeId) {
    throw new Error("Missing Meta credentials in environment.");
  }

  const targetUrl = getTargetUrl(activeId);

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${activeToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Meta API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      status: 'connected',
      device_name: data.display_phone_number || 'Official WhatsApp Business',
      id: data.id
    };
  } catch (error: any) {
    throw error;
  }
};

/**
 * Sends a text message using the official Meta Cloud API.
 */
export const sendWhatsAppMessage = async (token?: string, phoneNumberId?: string, to?: string, message?: string) => {
  const env = EnvService.getEnv();
  const activeToken = token || env.META_ACCESS_TOKEN;
  const activeId = phoneNumberId || env.META_PHONE_NUMBER_ID;

  if (env.MOCK_MODE) {
    console.log("MOCK META WHATSAPP SEND:", { to, message });
    await new Promise(r => setTimeout(r, 1000));
    return { messages: [{ id: "wamid.mock_" + Date.now() }] };
  }

  if (!activeToken || !activeId) {
    throw new Error("Missing Meta credentials in environment.");
  }

  const targetUrl = getTargetUrl(`${activeId}/messages`);

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${activeToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to?.replace(/[^0-9]/g, '') || '', 
        type: "text",
        text: { 
          preview_url: false,
          body: message 
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error("CORS Blocked: Meta API requires a proxy for browser-based calls.");
    }
    throw error;
  }
};
