import { Coordinates, GameBounds } from "../types/types";

export const randomFoodPosition = (boundaries: GameBounds, snake: Coordinates[]): Coordinates => {
    const occupied = new Set(snake.map(s => `${s.x},${s.y}`));
    let position: Coordinates;
    do {
        const x = Math.floor(Math.random() * (boundaries.xMax - boundaries.xMin)) + boundaries.xMin;
        const y = Math.floor(Math.random() * (boundaries.yMax - boundaries.yMin)) + boundaries.yMin;
        position = { x, y };
    } while (occupied.has(`${position.x},${position.y}`));
    return position;
};
