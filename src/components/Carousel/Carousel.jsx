  import { useAppStore } from "../../store/useAppStore";
  import LuggageItem from "./LuggageItem";
  import useMovementInterval from "../../hooks/useMovementInterval";

  const Carousel = () => {
    const luggages = useAppStore((state) => state.luggages);
    const updateLuggagePositions = useAppStore((state) => state.updateLuggagePositions);

    const spawnLuggage = useAppStore((state) => state.spawnLuggage);

    useMovementInterval((delta) => {
      updateLuggagePositions(delta);

      const lastX = useAppStore.getState().getLastLuggageX();
      const MIN_GAP = 140; // width + padding
      
      if (lastX === null || lastX >= MIN_GAP) { // If no luggage OR the last luggage has moved enough → spawn a new one
        spawnLuggage();
      }
    }, 16);

    return (
    <div className="relative border-x border-4 border-black w-full h-32 overflow-hidden flex">
  {luggages.map((l) => (
    <LuggageItem key={l.id} luggage={l} />
  ))}
</div>

    );
  };

  export default Carousel;
