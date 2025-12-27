import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../dnd/dragTypes";
import { useAppStore } from "../../store/useAppStore";

const StorageSlot = ({ slotId }) => {

  const { placeInStorage } = useAppStore();

  const [, drop] = useDrop({

    accept: ItemTypes.LUGGAGE, // What type to accept

    canDrop: () => { // check on hovering item on the slot
      const slot = useAppStore.getState().storage.find((s) => s.id === slotId);
      return slot?.luggageId === null;
    },

    drop: (item) => { // call this on drop event 
      const slot = useAppStore.getState().storage.find((s) => s.id === slotId);
      if (slot?.luggageId === null) placeInStorage(slotId, item.id);
      return { slotId };
    },

    collect: (monitor) => ({ // collector function called everytime to update state
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const slot = useAppStore.getState().storage.find((s) => s.id === slotId);

  return (
    <div
      ref={drop}
      className={`w-20 h-20 flex items-center justify-center rounded-lg
    border-8 border-black p-2`}
    >
      {slot?.luggageId ? (
        <div className="font-bold flex items-center justify-center text-lg h-full w-full text-white bg-black rounded">{slot.luggageId}</div>
      ) : (
        <div className="items-center justify-center"></div>
      )}
    </div>
  );
};

export default StorageSlot;
