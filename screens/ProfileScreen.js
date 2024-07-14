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
import { useThemeContext } from "../ThemeContext";
import * as ImageManipulator from "expo-image-manipulator";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === "dark";

  const getUserInfo = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const email = await AsyncStorage.getItem("email");
      const id = await AsyncStorage.getItem("id");
      const people_id = await AsyncStorage.getItem("people_id");
      const profile_picture = await AsyncStorage.getItem("profile_picture");
      const full_name_vn = await AsyncStorage.getItem("full_name_vn");
      console.log("Profile picture:--", profile_picture);
      if (profile_picture) {
        setProfileImage(profile_picture);
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
      if (!image || !image.uri) {
        throw new Error("Invalid image URI");
      }

      const compressedImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 566, height: 586 } }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      const fileData = {
        uri: compressedImage.uri,
        type: "image/jpeg",
        name: `${new Date().getTime()}.jpg`,
      };

      const formData = new FormData();
      formData.append("profile_picture", fileData);
      const people_id = userInfo.people_id; // Ensure people_id is retrieved from userInfo
      const axiosInstance = AxiosInstance("multipart/form-data"); // Create Axios instance
      const response = await axiosInstance.put(
        `people/people-detail/${people_id}/`,
        formData
      );

      if (response.data.profile_picture) {
        await AsyncStorage.setItem(
          "profile_picture",
          response.data.profile_picture
        );
        setProfileImage(response.data.profile_picture); // Update the profileImage state with the new URL
        console.log("New profile picture URL:", response.data.profile_picture); // Log the new profile picture URL
        Alert.alert("Thành công", "Ảnh đã được cập nhật");
      } else {
        Alert.alert("Error", "Upload image failed");
      }
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Error", "Upload image failed");
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
      quality: 1,
    });

    console.log("ImagePicker result:", result); // Log the result for debugging

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      if (selectedImage && selectedImage.uri) {
        setProfileImage(selectedImage.uri);
        uploadImage(selectedImage);
      } else {
        console.log("No valid image URI found.");
      }
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
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
            onPress={() => navigation.navigate("PeopleUpdateSrceen")}
            style={styles.iconButton}
          >
            <Ionicons name="refresh" size={30} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
            style={styles.iconButton}
          >
            <Ionicons name="log-out" size={30} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.profileContainer, { borderBottomWidth: 0 }]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: profileImage ? profileImage : APP_CONSTANTS.defaultAvatar,
            }}
            style={styles.profileImage}
            onError={(error) =>
              console.log("Image load error:", error.nativeEvent.error)
            } // Log image load errors
          />
          <TouchableOpacity
            onPress={pickImage}
            style={[
              styles.cameraIcon,
              { backgroundColor: isDarkMode ? theme.colors.card : "white" },
            ]}
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
          onPress={() => navigation.navigate("MyFamilyScreen")}
        />
        <SettingItem
          icon={"home"}
          title="Gia Đình Nội"
          onPress={() => navigation.navigate("PaternalScreen")}
        />
        <SettingItem
          icon={"home"}
          title="Gia Ngoại"
          onPress={() => navigation.navigate("MaternalScreen")}
        />
        <SettingItem
          icon={"school"}
          title="My Teacher"
          onPress={() => navigation.navigate("TeacherScreen")}
        />
        <SettingItem
          icon={"person-add"}
          title="My Friend"
          onPress={() => navigation.navigate("FriendScreen")}
        />
        <SettingItem
          icon={"business"}
          title="Business CRM"
          onPress={() => navigation.navigate("CRMScreen")}
        />
        <TouchableOpacity style={styles.crmButton} onPress={() => {}}>
          <LinearGradient
            colors={["#32CD32", "#3CB371"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.crmButtonGradient}
          >
            <Text style={styles.crmButtonText}>BUSINESS CRM</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingItem = ({ title, onPress, icon }) => {
  const { theme } = useThemeContext();
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
});

export default ProfileScreen;
