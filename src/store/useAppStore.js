import { create } from "zustand";
import { DEFAULT_CAROUSEL_SPEED, STORAGE_SIZE, PRIORITY_SLOTS } from "../config/constants";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAppStore = create((set, get) => ({

    // STATE
    luggages: [], // Array of luggages Items
    nextId: 1,  // what is the Id of newly spawned luggage ite,
    carouselSpeed: DEFAULT_CAROUSEL_SPEED, // px per frame

    storage: Array.from({ length: STORAGE_SIZE }, (_, i) => ({
        id: i,
        luggageId: null,
        priority: PRIORITY_SLOTS.includes(i),
    })), // make an array of size = STORAGE_SIZE, luggage id is null since it is empty at first, and priority set for first 3 items


    // ACTIONS

    getLastLuggageX: () => { // Use for spawnLuggage checking
        const { luggages } = get();
        return luggages.length > 0 ? luggages[luggages.length - 1].x : null;
    },

    spawnLuggage: () =>
        set((state) => ({
            luggages: [
                ...state.luggages,
                {
                    id: state.nextId,
                    x: 0, // Spawn new luggage at x = 0
                    isDragging: false,
                    inStorage: false,
                },
            ],
            nextId: state.nextId + 1, // set nextId
        })),

    updateLuggagePositions: (deltaTime) => // delta time is the time difference from the last time updateLuggaePosition was called
        set((state) => ({
            luggages: state.luggages
                .map((l) =>
                    l.inStorage || l.isDragging
                        ? l
                        : {
                            ...l,
                            x: l.x + state.carouselSpeed * (deltaTime / 16.67), // scale by elapsed ms since last called
                        }
                )
                .filter((l) => l.x < window.innerWidth - 120), // remove if out of scope
        })),


    startDragging: (id) =>
        set((state) => ({
            luggages: state.luggages.map((l) =>
                l.id === id ? { ...l, isDragging: true } : l // Drag start → hide from carousel
            ),
        })),

    returnToCarousel: (id) =>
        set((state) => ({
            luggages: state.luggages.map((l) =>
                l.id === id ? { ...l, isDragging: false } : l // Drag end fail → return to carousel
            ),
        })),

    placeInStorage: (slotId, luggageId) =>
        set((state) => ({
            storage: state.storage.map((s) =>
                s.id === slotId
                    ? { ...s, luggageId, placedAt: Date.now() }
                    : s
            ),

            luggages: state.luggages.map((l) =>
                l.id === luggageId
                    ? { ...l, inStorage: true, isDragging: false }
                    : l
            ),
        })),

    // Adjustable carousel speed
    setCarouselSpeed: (speed) => set({ carouselSpeed: speed }),

    // Unload luggage LIFO + priority row first
    unload: async (onToast, delay = 300) => {
        const { storage } = get();

        const active = storage.filter((s) => s.luggageId !== null); // only filled slots
        if (active.length === 0) return;

        // Sort: priority first, then by placedAt (newest first)
        const sorted = active.sort((a, b) => {
            if (a.priority !== b.priority) return b.priority - a.priority;
            return b.placedAt - a.placedAt;
        });

        // unload logic
        for (const slot of sorted) {
            onToast?.(`Unloaded luggage ${slot.luggageId}`); // make toast
            set((state) => ({
                storage: state.storage.map((s) =>
                    s.id === slot.id ? { ...s, luggageId: null, placedAt: null } : s
                ),
            }));
            await sleep(delay);
        }
    },


}));
