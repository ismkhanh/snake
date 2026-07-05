import { getSnakeDirection } from '../getSnakeDirection';
import { Direction } from '../../types/types';

describe('getSnakeDirection', () => {
    it('returns null for a single-segment snake', () => {
        expect(getSnakeDirection([{ x: 5, y: 5 }])).toBeNull();
    });

    it('returns Right when head is to the right of neck', () => {
        const snake = [{ x: 6, y: 5 }, { x: 5, y: 5 }];
        expect(getSnakeDirection(snake)).toBe(Direction.Right);
    });

    it('returns Left when head is to the left of neck', () => {
        const snake = [{ x: 4, y: 5 }, { x: 5, y: 5 }];
        expect(getSnakeDirection(snake)).toBe(Direction.Left);
    });

    it('returns Down when head is below neck', () => {
        const snake = [{ x: 5, y: 6 }, { x: 5, y: 5 }];
        expect(getSnakeDirection(snake)).toBe(Direction.Down);
    });

    it('returns Up when head is above neck', () => {
        const snake = [{ x: 5, y: 4 }, { x: 5, y: 5 }];
        expect(getSnakeDirection(snake)).toBe(Direction.Up);
    });
});
