import React from "react";
import { useAppStore } from "../../store/useAppStore";
import StorageSlot from "./StorageSlot";

const StorageGrid = () => {
    const storage = useAppStore((state) => state.storage);

    const firstRow = storage.slice(0, 3);   // priority row
    const otherRows = storage.slice(3);     // remaining rows

    return (
        <div className="flex flex-col p-2 sm:p-4">

            {/* PRIORITY ROW WITH OUTER DOTTED BORDER */}
            <div className="p-2 border-4 border-dotted border-black rounded-xl w-fit mx-auto">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 w-fit mx-auto">
                    {firstRow.map((slot) => (
                        <StorageSlot key={slot.id} slotId={slot.id} />
                    ))}
                </div>
            </div>

            {/* OTHER ROWS */}
            <div className="p-2 rounded-xl w-fit mx-auto">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-fit mx-auto ">
                {otherRows.map((slot) => (
                    <StorageSlot key={slot.id} slotId={slot.id} />
                ))}
            </div>
            </div>

        </div>

    );
};

export default StorageGrid;
