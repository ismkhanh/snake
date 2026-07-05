import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = 'snake_high_score';

export async function getHighScore(): Promise<number> {
    try {
        const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        return value ? parseInt(value, 10) : 0;
    } catch {
        return 0;
    }
}

export async function setHighScore(score: number): Promise<void> {
    try {
        await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
    } catch {
        // silently fail
    }
}
