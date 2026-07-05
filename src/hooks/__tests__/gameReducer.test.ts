import { gameReducer, initialState } from '../useGameLoop';
import { Direction, GameState } from '../../types/types';
import { SCORE_INCREMENT } from '../../constants/game';

const testBounds = { xMin: 0, xMax: 20, yMin: 0, yMax: 20 };

function stateWith(overrides: Partial<GameState>): GameState {
    return { ...initialState, gameBounds: testBounds, ...overrides };
}

describe('gameReducer', () => {
    describe('TICK', () => {
        it('moves snake head up', () => {
            const state = stateWith({ snake: [{ x: 10, y: 10 }] });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Up });
            expect(next.snake[0]).toEqual({ x: 10, y: 9 });
        });

        it('moves snake head down', () => {
            const state = stateWith({ snake: [{ x: 10, y: 10 }] });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Down });
            expect(next.snake[0]).toEqual({ x: 10, y: 11 });
        });

        it('moves snake head left', () => {
            const state = stateWith({ snake: [{ x: 10, y: 10 }] });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Left });
            expect(next.snake[0]).toEqual({ x: 9, y: 10 });
        });

        it('moves snake head right', () => {
            const state = stateWith({ snake: [{ x: 10, y: 10 }] });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next.snake[0]).toEqual({ x: 11, y: 10 });
        });

        it('snake body follows head (tail removed when not eating)', () => {
            const state = stateWith({
                snake: [
                    { x: 5, y: 5 },
                    { x: 4, y: 5 },
                    { x: 3, y: 5 },
                ],
                food: { x: 19, y: 19 }, // far away, won't eat
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next.snake).toEqual([
                { x: 6, y: 5 },
                { x: 5, y: 5 },
                { x: 4, y: 5 },
            ]);
        });

        it('snake grows when eating food (tail preserved)', () => {
            const state = stateWith({
                snake: [{ x: 5, y: 5 }],
                food: { x: 6, y: 5 }, // adjacent, within area=2
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next.snake).toHaveLength(2);
            expect(next.snake[0]).toEqual({ x: 6, y: 5 });
            expect(next.snake[1]).toEqual({ x: 5, y: 5 });
        });

        it('score increments by SCORE_INCREMENT on eat', () => {
            const state = stateWith({
                snake: [{ x: 5, y: 5 }],
                food: { x: 6, y: 5 },
                score: 0,
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next.score).toBe(SCORE_INCREMENT);
        });

        it('is a no-op when isPaused is true', () => {
            const state = stateWith({
                snake: [{ x: 10, y: 10 }],
                isPaused: true,
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next).toBe(state); // same reference
        });

        it('is a no-op when isGameOver is true', () => {
            const state = stateWith({
                snake: [{ x: 10, y: 10 }],
                isGameOver: true,
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next).toBe(state); // same reference
        });

        it('sets isGameOver when wall collision detected', () => {
            // Snake at boundary edge - checkGameOver runs BEFORE moving
            const state = stateWith({
                snake: [{ x: -1, y: 5 }], // already out of bounds
            });
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Right });
            expect(next.isGameOver).toBe(true);
        });

        it('prevents direction reversal into own body', () => {
            // Snake moving right: head(6,5) neck(5,5) tail(4,5)
            const state = stateWith({
                snake: [
                    { x: 6, y: 5 },
                    { x: 5, y: 5 },
                    { x: 4, y: 5 },
                ],
                food: { x: 19, y: 19 },
            });
            // Request Left (opposite of Right) — should be rejected
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Left });
            // Snake should continue Right instead of reversing
            expect(next.snake[0]).toEqual({ x: 7, y: 5 });
        });

        it('prevents reversal via intermediate direction change', () => {
            // Snake moving down: head(5,7) neck(5,6) tail(5,5)
            const state = stateWith({
                snake: [
                    { x: 5, y: 7 },
                    { x: 5, y: 6 },
                    { x: 5, y: 5 },
                ],
                food: { x: 19, y: 19 },
            });
            // Request Up (opposite of Down) — should be rejected
            const next = gameReducer(state, { type: 'TICK', direction: Direction.Up });
            // Snake should continue Down
            expect(next.snake[0]).toEqual({ x: 5, y: 8 });
        });
    });

    describe('TOGGLE_PAUSE', () => {
        it('flips isPaused from false to true', () => {
            const state = stateWith({ isPaused: false });
            const next = gameReducer(state, { type: 'TOGGLE_PAUSE' });
            expect(next.isPaused).toBe(true);
        });

        it('flips isPaused from true to false', () => {
            const state = stateWith({ isPaused: true });
            const next = gameReducer(state, { type: 'TOGGLE_PAUSE' });
            expect(next.isPaused).toBe(false);
        });
    });

    describe('RELOAD', () => {
        it('resets to initial state but preserves gameBounds', () => {
            const state = stateWith({
                snake: [{ x: 15, y: 15 }, { x: 14, y: 15 }],
                score: 100,
                isPaused: true,
                isGameOver: true,
            });
            const next = gameReducer(state, { type: 'RELOAD' });
            expect(next.score).toBe(0);
            expect(next.isPaused).toBe(false);
            expect(next.isGameOver).toBe(false);
            expect(next.snake).toEqual(initialState.snake);
            expect(next.gameBounds).toEqual(testBounds);
        });
    });

    describe('SET_BOUNDS', () => {
        it('updates gameBounds', () => {
            const newBounds = { xMin: 1, xMax: 30, yMin: 1, yMax: 30 };
            const next = gameReducer(initialState, { type: 'SET_BOUNDS', bounds: newBounds });
            expect(next.gameBounds).toEqual(newBounds);
        });
    });
});
