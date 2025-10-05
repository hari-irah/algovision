// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import ControlPanel from './components/ControlPanel';
import InputPanel from './components/InputPanel';
import BinarySearchViz from './visualizations/BinarySearchViz';
import BFSViz from './visualizations/BFSViz';
import DFSViz from './visualizations/DFSViz';
import AStarViz from './visualizations/AStarViz';
import NeuralSearchViz from './visualizations/NeuralSearchViz';
import BM25Viz from './visualizations/BM25Viz';
import { runBinarySearch } from './algorithms/binarySearch';
import { runBfs } from './algorithms/bfs';
import { runDfs } from './algorithms/dfs';
import { runAStar } from './algorithms/aStar';
import { runNeuralSearch } from './algorithms/neuralSearch';
import { runBm25 } from './algorithms/bm25';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import './styles/App.css';

// --- MOCK DATA AND GRID SETUP ---
const sortedArray = Array.from({ length: 15 }, (_, i) => i * 3 + 2);
const graphData = { A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'E'], D: ['B', 'F'], E: ['C', 'F'], F: ['D', 'E'] };

const GRID_ROWS = 15;
const GRID_COLS = 25;
const START_NODE_POS = { row: 7, col: 5 };
const END_NODE_POS = { row: 7, col: 19 };

const createInitialGrid = (withWalls = false) => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      const isStart = row === START_NODE_POS.row && col === START_NODE_POS.col;
      const isEnd = row === END_NODE_POS.row && col === END_NODE_POS.col;
      let isWall = false;
      if (withWalls && !isStart && !isEnd) {
        if (Math.random() < 0.2) {
          isWall = true;
        }
      }
      currentRow.push({ row, col, isStart, isEnd, isWall, g: Infinity, h: Infinity, f: Infinity, parent: null });
    }
    grid.push(currentRow);
  }
  return grid;
};
// --- END OF SETUP ---

function App() {
  const [algorithm, setAlgorithm] = useState('binarySearch');
  const [storyboard, setStoryboard] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const speak = useSpeechSynthesis();

  const [parameters, setParameters] = useState({
    binarySearchTarget: sortedArray[Math.floor(sortedArray.length / 2)],
  });

  const [grid, setGrid] = useState(createInitialGrid(true));
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const generateStoryboard = useCallback(() => {
    let steps = [];
    
    if (algorithm === 'binarySearch') {
      steps = runBinarySearch(sortedArray, parameters.binarySearchTarget);
    } else if (algorithm === 'bfs') {
      steps = runBfs(graphData, 'A');
    } else if (algorithm === 'dfs') {
      steps = runDfs(graphData, 'A');
    } else if (algorithm === 'aStar') {
      steps = runAStar(grid, START_NODE_POS, END_NODE_POS);
    } else if (algorithm === 'neuralSearch') {
      steps = runNeuralSearch('running fast');
    } else if (algorithm === 'bm25') {
      steps = runBm25('okapi giraffe');
    }
    setStoryboard(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, parameters, grid]);

  useEffect(() => {
    if (algorithm === 'aStar') {
      setGrid(createInitialGrid(true));
    }
    setStoryboard([]);
  }, [algorithm]);

  useEffect(() => {
    generateStoryboard();
  }, [generateStoryboard]);
  
  const handleParameterChange = (param, value) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
  };
  
  const handleMouseDown = (row, col) => {
    if (algorithm !== 'aStar') return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (row, col) => {
    if (algorithm !== 'aStar' || !isMouseDown) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  
  const handleMouseUp = () => {
    if (algorithm !== 'aStar') return;
    setIsMouseDown(false);
  };

  const getNewGridWithWallToggled = (currentGrid, row, col) => {
    const newGrid = currentGrid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return newGrid;
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleClearWalls = () => {
    if (algorithm !== 'aStar') return;
    const newGrid = createInitialGrid(false);
    setGrid(newGrid);
  };
  
  const handlePlayPause = () => {
    if (currentStep === storyboard.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(prev => !prev);
  };

  const handleNext = useCallback(() => {
    if (currentStep < storyboard.length - 1) {
      setCurrentStep(step => step + 1);
    }
  }, [currentStep, storyboard.length]);

  const handleReset = () => {
    generateStoryboard();
  };
  
  useEffect(() => {
    if (isPlaying && currentStep < storyboard.length - 1) {
      const timer = setTimeout(() => { handleNext(); }, 3500); 
      return () => clearTimeout(timer);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, storyboard, handleNext]);
  
  // --- FIX IS HERE ---
  // This useEffect hook is now simpler and more robust
  useEffect(() => {
    if (storyboard.length > 0) {
      const explanation = storyboard[currentStep].explanation;
      speak(explanation); // Just pass the text, the hook handles the rest
    }
  }, [currentStep, storyboard, speak]);
  // --- END OF FIX ---
  
  const isFinished = storyboard.length > 0 && currentStep === storyboard.length - 1;
  let currentVisualState = storyboard[currentStep]?.visualState;
  
  if (algorithm === 'aStar' && storyboard.length === 0) {
      currentVisualState = { grid: grid, openSet: [], closedSet: [], path: [] };
  }

  const currentExplanation = storyboard[currentStep]?.explanation || (algorithm === 'aStar' ? 'Draw walls on the grid, then press "Reset Algorithm" to find the path.' : 'Select an algorithm to start.');

  return (
    <div className="app-container">
      <header>
        <h1>AlgoVision 🚀</h1>
        <AlgorithmSelector algorithm={algorithm} onAlgorithmChange={handleAlgorithmChange} />
      </header>
      <main>
        <InputPanel 
          algorithm={algorithm}
          parameters={parameters}
          onParameterChange={handleParameterChange}
        />
        <div className="visualization-panel">
          {algorithm === 'binarySearch' && <BinarySearchViz array={sortedArray} visualState={currentVisualState} />}
          {algorithm === 'bfs' && <BFSViz graph={graphData} visualState={currentVisualState} />}
          {algorithm === 'dfs' && <DFSViz graph={graphData} visualState={currentVisualState} />}
          {algorithm === 'aStar' && 
            <AStarViz 
              visualState={currentVisualState} 
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />}
          {algorithm === 'neuralSearch' && <NeuralSearchViz visualState={currentVisualState} />}
          {algorithm === 'bm25' && <BM25Viz visualState={currentVisualState} />}
        </div>
        
        <div className="explanation-panel">
          <h3>Step-by-Step Explanation</h3>
          <p>{currentExplanation}</p>
        </div>
        
        <ControlPanel 
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onReset={handleReset}
          isPlaying={isPlaying}
          isFinished={isFinished}
          algorithm={algorithm}
          onClearWalls={handleClearWalls}
        />
      </main>
    </div>
  );
}

export default App;