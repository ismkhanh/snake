import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { GestureUpdateEvent } from 'react-native-gesture-handler';
import { Direction, GameState, GameAction, GestureEventType } from '../types/types';
import { checkGameOver } from '../utils/checkGameOver';
import { checkEatFood } from '../utils/checkEatFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import {
    SNAKE_INITIAL_POSITION,
    FOOD_INITIAL_POSITION,
    MOVE_INTERVAL,
    SCORE_INCREMENT,
    SEGMENT_SIZE,
    CELL_SIZE,
} from '../constants/game';

const initialState: GameState = {
    snake: SNAKE_INITIAL_POSITION,
    food: FOOD_INITIAL_POSITION,
    isGameOver: false,
    isPaused: false,
    score: 0,
    gameBounds: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
};

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'TICK': {
            if (state.isGameOver || state.isPaused) return state;

            if (checkGameOver(state.snake, state.gameBounds)) {
                return { ...state, isGameOver: true };
            }

            const head = state.snake[0];
            const newHead = { ...head };

            switch (action.direction) {
                case Direction.Up: newHead.y -= 1; break;
                case Direction.Down: newHead.y += 1; break;
                case Direction.Left: newHead.x -= 1; break;
                case Direction.Right: newHead.x += 1; break;
            }

            if (checkEatFood(newHead, state.food, 2)) {
                const newSnake = [newHead, ...state.snake];
                return {
                    ...state,
                    snake: newSnake,
                    food: randomFoodPosition(state.gameBounds, newSnake),
                    score: state.score + SCORE_INCREMENT,
                };
            }

            return {
                ...state,
                snake: [newHead, ...state.snake.slice(0, -1)],
            };
        }
        case 'TOGGLE_PAUSE':
            return { ...state, isPaused: !state.isPaused };
        case 'RELOAD':
            return { ...initialState, gameBounds: state.gameBounds };
        case 'SET_BOUNDS':
            return { ...state, gameBounds: action.bounds };
        default:
            return state;
    }
}

export function useGameLoop() {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const directionRef = useRef<Direction>(Direction.Right);
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
        let lastTime = 0;
        let accumulator = 0;
        let rafId: number;

        const loop = (timestamp: number) => {
            if (lastTime === 0) lastTime = timestamp;

            const delta = timestamp - lastTime;
            lastTime = timestamp;

            const { isGameOver, isPaused, gameBounds } = stateRef.current;

            if (gameBounds.xMax > 0 && !isGameOver && !isPaused) {
                accumulator += delta;
                while (accumulator >= MOVE_INTERVAL) {
                    dispatch({ type: 'TICK', direction: directionRef.current });
                    accumulator -= MOVE_INTERVAL;
                }
            } else {
                accumulator = 0;
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, []);

    const onBoundariesLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        dispatch({
            type: 'SET_BOUNDS',
            bounds: {
                xMin: 0,
                xMax: Math.floor((width - SEGMENT_SIZE) / CELL_SIZE),
                yMin: 0,
                yMax: Math.floor((height - SEGMENT_SIZE) / CELL_SIZE),
            },
        });
    }, []);

    const handleGesture = useCallback((event: GestureUpdateEvent<GestureEventType>) => {
        const { translationX, translationY } = event;
        const current = directionRef.current;

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0 && current !== Direction.Left) {
                directionRef.current = Direction.Right;
            } else if (translationX <= 0 && current !== Direction.Right) {
                directionRef.current = Direction.Left;
            }
        } else {
            if (translationY > 0 && current !== Direction.Up) {
                directionRef.current = Direction.Down;
            } else if (translationY <= 0 && current !== Direction.Down) {
                directionRef.current = Direction.Up;
            }
        }
    }, []);

    const panGesture = useMemo(() => Gesture.Pan().onUpdate(handleGesture), [handleGesture]);

    const pauseGame = useCallback(() => {
        dispatch({ type: 'TOGGLE_PAUSE' });
    }, []);

    const reloadGame = useCallback(() => {
        directionRef.current = Direction.Right;
        dispatch({ type: 'RELOAD' });
    }, []);

    return {
        snake: state.snake,
        food: state.food,
        score: state.score,
        isPaused: state.isPaused,
        gameBounds: state.gameBounds,
        panGesture,
        pauseGame,
        reloadGame,
        onBoundariesLayout,
    };
}
