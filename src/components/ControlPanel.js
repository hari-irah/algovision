// src/components/ControlPanel.js
import React from 'react';

const ControlPanel = ({ onPlayPause, onNext, onReset, isPlaying, isFinished }) => {
  return (
    <div className="control-panel">
      <button onClick={onPlayPause}>{isPlaying ? 'Pause' : isFinished ? 'Replay' : 'Play'}</button>
      <button onClick={onNext} disabled={isPlaying || isFinished}>Next Step</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default ControlPanel;