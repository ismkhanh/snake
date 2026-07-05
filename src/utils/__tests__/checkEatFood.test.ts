import { checkEatFood } from '../checkEatFood';

describe('checkEatFood', () => {
    it('returns true when head is exactly on food', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 5, y: 5 }, 2)).toBe(true);
    });

    it('returns true when head is within the area threshold', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 6, y: 6 }, 2)).toBe(true);
    });

    it('returns false when head is outside the area threshold', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 10, y: 10 }, 2)).toBe(false);
    });

    it('returns false when only X is close but Y is far', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 6, y: 20 }, 2)).toBe(false);
    });

    it('returns false when only Y is close but X is far', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 20, y: 6 }, 2)).toBe(false);
    });

    it('returns false when area is 0 and positions differ', () => {
        expect(checkEatFood({ x: 5, y: 5 }, { x: 5, y: 6 }, 0)).toBe(false);
    });

    it('returns false when area is 0 and positions match (< not <=)', () => {
        // absDistance = 0 which is NOT < 0, so returns false
        expect(checkEatFood({ x: 5, y: 5 }, { x: 5, y: 5 }, 0)).toBe(false);
    });
});
