import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './components/Screens/home';
import settings from './components/Screens/settings';
import about from './components/Screens/about';
import search from './components/Screens/search';
import history from './components/Screens/history';
import mangaDetails from './components/Screens/mangadetails';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-fonts'
import {useMangaStore , useHistoryStore, useThemeStore} from '../../store/storage';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home1" component={home} />
      <Stack.Screen name="Manga Details" component={mangaDetails} />
    </Stack.Navigator>
  );
}
function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Search1" component={search} />
      <Stack.Screen name="Manga Details" component={mangaDetails} />
    </Stack.Navigator>
  );
}

function HistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="History1" component={history} />
      <Stack.Screen name="Manga Details" component={mangaDetails} />
    </Stack.Navigator>
  );
}

function  DrawerNavigator() {
  return (
    <Drawer.Navigator
    screenoptions={{statusBarcolor: '#fff',
      headerStyle: {backgroundColor: '#fff'},
      headerTintColor: '#000',
      headerTitleStyle: {fontWeight: 'bold'},}}
      >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Search" component={SearchNavigator}/>
      <Drawer.Screen name="History" component={HistoryNavigator} />
      <Drawer.Screen name="Settings" component={settings} />
      <Drawer.Screen name="About" component={about} />
    </Drawer.Navigator>
  );
}

const App = () => {
  cont [fontsLoaded] = useFonts({
    "VT323": require("./assets/fonts/VT323.ttf")
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
};

export default App;
