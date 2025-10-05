// src/visualizations/NeuralSearchViz.js
import React from 'react';
import '../styles/NeuralSearchViz.css';

// Mock data for visualization
const MOCK_DOCS = [
  { id: 1, text: 'Cheetah speed', pos: { top: '20%', left: '75%' } },
  { id: 2, text: 'Query speed', pos: { top: '70%', left: '25%' } },
  { id: 3, text: 'Gazelle velocity', pos: { top: '35%', left: '80%' } },
  { id: 4, text: 'Computer running quicker', pos: { top: '80%', left: '15%' } },
];
const QUERY_POS = { top: '30%', left: '70%' };

const NeuralSearchViz = ({ visualState }) => {
  if (!visualState) return <div className="neural-search-container">Loading...</div>;

  const { step, query, results, vectorSpace } = visualState;

  return (
    <div className="neural-search-container">
      <div className="flow-diagram">
        <div className="flow-box query-box">
          <strong>Query:</strong> "{query}"
        </div>
        
        <div className={`arrow ${step === 'encoding' || vectorSpace ? 'active' : ''}`}>→</div>

        <div className={`flow-box encoder-box ${step === 'encoding' ? 'active' : ''}`}>
          <strong>Encoder Model</strong>
          <small>Text to Vector</small>
        </div>
        
        <div className={`arrow ${vectorSpace ? 'active' : ''}`}>→</div>

        <div className="flow-box vector-space-box">
          <strong>Vector Space</strong>
          {vectorSpace && (
            <div className="space">
              <div className="point query-point" style={QUERY_POS}>Q</div>
              {MOCK_DOCS.map(doc => (
                <div 
                  key={doc.id} 
                  className={`point doc-point ${results.includes(doc.id) ? 'result' : ''}`}
                  style={doc.pos}
                  data-text={doc.text}
                >
                  {doc.id}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="results-panel">
        <h3>Results</h3>
        <div className={`result-box ${step === 'keyword_search' ? 'active' : ''}`}>
          <h4>Keyword Results</h4>
          <ul>
            {step === 'keyword_search' && results.map(id => <li key={id}>Document {id}</li>)}
          </ul>
        </div>
        <div className={`result-box ${step === 'results' ? 'active' : ''}`}>
          <h4>Neural Search Results</h4>
          <ul>
            {step === 'results' && results.map(id => <li key={id}>Document {id}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NeuralSearchViz;