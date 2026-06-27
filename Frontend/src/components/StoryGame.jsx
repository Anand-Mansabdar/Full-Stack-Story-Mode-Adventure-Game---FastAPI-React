import React, { useEffect, useState } from "react";

const StoryGame = ({ story, onNewStory }) => {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (story && story.root_node) {
      const rootNodeId = story.root_node.id;
      setCurrentNodeId(rootNodeId);
    }
  }, [story]);

  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];
      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_ending);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]);

  const chooseOption = (optionId) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentNodeId(optionId);
      setTransitioning(false);
    }, 300);
  };

  const restartStory = () => {
    setTransitioning(true);
    setTimeout(() => {
      if (story && story.root_node) {
        setCurrentNodeId(story.root_node.id);
      }
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Story title header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V14a1 1 0 11-2 0V4.804z" />
          </svg>
          Your Adventure
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          {story.title}
        </h1>
      </div>

      {/* Story content card */}
      <div className={`max-w-2xl mx-auto transition-all duration-300 ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        {currentNode && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden">
            {/* Story text */}
            <div className="p-8 md:p-10">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                {currentNode.content}
              </p>
            </div>

            {/* Ending or Options */}
            {isEnding ? (
              <div className={`p-8 md:p-10 border-t ${isWinningEnding ? "border-emerald-200 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30" : "border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50/80 to-slate-100/80 dark:from-slate-800/50 dark:to-slate-900/50"}`}>
                <div className="text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isWinningEnding ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-slate-200 dark:bg-slate-700"}`}>
                    {isWinningEnding ? (
                      <svg className="w-8 h-8 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                  </div>

                  <h3 className={`font-display text-2xl font-bold mb-2 ${isWinningEnding ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-200"}`}>
                    {isWinningEnding ? "🎉 Congratulations!" : "The End"}
                  </h3>

                  <p className={`text-base mb-6 ${isWinningEnding ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                    {isWinningEnding
                      ? "You've reached a winning ending! Your choices led you to victory."
                      : "Your adventure has come to an end. Try different choices for a new outcome!"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-10 border-t border-slate-200/60 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30">
                <h3 className="font-display text-lg font-bold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  What will you do?
                </h3>

                <div className="space-y-3">
                  {options.map((option, index) => (
                    <button
                      onClick={() => chooseOption(option.node_id)}
                      key={index}
                      id={`option-btn-${index}`}
                      className="w-full text-left px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300 transition-all duration-200 cursor-pointer group flex items-center gap-3"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 flex items-center justify-center text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-base font-medium leading-snug">
                        {option.text}
                      </span>
                      <svg className="w-5 h-5 ml-auto shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-violet-400 dark:group-hover:text-violet-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={restartStory}
            id="restart-btn"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart Story
          </button>

          {onNewStory && (
            <button
              onClick={onNewStory}
              id="new-story-btn"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryGame;
