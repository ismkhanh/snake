import { Coordinates, Direction } from '../types/types';

/**
 * Derives the snake's actual movement direction from its head and neck positions.
 * Returns null if the snake has fewer than 2 segments.
 */
export const getSnakeDirection = (snake: Coordinates[]): Direction | null => {
    if (snake.length < 2) return null;

    const dx = snake[0].x - snake[1].x;
    const dy = snake[0].y - snake[1].y;

    if (dx === 1) return Direction.Right;
    if (dx === -1) return Direction.Left;
    if (dy === 1) return Direction.Down;
    return Direction.Up;
};
