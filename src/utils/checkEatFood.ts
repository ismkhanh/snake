import { Coordinates } from '../types/types';

export const checkEatFood = (
    head: Coordinates, 
    food: Coordinates,
    area: number,
): boolean => {
    const absDistanceX: number = Math.abs(head.x - food.x);
    const absDistanceY: number = Math.abs(head.y - food.y);

    return absDistanceX < area && absDistanceY < area;
};