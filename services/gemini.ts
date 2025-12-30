
/**
 * CORE AI INFERENCE SERVICE (Client-Side Wrapper)
 * Delegates inference to the Backend-for-Frontend (BFF) layer.
 */
import { trackUsage, trackError } from "./metrics";

/**
 * Generates a response from Osikani via the BFF.
 */
export const generateOsikaniResponse = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[],
  context?: string,
  audioData?: { data: string; mimeType: string }
): Promise<{ text: string; confidence?: number; securityLogs: string[] }> => {
  const startTime = Date.now();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history,
        context,
        audioData
      })
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();

    // Track usage (Estimation as we don't get exact tokens back from simple API response yet)
    // In a full implementation, the server would return token counts.
    trackUsage(
      userMessage.length / 4,
      data.text?.length / 4 || 0,
      Date.now() - startTime
    );

    return {
      text: data.text,
      confidence: data.confidence,
      securityLogs: data.securityLogs || []
    };

  } catch (error: any) {
    trackError();
    console.error("BFF Inference Error:", error);
    return { text: "Sorry o, connection problem. Making sure the server runs.", securityLogs: ["Error: Network/Server Failure"] };
  }
};
