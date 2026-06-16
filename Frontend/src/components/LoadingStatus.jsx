import React from "react";

const LoadingStatus = ({ theme }) => {
  return (
    <div className="loading-container">
      <h2>Generating your {theme} story...</h2>

      <div className="loading-animation">
        <div className="spinner"></div>
      </div>

      <p className="loading-info">
        Please wait while your story is being generated...
      </p>
    </div>
  );
};

export default LoadingStatus;
