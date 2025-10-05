// src/visualizations/BM25Viz.js
import React from 'react';
import '../styles/BM25Viz.css';

const BM25Viz = ({ visualState }) => {
  // FIX: This guard clause prevents rendering with incorrect data
  if (!visualState || !visualState.documents) return <div className="bm25-container">Loading...</div>;

  const { documents, ranking, explanationBox } = visualState;
  
  // Create a map for quick ranking lookup
  const rankMap = new Map(ranking.map((id, index) => [id, index]));

  return (
    <div className="bm25-container">
      <div className="bm25-query">
        <strong>Query:</strong> "okapi giraffe"
      </div>
      <div className="bm25-docs-area">
        {documents.map(doc => (
          <div 
            key={doc.id} 
            className="doc-card" 
            style={{ transform: `translateY(${rankMap.get(doc.id) * 110}px)` }}
          >
            <h4>{doc.title} (ID: {doc.id})</h4>
            <p>"{doc.text}"</p>
            <div className="doc-score">
              BM25 Score: <strong>{doc.score.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
      <div className="bm25-explanation-box">
        {explanationBox && explanationBox.type === 'IDF' && (
          <>
            <h4>Inverse Document Frequency (IDF)</h4>
            <p>The term "<strong>{explanationBox.term}</strong>" is rare, so its importance (IDF score) is <strong>{explanationBox.value}</strong>.</p>
          </>
        )}
        {explanationBox && explanationBox.type === 'TF' && (
          <>
            <h4>Term Frequency (TF)</h4>
            <p>In Document {explanationBox.docId}, the term "<strong>{explanationBox.term}</strong>" appears frequently, so its TF score is <strong>{explanationBox.value}</strong>.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BM25Viz;