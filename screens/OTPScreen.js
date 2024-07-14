import { useRoute } from "@react-navigation/native";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import React, { useContext, useState } from "react";
import axios from "axios";
import AppHeader from "../components/AppHeader";
import { AppContext } from "../AppContext";

const OTPScreen = ({ navigation }) => {
  const { dataReg, type } = useRoute()?.params ?? {
    dataReg: "Test@gmail.com",
    type: "email",
  };
  const { setIsLoading } = useContext(AppContext);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordModalVisible, setPasswordModalVisible] = useState(type === "phone");

  const makeHiddenInfo = (string) => {
    if (string.length <= 5) {
      return string;
    }
    const start = string.slice(0, 2);
    const end = string.slice(-3);
    const hiddenPart = "*".repeat(string.length - 5);
    return `${start}${hiddenPart}${end}`;
  };

  const validateOtp = () => {
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

  const handlePasswordSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Mật khẩu không khớp");
      return;
    }
    setPasswordModalVisible(false);
  };

  const handleOtpSubmit = async () => {
    if (!validateOtp()) return;

    try {
      setIsLoading(true);
      const link = `https://api.lehungba.com/activate/${type}/`;
    
      const data = type === "phone" 
        ? {
            phone_number: dataReg,
            activation_code: otp,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }
        : {
            email: dataReg,
            activation_code: otp,
          };

      const response = await axios.post(link, data);
      Alert.alert("Kích hoạt tài khoản thành công");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (error) {
      Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại");
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <AppHeader back title="Xác minh OTP" />
      </View>

      {type === "phone" && passwordModalVisible && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nhập mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlePasswordSubmit}
            >
              <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!passwordModalVisible && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nhập mã OTP</Text>
            <Text style={styles.infoText}>
              {`Chúng tôi đã gửi mã xác thực về ${makeHiddenInfo(dataReg)}`}
            </Text>
            <OtpInput
              theme={styles.otpInputTheme}
              numberOfDigits={6}
              onTextChange={(text) => setOtp(text)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleOtpSubmit}
            >
              <Text style={styles.submitButtonText}>Xác thực</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    paddingTop: 50,
    width: "100%",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#198754",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OTPScreen;
