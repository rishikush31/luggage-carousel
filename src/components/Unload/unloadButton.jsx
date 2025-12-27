import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { useToast } from "../Toast/ToastContext";

const UnloadButton = () => {
  const unload = useAppStore((state) => state.unload);
  const {showToast} = useToast();

  const handleUnload = async () => {
    await unload(showToast, 1000); // delay between each luggage
  };

  return (
    <button
      onClick={handleUnload}
      className="text-2xl px-8 py-4 bg-black text-white rounded shadow 
             hover:scale-105 transition-transform duration-200"
    >
      UNLOAD
    </button>
  );
};

export default UnloadButton;
