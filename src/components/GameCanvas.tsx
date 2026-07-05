import React from 'react';
import { Canvas, RoundedRect, Circle } from '@shopify/react-native-skia';
import { Coordinates } from '../types/types';
import { Colors } from '../styles/colors';
import { CELL_SIZE, SEGMENT_SIZE } from '../constants/game';

interface GameCanvasProps {
    snake: Coordinates[];
    food: Coordinates;
}

const FOOD_RADIUS = 10;
const SEGMENT_RADIUS = 7;

const GameCanvas = React.memo(({ snake, food }: GameCanvasProps) => {
    return (
        <Canvas style={{ flex: 1 }}>
            {snake.map((segment, index) => (
                <RoundedRect
                    key={index}
                    x={segment.x * CELL_SIZE}
                    y={segment.y * CELL_SIZE}
                    width={SEGMENT_SIZE}
                    height={SEGMENT_SIZE}
                    r={SEGMENT_RADIUS}
                    color={Colors.primary}
                />
            ))}
            <Circle
                cx={food.x * CELL_SIZE + FOOD_RADIUS}
                cy={food.y * CELL_SIZE + FOOD_RADIUS}
                r={FOOD_RADIUS}
                color={Colors.tertiary}
            />
        </Canvas>
    );
});

export default GameCanvas;
