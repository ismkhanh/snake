import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { JSX } from 'react';

interface HeaderProps {
    isPaused: boolean;
    children: JSX.Element;
    pause: () => void;
    reload: () => void;
}

const Header = React.memo(function Header({
    isPaused,
    children,
    pause,
    reload
}: HeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={reload}>
                <Ionicons name="reload-circle" size={35} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pause}>
                <Ionicons name={isPaused ? "play-circle" : "pause-circle"} size={35} color={Colors.primary} />
            </TouchableOpacity>
            {children}
        </View>
    );
});

export default Header;

const styles = StyleSheet.create({
    header: {
        flex: 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: Colors.primary,
        backgroundColor: Colors.background,
    },
});
