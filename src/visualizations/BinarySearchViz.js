// src/visualizations/BinarySearchViz.js
import React from 'react';
import '../styles/BinarySearchViz.css';

const BinarySearchViz = ({ array, visualState }) => {
  if (!visualState) return null;

  const { low, high, mid, highlighted, discarded, found } = visualState;

  return (
    <div className="binary-search-container">
      {array.map((value, index) => {
        const isLow = index === low;
        const isHigh = index === high;
        const isMid = index === mid;
        const isHighlighted = highlighted.includes(index);
        const isDiscarded = discarded.includes(index);
        const isFound = found && isMid;

        return (
          <div key={index} className="array-element-wrapper">
            <div
              className={`
                array-element 
                ${isMid ? 'mid' : ''}
                ${isHighlighted ? 'highlighted' : ''}
                ${isDiscarded ? 'discarded' : ''}
                ${isFound ? 'found' : ''}
              `}
            >
              {value}
            </div>
            <div className="pointers">
              {isLow && <span className="pointer low-pointer">Low</span>}
              {isHigh && <span className="pointer high-pointer">High</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BinarySearchViz;