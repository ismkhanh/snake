import { checkEatFood } from '../checkEatFood';

// Collision is now circle (head, radius=SEGMENT_SIZE=15) vs rectangle (food, 15x15).
// Positions are grid coords; pixel conversion uses CELL_SIZE=10, SEGMENT_SIZE=15.
// Head circle center = (x*10 + 7.5, y*10 + 7.5), radius = 15.

describe('checkEatFood', () => {
    it('returns true when head is exactly on food', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 5, y: 5 }, 1)).toBe(true);
    });

    it('returns true when food is one cell away (within head radius)', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 6, y: 5 }, 1)).toBe(true);
    });

    it('returns true when food is diagonally adjacent (within head radius)', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 6, y: 6 }, 1)).toBe(true);
    });

    it('returns false when food is far away', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 10, y: 10 }, 1)).toBe(false);
    });

    it('returns false when only X is close but Y is far', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 6, y: 20 }, 1)).toBe(false);
    });

    it('returns false when only Y is close but X is far', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 20, y: 6 }, 1)).toBe(false);
    });
});
