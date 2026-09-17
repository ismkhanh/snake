import React from 'react';
import { Canvas, RoundedRect, Circle } from '@shopify/react-native-skia';
import { Coordinates, Direction } from '../types/types';
import { Colors } from '../styles/colors';
import { CELL_SIZE, SEGMENT_SIZE } from '../constants/game';

interface GameCanvasProps {
    snake: Coordinates[];
    food: Coordinates;
}

const SEGMENT_RADIUS = 7;
const HEAD_RADIUS = SEGMENT_SIZE;
const EYE_RADIUS = 3;

function getHeadDirection(snake: Coordinates[]): Direction {
    if (snake.length < 2) return Direction.Right;
    const head = snake[0];
    const neck = snake[1];
    if (head.x > neck.x) return Direction.Right;
    if (head.x < neck.x) return Direction.Left;
    if (head.y > neck.y) return Direction.Down;
    return Direction.Up;
}

const GameCanvas = React.memo(function GameCanvas({ snake, food }: GameCanvasProps) {
    const head = snake[0];
    const direction = getHeadDirection(snake);

    const headCx = head.x * CELL_SIZE + SEGMENT_SIZE / 2;
    const headCy = head.y * CELL_SIZE + SEGMENT_SIZE / 2;

    const eyeDistance = HEAD_RADIUS * 0.35;
    let eyeOffsetX = 0;
    let eyeOffsetY = 0;
    switch (direction) {
        case Direction.Right: eyeOffsetX = eyeDistance; break;
        case Direction.Left: eyeOffsetX = -eyeDistance; break;
        case Direction.Down: eyeOffsetY = eyeDistance; break;
        case Direction.Up: eyeOffsetY = -eyeDistance; break;
    }

    return (
        <Canvas style={{ flex: 1 }}>
            {/* Body segments (skip head) */}
            {snake.slice(1).map((segment, index) => (
                <RoundedRect
                    key={index + 1}
                    x={segment.x * CELL_SIZE}
                    y={segment.y * CELL_SIZE}
                    width={SEGMENT_SIZE}
                    height={SEGMENT_SIZE}
                    r={SEGMENT_RADIUS}
                    color={Colors.primary}
                />
            ))}
            {/* Head - large circle */}
            <Circle
                cx={headCx}
                cy={headCy}
                r={HEAD_RADIUS}
                color={Colors.primary}
            />
            {/* Eye */}
            <Circle
                cx={headCx + eyeOffsetX}
                cy={headCy + eyeOffsetY}
                r={EYE_RADIUS}
                color="#c8d5b9"
            />
            {/* Food - rounded square */}
            <RoundedRect
                x={food.x * CELL_SIZE}
                y={food.y * CELL_SIZE}
                width={SEGMENT_SIZE}
                height={SEGMENT_SIZE}
                r={4}
                color={Colors.tertiary}
            />
        </Canvas>
    );
});

export default GameCanvas;
