// src/components/AlgorithmSelector.js
import React from 'react';

const ALGORITHMS = {
  binarySearch: 'Binary Search',
  bfs: 'Breadth-First Search (BFS)',
  dfs: 'Depth-First Search (DFS)',
  aStar: 'A* Pathfinding', 
  neuralSearch: 'Neural Search',
  bm25: 'BM25 Ranking'// Add this line
};

// ... rest of the component is unchanged
const AlgorithmSelector = ({ algorithm, onAlgorithmChange }) => {
  return (
    <div className="algorithm-selector">
      <label htmlFor="algo-select">Choose an Algorithm: </label>
      <select id="algo-select" value={algorithm} onChange={e => onAlgorithmChange(e.target.value)}>
        {Object.entries(ALGORITHMS).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;