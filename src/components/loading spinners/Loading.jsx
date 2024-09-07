import React from 'react';
import './loading.css'; // Import the CSS file

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );
}

export default Loading;
