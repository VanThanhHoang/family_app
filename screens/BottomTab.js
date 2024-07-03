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
 const getBadge=()=>{
    if(birhdayData.notification?.count>5){
      return birhdayData.notification?.count
    }
    return undefined
 }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 0,
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      {screens.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarShowLabel: true,
            tabBarBadge:name=="Sinh nhật"?getBadge():undefined,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#ffb74d" : "gray",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#ffb74d" : "gray",
                }}
                source={icon}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default HomeTab;
