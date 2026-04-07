/**
 * FLOW Docs — Search Algorithm
 * Zero-dependency substring + word-boundary scoring.
 */
import type { SearchEntry } from "./search-index";

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

export function search(query: string, index: SearchEntry[], limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const entry of index) {
    let score = 0;
    const title = entry.title.toLowerCase();
    const desc = entry.description.toLowerCase();

    // Title scoring
    if (title === q) {
      score += 100;
    } else if (title.startsWith(q)) {
      score += 50;
    } else if (title.includes(q)) {
      score += 30;
    }

    // Word-boundary bonus (e.g. "button" matches "FlowButton" at the B boundary)
    const words = title.split(/(?=[A-Z])|[\s-_]+/).map((w) => w.toLowerCase());
    if (words.some((w) => w.startsWith(q))) {
      score += 20;
    }

    // Description scoring
    if (desc.includes(q)) {
      score += 10;
    }

    // Keyword scoring
    for (const kw of entry.keywords) {
      if (kw.toLowerCase().includes(q)) {
        score += 5;
      }
    }

    // Shorter titles rank higher (avoid long names dominating)
    if (score > 0) {
      score += Math.max(0, 10 - title.length / 5);
      results.push({ entry, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
