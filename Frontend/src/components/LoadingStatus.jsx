import React from "react";

const LoadingStatus = ({ theme }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      {/* Animated spinner */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-slate-400 border-r-slate-500 animate-spin-slow"></div>
        {/* Inner glow */}
        <div className="absolute inset-2 w-16 h-16 rounded-full bg-linear-to-br from-slate-400/10 to-slate-500/10 dark:from-slate-400/20 dark:to-slate-500/20 animate-pulse flex items-center justify-center">
          <svg
            className="w-7 h-7 text-slate-500 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
      </div>

      {/* Status text */}
      <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-3">
        Crafting your{" "}
        <span className="text-slate-600 dark:text-slate-300">{theme}</span>{" "}
        story...
      </h2>

      <p className="text-slate-500 dark:text-slate-400 text-base max-w-sm text-center mb-8">
        Our AI is weaving an intricate branching narrative with multiple paths
        and endings just for you.
      </p>

      {/* Progress steps */}
      <div className="flex items-center gap-3">
        {["Generating plot", "Building paths", "Crafting endings"].map(
          (step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400 animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                {step}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default LoadingStatus;
