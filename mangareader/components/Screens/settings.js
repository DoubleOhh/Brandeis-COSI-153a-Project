// SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useThemeStore } from '../../store/storage';

const SettingsScreen = () => {

    const { theme, toggleTheme } = useThemeStore();

    return (
        <View style={[styles(theme).container]}>
            <Text style={[styles(theme).title]}>Settings</Text>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.colors.background,
    },
    image: {
        width: 150,
        height: 225,
        borderRadius: 7,
        border: '3px solid black',
        marginBottom: 10,
        marginRight: 15,
        resizeMode: 'cover',
    },
    link: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: theme.colors.primary,
        color: theme.colors.text,
        fontFamily: theme.fonts.main,
    }, 
    button: {
        margin: 12,
    }
});

export default SettingsScreen;
