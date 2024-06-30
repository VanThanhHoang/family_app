import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { setIsLoading } = React.useContext(AppContext);

  const validate = () => {
    if (currentPassword.length == 0) {
      alert("Mật khẩu hiện tại không được để trống");
      return false;
    }
    if (newPassword.length == 0 || confirmNewPassword.length == 0) {
      alert("Mật khẩu mới không được để trống");
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới không khớp");
      return false;
    }
    // check password > 6, has 1 letter,1 special character
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!regex.test(newPassword)) {
      Alert.alert(
        "Mật khẩu mới phải chứa ít nhất 6 ký tự, 1 chữ cái và 1 ký tự đặc biệt"
      );
      return false;
    }
    return true;
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().post("change-password/", {
        old_password: currentPassword,
        new_password: newPassword,
      });
      Alert.alert("Đổi mật khẩu thành công");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi","Đổi mật khẩu không thành công");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            {` Đổi mật khẩu`}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mật khẩu hiện tại
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              onChangeText={setCurrentPassword}
              value={currentPassword}
              placeholder="Nhập mật khẩu hiện tại của bạn"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mật khẩu mới
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="Nhập mật khẩu mới của bạn"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Xác nhận mật khẩu mới
          </Text>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              onChangeText={setConfirmNewPassword}
              value={confirmNewPassword}
              placeholder="Xác nhận mật khẩu mới của bạn"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: "100%",
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Đổi mật khẩu"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={() => {
            validate() && changePassword(currentPassword, newPassword);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
