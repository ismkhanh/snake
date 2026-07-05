import { JSX } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureDetector } from 'react-native-gesture-handler';
import { Colors } from '../styles/colors';
import { SEGMENT_SIZE } from '../constants/game';
import { useGameLoop } from '../hooks/useGameLoop';
import GameCanvas from './GameCanvas';
import Header from './Header';

export default function Game(): JSX.Element {
    const {
        snake,
        food,
        score,
        isPaused,
        panGesture,
        pauseGame,
        reloadGame,
        onBoundariesLayout,
    } = useGameLoop();

    return (
        <GestureDetector gesture={panGesture}>
            <SafeAreaView style={styles.container}>
                <Header
                isPaused={isPaused}
                pause={pauseGame}
                reload={reloadGame}>
                    <Text style={styles.score}>Score: {score}</Text>
                </Header>
                <View style={styles.boundaries} onLayout={onBoundariesLayout}>
                    <GameCanvas snake={snake} food={food} />
                </View>
            </SafeAreaView>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        marginHorizontal: 16,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.secondary,
        padding: SEGMENT_SIZE / 2,
    },
    score: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});
