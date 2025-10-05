// src/visualizations/AStarViz.js
import React from 'react';
import '../styles/AStarViz.css';

const AStarViz = ({ visualState }) => {
  if (!visualState || !visualState.grid) return <div className="a-star-container">Loading...</div>;

  const { grid, openSet, closedSet, path, current } = visualState;
  
  // Create sets for quick lookups
  const openSetNodes = new Set(openSet.map(n => `${n.row}-${n.col}`));
  const closedSetNodes = new Set(closedSet.map(n => `${n.row}-${n.col}`));
  const pathNodes = new Set(path.map(n => `${n.row}-${n.col}`));

  return (
    <div className="a-star-container">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node, colIndex) => {
              const nodeId = `${node.row}-${node.col}`;
              const isStart = node.isStart;
              const isEnd = node.isEnd;
              const isWall = node.isWall;
              const isOpen = openSetNodes.has(nodeId);
              const isClosed = closedSetNodes.has(nodeId);
              const isPath = pathNodes.has(nodeId);
              const isCurrent = current && current.row === node.row && current.col === node.col;

              const className = `node 
                ${isStart ? 'start' : ''}
                ${isEnd ? 'end' : ''}
                ${isWall ? 'wall' : ''}
                ${isPath ? 'path' : ''}
                ${isClosed ? 'closed' : ''}
                ${isOpen ? 'open' : ''}
                ${isCurrent ? 'current' : ''}
              `;

              return (
                <div key={colIndex} className={className}>
                  <div className="cost f-cost">F: {node.f !== Infinity ? node.f : ''}</div>
                  <div className="cost g-cost">G: {node.g !== Infinity ? node.g : ''}</div>
                  <div className="cost h-cost">H: {node.h !== Infinity ? node.h : ''}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AStarViz;