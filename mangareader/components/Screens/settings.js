// SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/global';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useGlobalContext();

    return (
        <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
            <Text style={[styles.header, { color: currentTheme.text}]}>Settings</Text>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default SettingsScreen;
