
///Users/macm1/Documents/mobile_app/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from './screens/components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode === 'light' ? darkTheme : lightTheme));
  };
  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      console.log(theme);
      if (theme === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    getTheme()
  },[])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StatusBar backgroundColor={'black'} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
