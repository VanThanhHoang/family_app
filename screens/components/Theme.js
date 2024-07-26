// Users/macm1/Code/FamilyApp/family/screens/components/Theme.js
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
    gradientLevel0Start: '#FFD700',  // Add gradient start color for level 0
    gradientLevel0End: '#FFA500',    // Add gradient end color for level 0
    gradientLevel1Start: '#00FF00',  // Add gradient start color for level 1
    gradientLevel1End: '#32CD32',    // Add gradient end color for level 1
    gradientLevel2Start: '#0000FF',  // Add gradient start color for level 2
    gradientLevel2End: '#1E90FF',    // Add gradient end color for level 2
    gradientLevel3Start: '#FF00FF',  // Add gradient start color for level 3
    gradientLevel3End: '#FF69B4',    // Add gradient end color for level 3
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
    gradientLevel0Start: '#FFD700',  // Add gradient start color for level 0
    gradientLevel0End: '#FFA500',    // Add gradient end color for level 0
    gradientLevel1Start: '#00FF00',  // Add gradient start color for level 1
    gradientLevel1End: '#32CD32',    // Add gradient end color for level 1
    gradientLevel2Start: '#0000FF',  // Add gradient start color for level 2
    gradientLevel2End: '#1E90FF',    // Add gradient end color for level 2
    gradientLevel3Start: '#FF00FF',  // Add gradient start color for level 3
    gradientLevel3End: '#FF69B4',    // Add gradient end color for level 3
  },
});
