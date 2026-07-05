import { Coordinates, GameBounds } from "../types/types";

export const checkGameOver = (
    snakeHead: Coordinates[],
    boundaries: GameBounds
): boolean => {
    const head = snakeHead[0];
    
    // Check if the snake has hit the wall
    if (
        head.x < boundaries.xMin || 
        head.x >= boundaries.xMax || 
        head.y < boundaries.yMin || 
        head.y >= boundaries.yMax
    ) {
        return true;
    }

    // Check if the snake has hit itself (Set for O(1) lookup)
    const bodySet = new Set(
        snakeHead.slice(1).map(s => `${s.x},${s.y}`)
    );
    return bodySet.has(`${head.x},${head.y}`);
};