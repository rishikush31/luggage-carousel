// src/App.jsx
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Carousel from "./components/Carousel/Carousel";
import StorageGrid from "./components/Storage/StorageGrid";
import UnloadButton from "./components/Unload/unloadButton";
import SpeedControl from "./components/Controls/SpeedControl";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="py-6 px-4 sm:px-10 lg:px-20">
        <div className="text-3xl sm:text-4xl font-bold w-full flex flex-col items-center gap-6 sm:gap-10 py-8 border-4 sm:border-8 border-black">

          <h1 className="text-center">Luggage Carousel</h1>

          {/* Carousel */}
          <div className="w-full min-w-4xl">
            <Carousel />
          </div>

          {/* Speed control aligned to right */}
          <div className="w-full flex justify-end pr-5 sm:pr-10">
            <SpeedControl />
          </div>

          {/* Storage Grid */}
          <div className="w-full flex justify-center px-2 sm:px-0 ">
            <div className="w-full max-w-xs sm:max-w-sm">
              <StorageGrid />
            </div>
          </div>

          {/* Unload Button */}
          <div className="mt-4">
            <UnloadButton />
          </div>

        </div>
      </div>
    </DndProvider>
  );
};

export default App;
