import React, { useState } from "react";

const ThemeInput = ({ onSubmit }) => {
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!theme.trim()) {
      setError("Please enter a theme");
      return;
    }

    onSubmit(theme.trim());
  };
  return (
    <div>
      <h2>Generate your Adventure</h2>
      <p>Enter a theme for your interactive story</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Enter a theme (e.g., pirates, space..."
            className={error ? "error" : ""}
          />

          {error && 
            <p>{error}</p>
          }

          <button type="submit">
            Generate Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThemeInput;
