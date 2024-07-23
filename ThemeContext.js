import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from './screens/components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const colorScheme = theme.mode === 'light' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode === 'light' ? darkTheme : lightTheme));
    AsyncStorage.setItem('theme', theme.mode === 'light' ? 'dark' : 'light');
  };

  const getTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme }}>
      <StatusBar backgroundColor={'black'} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
