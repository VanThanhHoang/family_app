import React from "react";
import { View } from "react-native";
import AppProvier, { AppContext } from "./AppContext";
import AppNavigation from "./AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppProvier>
        <NavigationContainer>
        <AppNavigation />
        </NavigationContainer>
      </AppProvier>
    </View>
  );
};
export default App;