//Users/macm1/Code/FamilyApp/family/App.js
import React, { useEffect } from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider as RNEThemeProvider } from "@rneui/themed";
import AppProvider from "./AppContext";
import AppNavigation from "./AppNavigation";
import { ThemeProvider, useThemeContext } from "./ThemeContext";
import { ConfigGoogle } from "./service/Config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const App = () => {
  const { theme } = useThemeContext();
  ConfigGoogle();
  GoogleSignin.signOut()
  return (
    <View style={{ flex: 1 }}>
      <AppProvider>
        <RNEThemeProvider theme={theme}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </RNEThemeProvider>
      </AppProvider>
    </View>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
