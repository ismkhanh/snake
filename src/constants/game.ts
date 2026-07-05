import { Coordinates } from '../types/types';

export const SNAKE_INITIAL_POSITION: Coordinates[] = [{ x: 5, y: 5 }];
export const FOOD_INITIAL_POSITION: Coordinates = { x: 5, y: 20 };
export const CELL_SIZE = 10;
export const SEGMENT_SIZE = 15;
export const MOVE_INTERVAL = 50;
export const SCORE_INCREMENT = 10;
