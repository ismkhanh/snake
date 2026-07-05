import { JSX, useRef, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CannonConfetti, CannonConfettiMethods } from 'react-native-fast-confetti';
import { Colors } from '../styles/colors';

type Props = {
    visible: boolean;
    score: number;
    highScore: number;
    isNewHighScore: boolean;
    onPlayAgain: () => void;
};

export default function GameOverModal({
    visible,
    score,
    highScore,
    isNewHighScore,
    onPlayAgain,
}: Props): JSX.Element {
    const confettiRef = useRef<CannonConfettiMethods>(null);

    useEffect(() => {
        if (visible && isNewHighScore) {
            confettiRef.current?.restart();
        }
    }, [visible, isNewHighScore]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                {isNewHighScore && (
                    <CannonConfetti
                        ref={confettiRef}
                        autoplay
                        fadeOutOnEnd
                        gravity={3}
                        colors={[
                            Colors.tertiary,
                            Colors.secondary,
                            '#ffffff',
                            '#f97316',
                            '#ef4444',
                        ]}
                        containerStyle={StyleSheet.absoluteFill}
                    >
                        <CannonConfetti.Origin
                            position="bottom-left"
                            count={100}
                            initialSpeed={3}
                        />
                        <CannonConfetti.Origin
                            position="bottom-right"
                            count={100}
                            initialSpeed={3}
                        />
                    </CannonConfetti>
                )}
                <View style={styles.dialog}>
                    <Text style={styles.title}>
                        {isNewHighScore ? 'New High Score!' : 'Game Over'}
                    </Text>
                    <Text style={styles.score}>Score: {score}</Text>
                    <Text style={styles.best}>Best: {highScore}</Text>
                    <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
                        <Text style={styles.buttonText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: Colors.background,
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        minWidth: 260,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 16,
    },
    score: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 4,
    },
    best: {
        fontSize: 18,
        color: Colors.primary,
        opacity: 0.7,
        marginBottom: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.tertiary,
    },
});
