// src/components/InputPanel.js
import React from 'react';
import '../styles/App.css'; // Using some shared styles

const InputPanel = ({ algorithm, parameters, onParameterChange, array }) => {
  // Only show this panel if the algorithm is binarySearch
  if (algorithm !== 'binarySearch') {
    return null;
  }

  return (
    <div className="input-panel">
      <h4>Parameters</h4>
      <div className="input-group">
        <label htmlFor="target-value">Target Value:</label>
        <input
          id="target-value"
          type="number"
          value={parameters.binarySearchTarget}
          onChange={(e) => onParameterChange('binarySearchTarget', parseInt(e.target.value, 10))}
        />
        <small>Choose a number from the array below.</small>
      </div>
    </div>
  );
};

export default InputPanel;