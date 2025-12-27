import React from "react";
import { useDrag } from "react-dnd";

const LuggageItem = ({ luggage }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LUGGAGE",
    item: { id: luggage.id },
    collect: (monitor) => ({ // collector function called everytime for state update
      isDragging: monitor.isDragging(), // monitor tells the state about component
    }),
  }));

  if (luggage.inStorage) return null; // Hide if luggage is in storage

  return (
    <div
      ref={drag}
      className="absolute top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14"
      style={{ opacity: isDragging ? 0.3 : 1, pointerEvents: "auto" }}
    >
      <div
        className="w-full h-full bg-black text-white rounded shadow flex items-center justify-center font-bold text-xs sm:text-sm"
        style={{ transform: `translateX(${luggage.x}px)` }}
      >
        {luggage.id}
      </div>
    </div>

  );
};

export default LuggageItem;
