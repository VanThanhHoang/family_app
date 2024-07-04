import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { CountryPicker } from "react-native-country-codes-picker";
import AppHeader from "../components/AppHeader";
import axios from "axios";
import COLORS from "../constants/colors";

const Signup = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isUsePhone, setIsUsePhone] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [ip, setIp] = useState("");
  const { setIsLoading } = React.useContext(AppContext);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('https://pro.ip-api.com/json/?fields=city,country,query,callingCode&key=uNnF9kh96NppgHw');
        setCountryCode(`+${response.data.callingCode}`);
        setCity(response.data.city);
        setCountry(response.data.country);
        setIp(response.data.query);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, []);

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
      if (!password) {
        Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
        return false;
      }
      if (password !== confirmPassword) {
        Alert.alert("Lỗi", "Mật khẩu và xác nhận mật khẩu không khớp");
        return false;
      }
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
      const data = {
        [isUsePhone ? "phone_number" : "email"]: regInfo,
        password,
      };
      await AxiosInstance().post(
        `register/${isUsePhone ? "phone/" : "email/"}`,
        data
      );
      Alert.alert("Thành công", "Vui lòng kiểm tra OTP đã được gửi đến bạn");
      navigation.navigate("OTP", {
        dataReg: regInfo,
        type: isUsePhone ? "phone_number" : "email",
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Alert.alert("Lỗi", "Số điện thoại hoặc email đã được sử dụng");
      } else {
        Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AppHeader back title="Đăng ký" />
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <CountryPicker
            style={{ modal: { height: 500 } }}
            enableModalAvoiding
            show={showModal}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setShowModal(false);
            }}
          />
          <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setIsUsePhone(!isUsePhone);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#198755" }}>
                {isUsePhone ? "Sử dụng email" : "Sử dụng số điện thoại"}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, textAlign: "right" }}>
              {`IP: ${ip}\nCity: ${city}\nCountry: ${country}`}
            </Text>
          </View>
          {!isUsePhone && (
            <View>
              <View style={{ marginBottom: 12 }}>
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
                    style={{ width: "100%" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
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
                    placeholder="Nhập mật khẩu của bạn"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry
                    style={{ width: "100%" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 12 }}>
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
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Xác nhận mật khẩu của bạn"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry
                    style={{ width: "100%" }}
                  />
                </View>
              </View>
            </View>
          )}

          {isUsePhone && (
            <View style={{ marginBottom: 12 }}>
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
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={{
                    width: "15%",
                    height: "100%",
                    borderRightColor: COLORS.black,
                    borderRightWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {countryCode}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  placeholder="Vui lòng nhập số điện thoại của bạn"
                  placeholderTextColor={COLORS.black}
                  keyboardType="numeric"
                  style={{ width: "80%" }}
                />
              </View>
            </View>
          )}

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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Signup;
