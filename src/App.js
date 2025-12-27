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
      <div className="py-10 px-20">
        <div className="text-4xl font-bold w-full flex flex-col items-center gap-5 py-10 border-8 border-black">

          Luggage Carousel
          {/* TOP: MOVING CAROUSEL */}
          <Carousel />

          <div className="w-full flex justify-end pr-10 ">
            <SpeedControl />
          </div>

          {/* BOTTOM: STORAGE GRID */}
          <div className="">
            <StorageGrid />
          </div>

          <div className="">
            <UnloadButton />
          </div>


        </div>
      </div>
    </DndProvider>
  );
};

export default App;
