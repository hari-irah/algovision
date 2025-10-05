// src/visualizations/BFSViz.js
import React from 'react';
import '../styles/BFSViz.css';

// Pre-defined positions for nodes to make rendering simple
const NODE_POSITIONS = {
  A: { cx: 100, cy: 150 },
  B: { cx: 250, cy: 80 },
  C: { cx: 250, cy: 220 },
  D: { cx: 400, cy: 80 },
  E: { cx: 400, cy: 220 },
  F: { cx: 550, cy: 150 },
};

const BFSViz = ({ graph, visualState }) => {
  if (!visualState || !visualState.nodeStates) return null;
  
  const { nodeStates, queue, highlightedEdge } = visualState;

  return (
    <div className="bfs-viz-container">
      <svg width="650" height="300">
        {/* Render Edges */}
        {Object.keys(graph).map(node =>
          graph[node].map(neighbor => {
            const isHighlighted = 
              (highlightedEdge?.from === node && highlightedEdge?.to === neighbor);
            return (
              <line
                key={`${node}-${neighbor}`}
                x1={NODE_POSITIONS[node].cx}
                y1={NODE_POSITIONS[node].cy}
                x2={NODE_POSITIONS[neighbor].cx}
                y2={NODE_POSITIONS[neighbor].cy}
                className={`edge ${isHighlighted ? 'highlighted' : ''}`}
              />
            );
          })
        )}
        
        {/* Render Nodes */}
        {Object.keys(graph).map(node => (
          <g key={node}>
            <circle
              cx={NODE_POSITIONS[node].cx}
              cy={NODE_POSITIONS[node].cy}
              r="25"
              className={`node ${nodeStates[node]}`}
            />
            <text
              x={NODE_POSITIONS[node].cx}
              y={NODE_POSITIONS[node].cy + 5}
              className="node-text"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>
      <div className="queue-display">
        <strong>Queue:</strong>
        <div className="queue-elements">
          {queue.map((node, index) => (
            <div key={index} className="queue-element">{node}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BFSViz;