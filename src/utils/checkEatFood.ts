import { Coordinates } from '../types/types';
import { CELL_SIZE, SEGMENT_SIZE } from '../constants/game';

const HEAD_RADIUS = SEGMENT_SIZE; // matches GameCanvas

/**
 * Circle-vs-rectangle collision: returns true when the circular head
 * overlaps the square food piece at all.
 */
export const checkEatFood = (
    head: Coordinates,
    food: Coordinates,
    _area: number,
): boolean => {
    // Head circle center in pixels
    const circleCx = head.x * CELL_SIZE + SEGMENT_SIZE / 2;
    const circleCy = head.y * CELL_SIZE + SEGMENT_SIZE / 2;

    // Food rectangle in pixels
    const rectX = food.x * CELL_SIZE;
    const rectY = food.y * CELL_SIZE;

    // Find closest point on the rectangle to the circle center
    const closestX = Math.max(rectX, Math.min(circleCx, rectX + SEGMENT_SIZE));
    const closestY = Math.max(rectY, Math.min(circleCy, rectY + SEGMENT_SIZE));

    const dx = circleCx - closestX;
    const dy = circleCy - closestY;

    return dx * dx + dy * dy <= HEAD_RADIUS * HEAD_RADIUS;
};