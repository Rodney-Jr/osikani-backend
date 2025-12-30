
export interface SystemMetrics {
  totalRequests: number;
  promptTokens: number;
  responseTokens: number;
  totalTokens: number;
  totalCost: number;
  errors: number;
  lastActive: number;
  avgLatency: number;
}

// Initial state with some simulated historical data for realism
let metrics: SystemMetrics = {
  totalRequests: 842, 
  promptTokens: 245000,
  responseTokens: 82000,
  totalTokens: 327000,
  totalCost: 0.042, // Approx cost
  errors: 3,
  lastActive: Date.now(),
  avgLatency: 850 // ms
};

const listeners = new Set<(metrics: SystemMetrics) => void>();

export const getMetrics = (): SystemMetrics => ({ ...metrics });

export const trackUsage = (prompt: number, response: number, latencyMs: number) => {
  metrics.promptTokens += prompt;
  metrics.responseTokens += response;
  metrics.totalTokens += (prompt + response);
  metrics.totalRequests += 1;
  metrics.lastActive = Date.now();
  
  // Rolling average for latency
  metrics.avgLatency = Math.round(((metrics.avgLatency * (metrics.totalRequests - 1)) + latencyMs) / metrics.totalRequests);
  
  // Gemini 3 Flash Pricing (Estimated for management console visualization)
  const cost = (prompt / 1000000 * 0.075) + (response / 1000000 * 0.30);
  metrics.totalCost += cost;

  notify();
};

export const trackError = () => {
  metrics.errors += 1;
  notify();
};

const notify = () => {
  listeners.forEach(cb => cb({ ...metrics }));
};

/**
 * Subscribes a callback to metric updates.
 * Returns an unsubscribe function.
 */
// @google/genai guidelines: ensure cleanup function returns void for React compatibility.
export const subscribeToMetrics = (callback: (metrics: SystemMetrics) => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};
