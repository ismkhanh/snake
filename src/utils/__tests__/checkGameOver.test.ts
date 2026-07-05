import { checkGameOver } from '../checkGameOver';
import { GameBounds } from '../../types/types';

const bounds: GameBounds = { xMin: 0, xMax: 20, yMin: 0, yMax: 20 };

describe('checkGameOver', () => {
    it('returns false for snake within bounds', () => {
        const snake = [{ x: 10, y: 10 }];
        expect(checkGameOver(snake, bounds)).toBe(false);
    });

    it('returns true when head hits left wall (x < xMin)', () => {
        const snake = [{ x: -1, y: 10 }];
        expect(checkGameOver(snake, bounds)).toBe(true);
    });

    it('returns true when head hits right wall (x >= xMax)', () => {
        const snake = [{ x: 20, y: 10 }];
        expect(checkGameOver(snake, bounds)).toBe(true);
    });

    it('returns true when head hits top wall (y < yMin)', () => {
        const snake = [{ x: 10, y: -1 }];
        expect(checkGameOver(snake, bounds)).toBe(true);
    });

    it('returns true when head hits bottom wall (y >= yMax)', () => {
        const snake = [{ x: 10, y: 20 }];
        expect(checkGameOver(snake, bounds)).toBe(true);
    });

    it('returns false for single-segment snake (no self-collision possible)', () => {
        const snake = [{ x: 5, y: 5 }];
        expect(checkGameOver(snake, bounds)).toBe(false);
    });

    it('returns true when head overlaps a body segment (self-collision)', () => {
        const snake = [
            { x: 5, y: 5 },
            { x: 6, y: 5 },
            { x: 6, y: 6 },
            { x: 5, y: 6 },
            { x: 5, y: 5 }, // body overlaps head
        ];
        expect(checkGameOver(snake, bounds)).toBe(true);
    });
});
