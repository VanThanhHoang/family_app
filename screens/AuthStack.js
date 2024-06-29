import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./SignUp";
import OTPScreen from "./OTPScreen";
import ChangePassword from "./ChangePass";

const AuthStack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Signup} />
      <AuthStack.Screen name="OTP" component={OTPScreen} />
      <AuthStack.Screen name="ChangePass" component={ChangePassword} />

    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
