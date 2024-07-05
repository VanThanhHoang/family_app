// Users/macm1/Documents/mobile_app/screens/ProfileScreen.js

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { APP_CONSTANTS } from "../helper/constant";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@rneui/themed";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);
  const { theme } = useTheme();
  const isDarkMode = theme.mode === "dark";

  const getUserInfo = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const email = await AsyncStorage.getItem("email");
      const id = await AsyncStorage.getItem("id");
      const people_id = await AsyncStorage.getItem("people_id");
      let profile_picture = await AsyncStorage.getItem("profile_picture");
      const full_name_vn = await AsyncStorage.getItem("full_name_vn");
      setProfileImage(profile_picture);

      if (profile_picture) {
        profile_picture = `https://api.lehungba.com${profile_picture}`;
      }

      setUserInfo({
        access,
        email,
        id,
        people_id,
        profile_picture,
        full_name_vn,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async (image) => {
    try {
      const fileData = {
        uri: image.uri,
        type: image.type,
        name: `${new Date().getTime()}.jpg`,
      };
      const formData = new FormData();
      formData.append("profile_picture", fileData);
      const data = await AxiosInstance("multipart/form-data").patch(
        "profile/upload/",
        formData
      );
      if (data.profile_picture) {
        await AsyncStorage.setItem("profile_picture", data.profile_picture);
        Alert.alert("Thành công", "Ảnh đã được cập nhật");
      } else {
        Alert.alert("Error", "Upload image failed");
      }
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setProfileImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header]}>
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Tài khoản
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePass")}
            style={styles.iconButton}
          >
            <Ionicons name="key" size={30} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          >
            <Ionicons name="log-out" size={30} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.profileContainer, { borderBottomWidth: 0 }]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: profileImage ?? APP_CONSTANTS.defaultAvatar,
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.cameraIcon, { backgroundColor: isDarkMode ? theme.colors.card : "white" }]}
          >
            <Ionicons name="camera" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.emailText, { color: theme.colors.text }]}>
          {userInfo.email}
        </Text>
      </View>
      <View style={styles.settingsContainer}>
        <SettingItem
          icon={"person"}
          title="My Profile"
          onPress={() => navigation.navigate("DetailInfo")}
        />
        <SettingItem
          icon={"people"}
          title="My Family"
          onPress={() => navigation.navigate("Family")}
        />
        <SettingItem
          icon={"home"}
          title="Gia Đình Nội"
          onPress={() => navigation.navigate("GiaDinhNoi")}
        />
        <SettingItem
          icon={"home"}
          title="Gia Ngoại"
          onPress={() => navigation.navigate("GiaNgoai")}
        />
        <SettingItem
          icon={"school"}
          title="My Teacher"
          onPress={() => navigation.navigate("Teacher")}
        />
        <SettingItem
          icon={"person-add"}
          title="My Friend"
          onPress={() => navigation.navigate("Friend")}
        />
<<<<<<< HEAD
        <SettingItem
          icon={"business"}
          title="Business CRM"
          onPress={() => navigation.navigate("Crm")}
        />
=======
        <TouchableOpacity style={styles.crmButton} onPress={() => {}}>
          <LinearGradient
            colors={["#32CD32", "#3CB371"]} // Adjust these colors as needed
            start={[0, 0]}
            end={[1, 1]}
            style={styles.crmButtonGradient}
          >
            <Text style={styles.crmButtonText}>BUSINESS CRM</Text>
          </LinearGradient>
        </TouchableOpacity>
>>>>>>> d43a70b902c025266b3630daff81320390587612
      </View>
    </View>
  );
};

const SettingItem = ({ title, onPress, icon }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Ionicons name={icon} size={20} color={theme.colors.text} />
      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.border}
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginRight: 15,
  },
  profileContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    position: "relative",
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "gray",
    resizeMode: "cover",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 1,
    right: -1,
    borderRadius: 15,
    padding: 2,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  settingsContainer: {
    flex: 1,
    alignItems: "center",
    padding: 25,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  chevronIcon: {
    marginLeft: "auto",
  },
<<<<<<< HEAD
=======
  crmButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  crmButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    alignItems: "center",
  },
  crmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
>>>>>>> d43a70b902c025266b3630daff81320390587612
});

export default ProfileScreen;
