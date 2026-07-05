export interface GestureEventType {
    translationX: number;
    translationY: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

export enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
}

export interface GameBounds {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

export interface GameState {
    snake: Coordinates[];
    food: Coordinates;
    isGameOver: boolean;
    isPaused: boolean;
    score: number;
    gameBounds: GameBounds;
}

export type GameAction =
    | { type: 'TICK'; direction: Direction }
    | { type: 'TOGGLE_PAUSE' }
    | { type: 'RELOAD' }
    | { type: 'SET_BOUNDS'; bounds: GameBounds };