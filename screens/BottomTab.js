import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FamilyScreen from "./FamilyScreen";
import BirthDayScreen from "./BirthDayScreen";
import DeathScreen from "./DeathScreen";
import WeddingScreen from "./WeddingScreen";
import AuthNavigation from "./AuthStack";
import { AppContext } from "../AppContext";
import { useThemeContext } from "../ThemeContext";

const Tab = createBottomTabNavigator();
const screens = [
  {
    name: "Gia đình",
    component: FamilyScreen,
    icon: require("../assets/family.png"),
  },
  {
    name: "Sinh nhật",
    component: BirthDayScreen,
    icon: require("../assets/cake.png"),
  },
  {
    name: "Ngày cưới",
    component: WeddingScreen,
    icon: require("../assets/rings.png"),
  },
  {
    name: "Ngày mất",
    component: DeathScreen,
    icon: require("../assets/tomb.png"),
  },
  {
    name: "Tài khoản",
    component: AuthNavigation,
    icon: require("../assets/user.png"),
  },
];

function CustomBottomTabNavigator() {
  const { theme: rneTheme } = useThemeContext();
  const { birthdayData, deathData, weddingData } = React.useContext(AppContext);

  const getBadge = (screenName) => {
    switch (screenName) {
      case "Sinh nhật":
        return birthdayData.notification?.count > 0
          ? birthdayData.notification.count
          : undefined;
      case "Ngày mất":
        return deathData.notification?.count > 0
          ? deathData.notification.count
          : undefined;
      case "Ngày cưới":
        return weddingData.notification?.count > 0
          ? weddingData.notification.count
          : undefined;
      default:
        return undefined;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStatusBarHeight: 0,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor:
              rneTheme.mode === "dark" ? "#505050" : rneTheme.colors.card,
          },
        ],
        tabBarActiveTintColor: "#FFD700", // Use gold color for active tab
        tabBarInactiveTintColor:
          rneTheme.mode === "dark" ? "#FFFFFF" : "#444444",
        tabBarLabel: ({ focused }) => {
          const screen = screens.find((screen) => screen.name === route.name);
          return (
            <Text
              style={{
                color: focused
                  ? "#FFD700"
                  : rneTheme.mode === "dark"
                  ? "#FFFFFF"
                  : "#444444",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {screen.name}
            </Text>
          );
        },
        tabBarIcon: ({ focused }) => {
          const screen = screens.find((screen) => screen.name === route.name);
          const iconSize = route.name === "Sinh nhật" ? 29 : 25; // Increase size by 4px for "Sinh nhật"
          const tintColor = focused
            ? "#FFD700"
            : rneTheme.mode === "dark"
            ? "#FFFFFF"
            : "#444444";

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                <LinearGradient
                  colors={["#FFD700", "#FFA500"]}
                  style={styles.gradient}
                >
                  <Image
                    style={{
                      width: iconSize,
                      height: iconSize,
                      tintColor: "#FFFFFF",
                    }}
                    source={screen.icon}
                  />
                </LinearGradient>
              ) : (
                <Image
                  style={{
                    width: iconSize,
                    height: iconSize,
                    tintColor: tintColor,
                  }}
                  source={screen.icon}
                />
              )}
            </View>
          );
        },
      })}
    >
      {screens.map(({ name, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarShowLabel: true,
            tabBarBadge: getBadge(name),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 100,
    paddingVertical: 5, // Adjust the vertical padding for better spacing
  },
  gradient: {
    borderRadius: 50,
    padding: 5,
  },
});

export default CustomBottomTabNavigator;
