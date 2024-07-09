import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { CountryPicker } from "react-native-country-codes-picker";

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isUsePhone, setIsUsePhone] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("lesa77040@gmail.com");
  const [password, setPassword] = useState("Dequa@123!");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [ip, setIp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
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
      if (!phone) {
        Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
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
    return true;
  };

  const checkEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const regInfo = isUsePhone ? `${countryCode}${phone}` : email;
      const data = {
        [isUsePhone ? "phone_number" : "email"]: regInfo,
        password,
      };
      const endpoint = isUsePhone ? "login/phone/" : "login/email/";
      console.log(data);
      console.log(endpoint);
      const response = await AxiosInstance().post(endpoint, data);
      console.log(response);
      // Lưu các giá trị vào AsyncStorage
      await AsyncStorage.setItem("access", response.access);
      await AsyncStorage.setItem("refresh", response.refresh);
      await AsyncStorage.setItem("email", response.email);
      await AsyncStorage.setItem("id", response.id.toString());
      await AsyncStorage.setItem("people_id", response.people_id.toString());
      if (response.profile_picture) {
        await AsyncStorage.setItem("profile_picture", response.profile_picture);
      }else{
        await AsyncStorage.setItem("profile_picture", "");
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
    } catch (error) {
      Alert.alert(
        "Đăng nhập không thành công\n Tài khoản hoặc mật khẩu không đúng"
      );
      console.log(error);
      console.log({...error});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <TouchableWithoutFeedback
        style={{
          flex: 1,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", marginHorizontal: 22 }}
        >
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
              marginVertical: 56,
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
                  value={email}
                  onChangeText={setEmail}
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
                  onChangeText={setPhone}
                  value={phone}
                  placeholder="Vui lòng nhập số điện thoại của bạn"
                  placeholderTextColor={COLORS.black}
                  keyboardType="numeric"
                  style={{ width: "80%" }}
                />
              </View>
            </View>
          )}

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
                onChangeText={setPassword}
                value={password}
                placeholder="Nhập mật khẩu của bạn"
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
              color={isChecked ? "#198754" : undefined}
            />

            <Text>Ghi nhớ đăng nhập</Text>
          </View>

          <Button
            title="Đăng nhập"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={() => {
              validate() && login();
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
            <Text style={{ fontSize: 14 }}>Hoặc đăng nhập với</Text>
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
              Bạn không có tài khoản ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#198754",
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Đăng ký ngay
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate("ForgotPass")}>
            <Text
              style={{
                fontSize: 16,
                color: "#198754",
                fontWeight: "bold",
                marginLeft: 6,
                textAlign: "center",
              }}
            >
              Quên mật khẩu ?
            </Text>
          </Pressable>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              source={require("../assets/images/profile/le-the-bich.jpg")}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Nguyễn Thế Bích
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
              }}
            >
              Copyright@2024
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
