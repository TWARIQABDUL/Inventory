import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-text">
        <h2>Loading Analytics Dashboard</h2>
        <p>Preparing your data visualizations...</p>
      </div>
    </div>
  );
};