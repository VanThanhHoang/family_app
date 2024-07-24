
//Users/macm1/Code/FamilyApp/family/screens/components/Theme.js
import { createTheme } from '@rneui/themed';

export const lightTheme = createTheme({
  mode: 'light',
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    card: '#f8f9fa',
    itemBackground: '#fafafa',  // Light background for items
    text: '#000000',
    border: '#d3d3d3', // Light grey color
    notification: '#f50057',
    placeHolder:'#727272',
    nameColor: '#333', // Name color in light mode
    birthDateColor: '#888', // Birth date color in light mode
    relationshipColor: '#777', // Relationship color in light mode
    dividerColor: '#d3d3d3', // Divider color in light mode
  },
});

export const darkTheme = createTheme({
  mode: 'dark',
  colors: {
    primary: '#bb86fc',
    background: '#323232',  // Lighter dark background
    card: '#4a4a4a',        // Lighter dark card
    itemBackground: '#4a4a4a',  // Even lighter background for items
    text: '#ffffff',
    border: '#555555',      // Darker grey color for border
    notification: '#ff4081',
    placeHolder:'#727272',
    nameColor: '#fff', // Name color in dark mode
    birthDateColor: '#ccc', // Birth date color in dark mode
    relationshipColor: '#ccc', // Relationship color in dark mode
    dividerColor: '#666666', // Divider color in dark mode
  },
});
