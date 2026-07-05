# Snake

A classic Snake game built with React Native and Expo. Uses Skia for high-performance canvas rendering and gesture-based swipe controls.

![React Native](https://img.shields.io/badge/React_Native-0.81-blue)
![Expo](https://img.shields.io/badge/Expo-54-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Tests](https://img.shields.io/badge/Tests-38_passing-green)

## Tech Stack

- **React Native** with Expo (SDK 54)
- **@shopify/react-native-skia** for canvas rendering
- **react-native-gesture-handler** for swipe controls
- **react-native-fast-confetti** for new-high-score celebration
- **@react-native-async-storage/async-storage** for high score persistence
- **expo-haptics** for haptic feedback on eating food
- **useReducer** for state management
- **Jest + jest-expo** for testing

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Running Tests

```bash
npm test
```

Currently covers:

- Collision detection (walls + self)
- Food spawning logic
- Game reducer (tick, pause, reload, bounds)
- Eat detection with distance thresholds
- Snake direction inference

## Project Structure

```
src/
├── components/
│   ├── Game.tsx           # Main game screen, composes all UI
│   ├── GameCanvas.tsx     # Skia canvas rendering snake + food
│   ├── GameOverModal.tsx  # Game over dialog with confetti
│   └── Header.tsx         # Score display, pause/reload controls
├── constants/
│   └── game.ts           # Tuning values (cell size, speed, score)
├── hooks/
│   └── useGameLoop.ts    # Game state reducer + RAF loop
├── styles/
│   └── colors.ts         # Color palette
├── types/
│   └── types.ts          # TypeScript interfaces and enums
└── utils/
    ├── checkEatFood.ts       # Distance-based eat detection
    ├── checkGameOver.ts      # Wall + self-collision checks
    ├── getSnakeDirection.ts   # Infer direction from head/neck segments
    ├── randomFoodPosition.ts # Food placement avoiding snake body
    └── storage.ts            # AsyncStorage high score persistence
```

## Architecture

The game state is managed by a pure reducer (`gameReducer`) that handles four actions:

| Action | Effect |
|--------|--------|
| `TICK` | Move snake, check collisions, handle eating |
| `TOGGLE_PAUSE` | Pause/resume the game loop |
| `RELOAD` | Reset state, preserve bounds |
| `SET_BOUNDS` | Update playfield dimensions from layout |

The game loop runs via `requestAnimationFrame` with a fixed-timestep accumulator to ensure consistent tick rate regardless of frame rate. All game logic (collision detection, food spawning) is extracted into pure utility functions for testability.

## Demo

https://github.com/user-attachments/assets/f84e5976-9a70-4332-ae56-20fac2c29355


