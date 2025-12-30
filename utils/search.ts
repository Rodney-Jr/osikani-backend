import { GHANA_FINANCIAL_LITERACY_DATASET } from '../data/sampleData';

interface SearchResult {
  id: string;
  topic: string;
  content: string;
  score: number;
  // Added source property to match usage in ChatSimulator
  source: string;
}

/**
 * Simulates a Vector Search by performing keyword matching and simple scoring.
 * In a real backend, this would use embeddings (Vertex AI Vector Search).
 */
export const searchKnowledgeBase = async (query: string): Promise<SearchResult[]> => {
  const lowerQuery = query.toLowerCase();
  const queryTerms = lowerQuery.split(' ').filter(t => t.length > 3); // Filter short words

  const results = GHANA_FINANCIAL_LITERACY_DATASET.map(item => {
    let score = 0;
    const lowerContent = item.content.toLowerCase();
    const lowerTopic = item.topic.toLowerCase();
    const lowerKeywords = item.keywords.map(k => k.toLowerCase());

    // Simple scoring logic
    queryTerms.forEach(term => {
      if (lowerTopic.includes(term)) score += 3;
      if (lowerKeywords.some(k => k.includes(term))) score += 2;
      if (lowerContent.includes(term)) score += 1;
    });

    return {
      id: item.id,
      topic: item.topic,
      content: item.content,
      // Added source property to mapping logic
      source: item.source,
      score
    };
  });

  // Return top 2 results with score > 0
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
};