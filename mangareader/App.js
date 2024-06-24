import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './components/Screens/home';
import settings from './components/Screens/settings';
import about from './components/Screens/about';
import { useGlobalContext } from './context/global';

const Stack = createStackNavigator();

const App = () => {
  const global = useGlobalContext();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={home} />
                <Stack.Screen name="Settings" component={settings} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
