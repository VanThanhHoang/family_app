import { useRoute } from "@react-navigation/native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { CountryPicker } from "react-native-country-codes-picker";
import Button from "../components/Button";
import React, { useContext, useState } from "react";
import AxiosInstance from "../network/AxiosInstance";
import { AppContext } from "../AppContext";
import axios from "axios";
const OTPScreen = ({ navigation }) => {
  const { dataReg, type } = useRoute()?.params ?? {
    dataReg: "Test@gmail.com",
    type: "email",
  };
  const { setIsLoading } = React.useContext(AppContext);

  const [otp, setOtp] = useState("");
  const makeHiddenInfo = (string) => {
    if (string.length <= 5) {
      return string; // If the string is too short to hide, return it as is
    }
    const start = string.slice(0, 2); // First 2 characters
    const end = string.slice(-3); // Last 3 characters
    const hiddenPart = "*".repeat(string.length - 5); // Middle part replaced with *
    return `${start}${hiddenPart}${end}`;
  };
  const validate = () => {
    if (otp.length < 6) {
      Alert.alert("Mã OTP phải có 6 ký tự");
      return false;
    }
    if (isNaN(otp)) {
      Alert.alert("Mã OTP phải là số");
      return false;
    }
    return true;
  };
  const validateEmailOrPhone = async (emailOrPhone) => {
    try {
      setIsLoading(true);
      const link = `https://api.lehungba.com/activate/${type == 'email' ? 'email/' : 'phone/'}`
      console.log(link);
      const response = await axios.post(
        link,
        {
          [type ?? "email"]: emailOrPhone,
          activation_code: otp,
        }
      );

      // const response = await AxiosInstance().post(`activate/${type}`, {
      //   [type??'email']: emailOrPhone,
      //   activation_code: otp,
      // });
      Alert.alert("Xác thực thành công");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (error) {
      Alert.alert("Mã OTP không chính xác");
      console.log(error);
    } finally {
      setIsLoading(false);
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Xác thực Email/SĐT</Text>
      <Text style={styles.infoText}>
        {`Chúng tôi đã gửi mã xác thực về ${makeHiddenInfo(dataReg)}  `}
      </Text>
      <Text style={styles.otpPromptText}>Vui lòng điền mã OTP</Text>
      <OtpInput
        theme={styles.otpInputTheme}
        numberOfDigits={6}
        onTextChange={(text) => setOtp(text)}
      />
      <Button
        onPress={() => {
          validate() && validateEmailOrPhone(dataReg);
        }}
        title="Xác thực"
        filled
        style={styles.buttonStyle}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "white",
    gap: 20,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
    maxWidth: "80%",
    color: "gray",
    fontWeight: "500",
    fontSize: 16,
  },
  otpPromptText: {
    textAlign: "center",
    maxWidth: "80%",
    color: "#198754",
    fontWeight: "700",
    fontSize: 18,
  },
  otpInputTheme: {
    pinCodeContainerStyle: {
      borderWidth: 3,
      width: 50,
    },
  },
  buttonStyle: {
    marginTop: 18,
    marginBottom: 4,
    width: "100%",
  },
});
export default OTPScreen;
