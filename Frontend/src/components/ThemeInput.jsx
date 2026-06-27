import React, { useState } from "react";

const ThemeInput = ({ onSubmit }) => {
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = ["🏴‍☠️ Pirates", "🚀 Space", "🧙‍♂️ Fantasy", "🔍 Mystery", "🧟 Zombie", "🏰 Medieval"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme.trim()) {
      setError("Please enter a theme");
      return;
    }
    setError("");
    onSubmit(theme.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    const cleanTheme = suggestion.replace(/^[^\w]+\s*/, "");
    setTheme(cleanTheme);
    setError("");
  };

  return (
    <div className="animate-fade-in-up">
      {/* Hero section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6 animate-fade-in-up-delay-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
          AI-Powered Story Creation
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-up-delay-1">
          <span className="text-slate-800 dark:text-white">Craft Your </span>
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed animate-fade-in-up-delay-2">
          Enter a theme and watch AI weave an interactive branching story
          where every choice shapes your destiny.
        </p>
      </div>

      {/* Input card */}
      <div className="max-w-xl mx-auto animate-fade-in-up-delay-3">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              Story Theme
            </label>

            <div className={`relative rounded-xl transition-all duration-300 ${isFocused ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800" : ""}`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <input
                type="text"
                value={theme}
                onChange={(e) => {
                  setTheme(e.target.value);
                  if (error) setError("");
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g., pirates, space exploration, haunted mansion..."
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base font-sans transition-colors duration-200 focus:outline-none ${error ? "border-red-400 dark:border-red-500" : "border-slate-200 dark:border-slate-600"}`}
                id="theme-input"
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            {/* Quick theme suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-700 dark:hover:text-violet-300 border border-transparent hover:border-violet-200 dark:hover:border-violet-700 transition-all duration-200 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="submit"
              id="generate-story-btn"
              className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Story
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThemeInput;
