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

const ForgotPass = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [isUsePhone, setIsUsePhone] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [ip, setIp] = useState("");
  const { setIsLoading } = React.useContext(AppContext);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          "https://pro.ip-api.com/json/?fields=city,country,query,callingCode&key=uNnF9kh96NppgHw"
        );
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
      };
      console.log(data);
      await AxiosInstance().post(`forgot-password/`, data);
      Alert.alert(
        "Thành công",
        "Vui lòng kiểm tra mật khẩu mới đã được gửi đến bạn"
      );
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        Alert.alert(
          "Lỗi",
          "Số điện thoại hoặc email không thuộc bất kỳ tài khoản nào"
        );
      } else {
        Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AppHeader back title="Quên mật khẩu" />
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
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsUsePhone(!isUsePhone);
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#198755" }}
              >
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
              <View style={{ marginBottom: 12 }}></View>
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

          <Button
            onPress={() => {
              if (validate()) {
                register();
              }
            }}
            title="Gửi mật khẩu mới"
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

export default ForgotPass;
