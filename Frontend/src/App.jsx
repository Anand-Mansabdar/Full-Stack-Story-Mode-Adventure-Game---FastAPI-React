import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoryLoader from "./components/StoryLoader";
import StoryGenerator from "./components/StoryGenerator";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950 transition-colors duration-500">
          {/* Decorative background blobs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200/30 dark:bg-violet-800/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-fuchsia-200/20 dark:bg-fuchsia-800/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
          </div>

          {/* Navigation bar */}
          <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 group no-underline">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-display text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  StoryForge
                </span>
              </a>

              <ThemeToggle />
            </div>
          </nav>

          {/* Main content */}
          <main className="max-w-5xl mx-auto px-6 py-12">
            <Routes>
              <Route path="/story/:id" element={<StoryLoader />} />
              <Route path="/" element={<StoryGenerator />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 py-6 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-500 font-sans">
                Powered by AI &middot; Built with ❤️ &middot; StoryForge
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
