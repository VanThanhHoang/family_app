const { View, Text, Image, TouchableOpacity } = require("react-native");
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../components/AppHeader";
import AxiosInstance from "../network/AxiosInstance";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({}); // [1
  const getUserInfo = async () => {
    try {
      const data = await AxiosInstance().get("user/");
      if (data?.email) {
        setUserInfo(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <AppHeader title="Tài khoản" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 25,
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "gray",
            backgroundColor: "gray",
            resizeMode: "cover  ",
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          {userInfo.email}
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("DetailInfo");
          }}
          title="Cập nhật thông tin"
          filled
          style={{ width: "100%" }}
        />
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "gray",
            marginVertical: 15,
          }}
        />
        <SettingItem
          icon={"lock-closed"}
          title="Đổi mật khẩu"
          onPress={() => navigation.navigate("ChangePass")}
        />
        <SettingItem
          icon={"log-out"}
          title="Đăng xuất"
          onPress={() => {
            AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        />
      </View>
    </View>
  );
};
const SettingItem = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        width: "100%",
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color="black" />
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
};
export default ProfileScreen;
