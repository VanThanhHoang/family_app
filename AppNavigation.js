import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useThemeContext } from "./ThemeContext";
import LoadingDialog from "./components/LoadingDialog";
import { AppContext } from "./AppContext";
import HomeTab from "./screens/BottomTab";
import DetailWeddingScreen from "./screens/details/DetailWedingScreen";
import DetailFamilyScreen from "./screens/details/DetailFamilyScreen";
import DetailBirthDayScreen from "./screens/details/DetailBirthDayScreen";
import DetailEventScreen from "./screens/details/DetailDeathDayScreen";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import DetailScreenChildren from "./screens/details/DetailChildren";
const AppNavigation = () => {
  const AppStack = createStackNavigator();
  const { isLoading } = useContext(AppContext);
  const { theme, toggleTheme } = useThemeContext();

  const CustomStatusBar = ({
    backgroundColor,
    barStyle = "dark-content",
    //add more props StatusBar
  }) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          style={barStyle}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <CustomStatusBar
        backgroundColor={theme.mode === "light" ? "#ffffff" : "#3a3a3a"}
        barStyle={theme.mode === "light" ? "dark" : "light"}
      />
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="HomeTab" component={HomeTab} />
        <AppStack.Screen name="DetailWedding" component={DetailWeddingScreen} />
        <AppStack.Screen name="DetailFamily" component={DetailFamilyScreen} />
        <AppStack.Screen
          name="DetailBirthDay"
          component={DetailBirthDayScreen}
        />
        <AppStack.Screen name="DetailDeathDay" component={DetailEventScreen} />
        <AppStack.Screen name="DetailChildren" component={DetailScreenChildren} />
      </AppStack.Navigator>
      <LoadingDialog open={isLoading} />
      <View
        style={{
          height: 20,
          backgroundColor: theme.mode === "light" ? "#ffffff" : "#808080",
        }}
      />
    </SafeAreaProvider>
  );
};

export default AppNavigation;
