import { randomFoodPosition } from '../randomFoodPosition';
import { Coordinates, GameBounds } from '../../types/types';

const bounds: GameBounds = { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };

describe('randomFoodPosition', () => {
    it('returns position within boundaries', () => {
        const snake: Coordinates[] = [{ x: 5, y: 5 }];
        for (let i = 0; i < 50; i++) {
            const pos = randomFoodPosition(bounds, snake);
            expect(pos.x).toBeGreaterThanOrEqual(bounds.xMin);
            expect(pos.x).toBeLessThan(bounds.xMax);
            expect(pos.y).toBeGreaterThanOrEqual(bounds.yMin);
            expect(pos.y).toBeLessThan(bounds.yMax);
        }
    });

    it('never returns a position occupied by the snake', () => {
        const snake: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
        ];
        const occupied = new Set(snake.map(s => `${s.x},${s.y}`));
        for (let i = 0; i < 50; i++) {
            const pos = randomFoodPosition(bounds, snake);
            expect(occupied.has(`${pos.x},${pos.y}`)).toBe(false);
        }
    });

    it('works with a nearly-full board (only 1 free cell)', () => {
        const smallBounds: GameBounds = { xMin: 0, xMax: 2, yMin: 0, yMax: 2 };
        // Fill all cells except (1,1)
        const snake: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
        ];
        for (let i = 0; i < 10; i++) {
            const pos = randomFoodPosition(smallBounds, snake);
            expect(pos).toEqual({ x: 1, y: 1 });
        }
    });
});
