# Luggage Carousel Simulator

A React-based interactive luggage carousel simulator that demonstrates drag-and-drop functionality, state management, and real-time animations. Users can watch luggage items move along a conveyor belt, drag them to storage slots, adjust the carousel speed, and unload stored items with priority handling.

## Features

- **Real-time Carousel Animation**: Luggage items continuously spawn and move along the conveyor belt
- **Drag & Drop Storage**: Interactive drag-and-drop functionality to store luggage in a 3x3 grid
- **Priority Storage**: The first row of storage slots is designated as priority storage with visual distinction
- **Speed Control**: Adjustable carousel speed from 0.2x to 3.0x speed
- **Unload System**: Unload stored luggage with priority-first, last-in-first-out (LIFO) logic
- **Toast Notifications**: Real-time feedback during unload operations
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Technologies Used

- **React 19**: Modern React with hooks and functional components
- **React DnD**: Drag and drop functionality with HTML5 backend
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first CSS framework
- **Create React App**: Build setup and development server
- **GitHub Pages**: Deployment platform

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rishikush31/luggage-carousel.git
cd luggage-carousel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys the app to GitHub Pages

## How to Use

1. **Watch the Carousel**: Luggage items will automatically spawn and move from left to right
2. **Adjust Speed**: Use the speed control slider to change carousel speed (0.2x to 3.0x)
3. **Store Luggage**: Drag luggage items from the carousel to empty storage slots
4. **Priority Slots**: The top row (slots 1-3) are priority storage with dotted borders
5. **Unload**: Click the "UNLOAD" button to remove stored items (priority first, then LIFO)

## Project Structure

```
src/
├── components/
│   ├── Carousel/
│   │   ├── Carousel.jsx      # Main carousel component
│   │   └── LuggageItem.jsx   # Individual luggage item
│   ├── Controls/
│   │   └── SpeedControl.jsx  # Speed adjustment slider
│   ├── Storage/
│   │   ├── StorageGrid.jsx   # Storage grid layout
│   │   └── StorageSlot.jsx   # Individual storage slot
│   ├── Toast/
│   │   └── ToastContext.jsx  # Toast notification system
│   └── Unload/
│       └── unloadButton.jsx  # Unload functionality
├── config/
│   └── constants.js          # App configuration constants
├── hooks/
│   └── useMovementInterval.js # Animation timing hook
├── store/
│   └── useAppStore.js        # Zustand state management
└── App.js                    # Main app component
```

## Deployment

The app is configured for deployment to GitHub Pages. To deploy:

```bash
npm run deploy
```

This will build the app and deploy it to the configured GitHub Pages URL.

## Application Flow

### Carousel Management

The carousel system is built around continuous animation and automatic luggage spawning:

1. **Animation Loop**: Uses a custom `useMovementInterval` hook that runs every ~16ms (60fps) to update luggage positions
2. **Luggage Spawning**: New luggage items spawn at x=0 when the last active luggage has moved at least 140px away (width + padding)
3. **Movement**: Luggage moves rightward at a configurable speed (default 1.5px/frame), scaled by elapsed time for smooth animation
4. **Cleanup**: Luggage items are removed when they move beyond the viewport width

### Drag & Drop System

The drag-and-drop functionality is managed through React DnD with the following flow:

1. **Drag Initiation**: When a user starts dragging a luggage item, `startDragging(id)` is called, marking the item as `isDragging: true`
2. **Visual Feedback**: Dragged items are hidden from the carousel but remain visible as drag previews
3. **Drop Handling**: 
   - **Successful Drop**: If dropped on a valid storage slot, `placeInStorage(slotId, luggageId)` updates both storage and luggage state
   - **Failed Drop**: If dropped outside valid areas, `returnToCarousel(id)` resets the item to carousel movement
4. **State Updates**: Luggage state includes `inStorage`, `isDragging`, and position tracking

### State Management

All application state is managed through Zustand store (`useAppStore`):

- **Luggage Array**: Tracks all luggage items with id, position, and status
- **Storage Grid**: 3x3 array of slots with priority designation for first row
- **Speed Control**: Adjustable carousel speed affecting movement calculations
- **Unload Logic**: Priority-first, LIFO unloading with async delays and toast notifications

### Key Interactions

- **Speed Changes**: Immediately affect movement calculations in the animation loop
- **Storage Placement**: Updates both luggage (`inStorage: true`) and storage slot (`luggageId`) states
- **Unload Process**: Iterates through stored items with 1-second delays, showing toasts for each unloaded item

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and not licensed for public use.

## Live Demo

View the live demo at: [https://rishikush31.github.io/luggage-carousel](https://rishikush31.github.io/luggage-carousel)
