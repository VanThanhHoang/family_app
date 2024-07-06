import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, StyleSheet } from "react-native";
import FamilyScreen from "./FamilyScreen";
import BirthDayScreen from "./BirthDayScreen";
import DeathScreen from "./DeathScreen";
import WeddingScreen from "./WeddingScreen";
import AuthNavigation from "./AuthStack";
import React from "react";
import { AppContext } from "../AppContext";
import { useThemeContext } from '../ThemeContext';
import { useTheme } from '@rneui/themed';
import FamilyTreeScreen from "./familyTree/FamilyTreeScreen";
import FriendScreen from "./friend/FriendScreen";

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: "Gia đình",
    component:FamilyScreen,
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
  const { theme: rneTheme } = useThemeContext();
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
        tabBarActiveTintColor: '#005500',
        tabBarInactiveTintColor: rneTheme.mode === 'dark' ? '#FFFFFF' : '#444444',
        tabBarLabel: ({ focused }) => {
          const screen = screens.find(screen => screen.name === route.name);
          return (
            <Text
              style={{
                color: focused ? '#005500' : (rneTheme.mode === 'dark' ? '#FFFFFF' : '#444444'),
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
          const iconSize = route.name === "Sinh nhật" ? 29 : 25; // Increase size by 4px for "Sinh nhật"
          return (
            <Image
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: focused ? '#005500' : (rneTheme.mode === 'dark' ? '#FFFFFF' : '#444444'),
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
    height: 100,
  },
});

export default CustomBottomTabNavigator;
