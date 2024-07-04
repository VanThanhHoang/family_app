import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import FamilyScreen from "./FamilyScreen";
import BirthDayScreen from "./BirthDayScreen";
import DeathScreen from "./DeathScreen";
import WeddingScreen from "./WeddingScreen";
import AuthNavigation from "./AuthStack";
import React from "react";
import { AppContext } from "../AppContext";

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

function HomeTab() {
  const { birhdayData } = React.useContext(AppContext);

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
        tabBarStyle: {
          height: 80,
        },
        tabBarActiveTintColor: "#005500", // Set the active color here
        tabBarInactiveTintColor: "#444444", // Set the inactive color here
        tabBarLabel: ({ focused }) => {
          const screen = screens.find(screen => screen.name === route.name);
          return (
            <Text
              style={{
                color: focused ? "#005500" : "#444444", // Use the active and inactive colors here
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
                tintColor: focused ? "#005500" : "#444444", // Use the active and inactive colors here
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

export default HomeTab;
