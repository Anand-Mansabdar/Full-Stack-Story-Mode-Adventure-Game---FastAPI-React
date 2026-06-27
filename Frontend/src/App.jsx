import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoryLoader from "./components/StoryLoader";
import StoryGenerator from "./components/StoryGenerator";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Interactive Story Generator</h1>
        </header>

        <main>
          <Routes>
            <Route path={"/story/:id"} element={<StoryLoader />} />

            <Route path={"/"} element={<StoryGenerator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
