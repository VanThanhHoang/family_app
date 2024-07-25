
//Users/macm1/Code/FamilyApp/family/screens/components/Theme.js
import { createTheme } from '@rneui/themed';

export const lightTheme = createTheme({
  mode: 'light',
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    card: '#f8f9fa',
    itemBackground: '#fafafa',
    text: '#000000',
    border: '#d3d3d3',
    notification: '#f50057',
    placeHolder: '#727272',
    nameColor: '#333',
    birthDateColor: '#888',
    relationshipColor: '#777',
    dividerColor: '#d3d3d3',
    gradientStart: '#FFD700',  // Add gradient start color
    gradientEnd: '#FFA500',    // Add gradient end color
  },
});

export const darkTheme = createTheme({
  mode: 'dark',
  colors: {
    primary: '#bb86fc',
    background: '#323232',
    card: '#4a4a4a',
    itemBackground: '#4a4a4a',
    text: '#ffffff',
    border: '#555555',
    notification: '#ff4081',
    placeHolder: '#727272',
    nameColor: '#fff',
    birthDateColor: '#ccc',
    relationshipColor: '#ccc',
    dividerColor: '#666666',
    gradientStart: '#FFD700',  // Add gradient start color
    gradientEnd: '#FFA500',    // Add gradient end color
  },
});

