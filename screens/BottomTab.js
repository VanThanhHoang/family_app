import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View, StyleSheet } from "react-native";
import FamilyScreen from "./FamilyScreen";
import BirthDayScreen from "./BirthDayScreen";
import DeathScreen from "./DeathScreen";
import WeddingScreen from "./WeddingScreen";
import AuthNavigation from "./AuthStack";
import React from "react";
import { AppContext } from "../AppContext";
import { useThemeContext } from '../ThemeContext';
import { useTheme } from '@rneui/themed';

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: "Gia đình",
    component: FamilyScreen,
    icon: require("../assets/family_tree.png"),
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
  const { birhdayData } = React.useContext(AppContext);
  const { theme } = useThemeContext();
  const { theme: rneTheme } = useTheme();

  const getBadge = () => {
    if (birhdayData.notification?.count > 5) {
      return birhdayData.notification?.count;
    }
    return undefined;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStatusBarHeight: 0,
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: rneTheme.mode === 'dark' ? '#808080' : rneTheme.colors.card },
        ],
        tabBarActiveTintColor: rneTheme.mode === 'dark' ? '#FFFFFF' : '#005500',
        tabBarInactiveTintColor: rneTheme.mode === 'dark' ? '#FFFFFF' : '#444444',
        tabBarLabel: ({ focused }) => {
          const screen = screens.find(screen => screen.name === route.name);
          return (
            <Text
              style={{
                color: focused ? (rneTheme.mode === 'dark' ? '#FFFFFF' : '#005500') : (rneTheme.mode === 'dark' ? '#FFFFFF' : '#444444'),
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {screen.name}
            </Text>
          );
        },
        tabBarIcon: ({ focused }) => {
          const screen = screens.find(screen => screen.name === route.name);
          return (
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? (rneTheme.mode === 'dark' ? '#000000' : '#005500') : (rneTheme.mode === 'dark' ? '#000000' : '#444444'), // Đổi màu khi hover
              }}
              source={screen.icon}
            />
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
            tabBarBadge: name === "Sinh nhật" ? getBadge() : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
  },
});

export default CustomBottomTabNavigator;
