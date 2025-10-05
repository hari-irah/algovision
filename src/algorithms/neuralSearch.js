// src/algorithms/neuralSearch.js

// Mock data representing documents in a database
const documents = [
  { id: 1, text: 'The cheetah is the fastest animal on land.' },
  { id: 2, text: 'A guide to optimizing database query speed.' },
  { id: 3, text: 'Gazelles are known for their incredible running velocity.' },
  { id: 4, text: 'How to make your computer run quicker.' },
];

export function runNeuralSearch(query) {
  const steps = [];
  
  // Step 1: Keyword Search (for comparison)
  const keywordResults = documents.filter(doc => 
    query.toLowerCase().split(' ').some(word => doc.text.toLowerCase().includes(word))
  );

  steps.push({
    visualState: {
      step: 'keyword_search',
      query: query,
      results: keywordResults.map(r => r.id),
      vectorSpace: false,
    },
    explanation: `First, let's see how a simple keyword search works. We look for documents containing the exact words 'running' or 'fast'.`,
  });

  // Step 2: Query Encoding
  steps.push({
    visualState: {
      step: 'encoding',
      query: query,
      results: [],
      vectorSpace: false,
    },
    explanation: `Now for Neural Search. Instead of matching words, the model first analyzes the *meaning* of the query '${query}' and converts it into a vector (a series of numbers).`,
  });

  // Step 3: Vector Space Search
  steps.push({
    visualState: {
      step: 'vector_search',
      query: query,
      results: [],
      vectorSpace: true,
    },
    explanation: `This query vector is then plotted in a high-dimensional 'meaning' space. Each document already has its own vector in this space.`,
  });
  
  // Step 4: Finding Nearest Neighbors
  const semanticResults = [1, 3]; // Mocked results that are semantically similar
  steps.push({
    visualState: {
      step: 'results',
      query: query,
      results: semanticResults,
      vectorSpace: true,
    },
    explanation: `The algorithm finds the document vectors closest to the query vector. Notice it finds 'cheetah' and 'gazelle' because they are related to 'running fast', even without using the exact words.`,
  });

  return steps;
}