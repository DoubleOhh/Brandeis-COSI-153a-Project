import { registerRootComponent } from 'expo';
import React from 'react';
import { GlobalProvider } from './context/global';
import App from './App';




const WrappedApp = () => (
        <GlobalProvider>
            <App />
        </GlobalProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(WrappedApp);
