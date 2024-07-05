import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./SignUp";
import OTPScreen from "./OTPScreen";
import ChangePassword from "./ChangePass";
import ProfileScreen from "./ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailProfileScreen from "./DetailnfoScreen";
import UpdateProfileScreen from "./UpdateInfoScreen";
import UpdateProfileScreenBoolean from "./UpdateInfoScreenBoolean";
import UpdateProfileDate from "./UpdateInfoDate";
import ForgotPass from "./ForgotPassword";
const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Initial state is null
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("access");
      if (token) {
        setInitialRoute("Profile"); // If token exists, set initial route to Profile
      } else {
        setInitialRoute("Login"); // If no token, set initial route to Login
      }
      setIsLoading(false); // Set loading to false once the check is done
    };
    checkToken();
  }, []);

  if (isLoading) {
    return null; // Render nothing while checking token
  }
  return (
    <AuthStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Signup} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
      <AuthStack.Screen name="ChangePass" component={ChangePassword} />
      <AuthStack.Screen name="Profile" component={ProfileScreen} />
      <AuthStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <AuthStack.Screen name="DetailInfo" component={DetailProfileScreen} />
      <AuthStack.Screen
        name="UpdateInfoScreenBoolean"
        component={UpdateProfileScreenBoolean}
      />
      <AuthStack.Screen name="UpdateInfoDate" component={UpdateProfileDate} />
      <AuthStack.Screen name="ForgotPass" component={ForgotPass} />

    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
