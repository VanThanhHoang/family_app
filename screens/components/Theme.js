import { createTheme } from '@rneui/themed';

export const lightTheme = createTheme({
  mode: 'light',
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    card: '#f8f9fa',
    itemBackground: '#ffffff',  // Light background for items
    text: '#000000',
    border: '#d3d3d3', // Light grey color
    notification: '#f50057',
    placeHolder:'#727272'
  },
});

export const darkTheme = createTheme({
  mode: 'dark',
  colors: {
    primary: '#bb86fc',
    background: '#3a3a3a',  // Lighter dark background
    card: '#4a4a4a',        // Lighter dark card
    itemBackground: '#6a6a6a',  // Even lighter background for items
    text: '#ffffff',
    border: '#aaaaaa',      // Lighter dark border
    notification: '#ff4081',
    placeHolder:'#727272'
  },
});
