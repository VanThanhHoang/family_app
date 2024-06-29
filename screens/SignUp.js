import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isUsePhone, setIsUsePhone] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = React.useContext(AppContext);
  const validate = () => {
    if (isUsePhone) {
      if (countryCode.length < 2 || countryCode.length > 4) {
        Alert.alert("Lỗi", "Mã quốc gia không hợp lệ");
        return false;
      }
      if (!countryCode || !phone) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ số điện thoại");
        return false;
      }
    } else {
      if (!email) {
        Alert.alert("Lỗi", "Vui lòng nhập email");
        return false;
      }
      if (!checkEmail(email)) {
        Alert.alert("Lỗi", "Email không hợp lệ");
        return false;
      }
    }
    if (!password) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (!isChecked) {
      Alert.alert("Lỗi", "Vui lòng đồng ý với điều khoản và điều kiện");
      return false;
    }
    return true;
  };
  const checkEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const register = async () => {
    try {
      setIsLoading(true);
      const regInfo = isUsePhone ? `${countryCode}${phone}` : email;
      console.log(regInfo);
      const data = {
        [isUsePhone ? "phone_number" : "email"]: regInfo,
        password: password,
      };
      await AxiosInstance().post("register/", data);
      Alert.alert("Thành công", "Vui lòng kiểm tra OTP đã được gửi đến bạn");
      navigation.navigate("OTP",{
        dataReg:regInfo,
        type:isUsePhone ? "phone_number" : "email",
      });
    } catch (err) {
      //check code 400
      if (err.response.status == 400) {
        Alert.alert("Lỗi", "Số điện thoại hoặc email đã được sử dụng");
      } else {
        Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log(err);
      }
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
            Create Account
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsUsePhone(!isUsePhone);
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#198755",
              }}
            >
              {!isUsePhone ? "Sử dụng số điện thoại" : "Sử dụng email"}
            </Text>
          </TouchableOpacity>
        </View>
        {!isUsePhone && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email
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
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Nhập email của bạn"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>
        )}

        {isUsePhone && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                onChangeText={(text) => setCountryCode(text)}
                value={countryCode}
                maxLength={3}
                placeholder="+84"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
              />

              <TextInput
                onChangeText={(text) => setPhone(text)}
                value={phone}
                placeholder="Vui lòng nhập số điện thoại của bạn"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
              />
            </View>
          </View>
        )}

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mật khẩu
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
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Vui lòng nhập mật khẩu của bạn"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
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

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#198755" : undefined}
          />
          <Text>Tôi chấp nhận điều khoản và ràng buộc với ứng dụng</Text>
        </View>

        <Button
          onPress={() => {
            if (validate()) {
              register();
            }
          }}
          title="Đăng ký"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Hoặc đăng ký với</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
           Bạn đã có tài khoản?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: "#198755",
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
