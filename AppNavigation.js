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
import TeacherScreen from "./screens/teacher/TeacherScreen";
import FriendScreen from "./screens/friend/FriendScreen";
import PaternalScreen from "./screens/paternal/PaternalScreen";
import MaternalSreen from "./screens/maternal/MaternalScreen";
import CrmScreen from "./screens/Crm/CrmScreen";
import MyFamilyScreen from "./screens/myfamily/MyfamilyScreen";
import CRFriendScreen from "./screens/friend/CreateFriendScreen";
import UploadImageScreen from "./screens/friend/AddImageScreen";
import PeopleUpdateSrceen from "./screens/peopleupdate/PeopleUpdateSrceen";
import PeopleEditScreen from "./screens/peopleupdate/PeopleEditScreen";
import DetailWedding from "./screens/details/DetailWedding";
import FamilyTreeScreen from "./screens/familyTree/FamilyTreeScreen";
import FamilyTree from "./web-view/FMLTree";
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
        <AppStack.Screen name="TeacherScreen" component={TeacherScreen} />
        <AppStack.Screen name="FriendScreen" component={FriendScreen} />
        <AppStack.Screen name="PaternalScreen" component={PaternalScreen} />
        <AppStack.Screen name="MyFamilyScreen" component={MyFamilyScreen} />

        <AppStack.Screen name="MaternalScreen" component={MaternalSreen} />
        <AppStack.Screen name="CRMScreen" component={CrmScreen} />
        <AppStack.Screen name="DetailWeddingScreen" component={DetailWedding} />

        <AppStack.Screen name="DetailDeathDay" component={DetailEventScreen} />
        <AppStack.Screen
          name="DetailChildren"
          component={DetailScreenChildren}
        />
        <AppStack.Screen name="FamilyTreeWeb" component={FamilyTree}/>

        <AppStack.Screen name="FamilyTree" component={FamilyTreeScreen} />
        <AppStack.Screen name="AddFriendScreen" component={CRFriendScreen} />
        <AppStack.Screen
          name="UploadImageScreen"
          component={UploadImageScreen}
        />
        <AppStack.Screen
          name="PeopleUpdateSrceen"
          component={PeopleUpdateSrceen}
        />
        <AppStack.Screen name="PeopleEditScreen" component={PeopleEditScreen} />
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
