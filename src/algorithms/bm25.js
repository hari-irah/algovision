// src/algorithms/bm25.js

const documents = [
  { id: 1, title: 'The Rare Okapi', text: 'The okapi is a rare animal, related to the giraffe.' },
  { id: 2, title: 'Forest Animals', text: 'Many animals live in the forest.' },
  { id: 3, title: 'Okapi and Giraffes', text: 'An okapi is not a zebra, but its closest relative is the giraffe.' },
];

export function runBm25(query) {
  const steps = [];
  // const queryTerms = query.toLowerCase().split(' '); // This line was removed

  // Step 1: Initial State
  steps.push({
    visualState: {
      step: 'initial',
      documents: documents.map(d => ({ ...d, score: 0 })),
      ranking: [1, 2, 3], // Initial order
      explanationBox: null,
    },
    explanation: `We're searching for '${query}'. Here are our documents, currently unsorted. BM25 will calculate a relevance score for each one.`,
  });

  // Step 2: IDF Calculation
  steps.push({
    visualState: {
      step: 'idf',
      documents: documents.map(d => ({ ...d, score: 0 })),
      ranking: [1, 2, 3],
      explanationBox: { type: 'IDF', term: 'okapi', value: 'High' },
    },
    explanation: `First, we calculate Inverse Document Frequency (IDF). The term 'okapi' is rare, so it gets a high IDF score, making it very important. Common words like 'the' would get a score near zero.`,
  });

  // Step 3: TF Calculation for Doc 1
  steps.push({
    visualState: {
      step: 'tf',
      documents: documents.map(d => ({ ...d, score: 0 })),
      ranking: [1, 2, 3],
      explanationBox: { type: 'TF', term: 'okapi', docId: 1, value: 'High' },
    },
    explanation: `Next, we check Term Frequency (TF). In Document 1, the important term 'okapi' appears once. This contributes positively to its score.`,
  });
  
  // Step 4: Scoring Doc 1
  steps.push({
    visualState: {
      step: 'score',
      documents: documents.map(d => ({ ...d, score: d.id === 1 ? 1.85 : 0 })),
      ranking: [1, 2, 3],
      explanationBox: { type: 'Score', docId: 1, value: 1.85 },
    },
    explanation: `By combining the IDF and TF scores, Document 1 gets a final BM25 score of 1.85. Now let's score the other documents.`,
  });
  
  // Step 5: Scoring Doc 3 & Re-ranking
  steps.push({
    visualState: {
      step: 'score',
      documents: documents.map(d => ({ ...d, score: d.id === 1 ? 1.85 : d.id === 3 ? 1.95 : 0 })),
      ranking: [3, 1, 2], // Doc 3 now has a higher score
      explanationBox: { type: 'Score', docId: 3, value: 1.95 },
    },
    explanation: `Document 3 also contains 'okapi' and 'giraffe', giving it a slightly higher score of 1.95. Notice how the documents re-rank as scores are calculated.`,
  });
  
  // Step 6: Final Ranking
  steps.push({
    visualState: {
      step: 'final',
      documents: documents.map(d => ({ ...d, score: d.id === 1 ? 1.85 : d.id === 3 ? 1.95 : d.id === 2 ? 0.15 : 0 })),
      ranking: [3, 1, 2],
      explanationBox: null,
    },
    explanation: `After scoring all documents, Document 2 gets a very low score as it contains no important terms. The final ranked list is now ready.`,
  });

  return steps;
}
