import React, { useContext } from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import { useThemeContext } from './ThemeContext';
import LoadingDialog from "./components/LoadingDialog";
import { AppContext } from "./AppContext";
import HomeTab from "./screens/BottomTab";
import DetailWeddingScreen from "./screens/details/DetailWedingScreen";
import DetailFamilyScreen from "./screens/details/DetailFamilyScreen";
import DetailBirthDayScreen from "./screens/details/DetailBirthDayScreen";
import DetailEventScreen from "./screens/details/DetailDeathDayScreen";

const AppNavigation = () => {
  const AppStack = createStackNavigator();
  const { isLoading } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="HomeTab" component={HomeTab} />
        <AppStack.Screen name="DetailWedding" component={DetailWeddingScreen} />
        <AppStack.Screen name="DetailFamily" component={DetailFamilyScreen} />
        <AppStack.Screen name="DetailBirthDay" component={DetailBirthDayScreen} />
        <AppStack.Screen name="DetailDeathDay" component={DetailEventScreen} />
      </AppStack.Navigator>
      <LoadingDialog open={isLoading} />
    </SafeAreaView>
  );
};

export default AppNavigation;
