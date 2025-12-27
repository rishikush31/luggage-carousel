import { useEffect, useRef } from "react";
import { useAppStore } from "../store/useAppStore";

const useMovementInterval = (callback, interval = 16) => {
  const savedCallback = useRef();
  const lastTimeRef = useRef(Date.now()); // store last tick time
  const speed = useAppStore((s) => s.carouselSpeed);

  // Keep callback up to date, idk if i need to or not
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // since this setInterval call is blocked by react in background, let it be, we will update the final position in useAppStore by calculating last updateTime of position
  useEffect(() => {
    setInterval(() => {
      
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current; // ms since last time
      lastTimeRef.current = now;

      savedCallback.current(deltaTime*speed); // pass deltaTime to callback
    }, interval);

  }, [interval, speed]);
};

export default useMovementInterval;
