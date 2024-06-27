import React, { useContext } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { View } from "react-native";
import LoadingDialog from "./components/LoadingDialog";
const AppStack = createStackNavigator();
import { AppContext } from "./AppContext";
import HomeTab from './screens/BottomTab'
const AppNavigation = () => {
  const { isLoading } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="HomeTab" component={HomeTab} />
      </AppStack.Navigator>
      <LoadingDialog open={isLoading} />
    </View>
  );
};
export default AppNavigation;
