import { useAppStore } from "../../store/useAppStore";
const SpeedControl = () => {
    const { carouselSpeed, setCarouselSpeed } = useAppStore();

    return (
        <div className="p-2 sm:p-4 bg-white border-2 border-black rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-fit">
            <span className="text-sm font-semibold">Speed</span>

            <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={carouselSpeed}
                onChange={(e) => setCarouselSpeed(Number(e.target.value))}
                className="w-32 sm:w-40 accent-black"
            />

            <span className="text-sm font-bold text-black px-2 py-1 border border-black rounded">
                {carouselSpeed.toFixed(1)}x
            </span>
        </div>


    );
};

export default SpeedControl;
