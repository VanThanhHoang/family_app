import React from 'react';
import { View } from 'react-native';
import AppProvider from './AppContext';
import AppNavigation from './AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './screens/components/ThemeContext'; // Corrected import path

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </ThemeProvider>
      </AppProvider>
    </View>
  );
};

export default App;
