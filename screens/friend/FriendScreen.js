import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AppFormInput from "../../components/FormInput";
import { useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext";
import ItemToogle from "./ItemToogle";

const FriendScreen = () => {
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
  const [formData, setFormData] = useState({
    email: "",
    full_name_vn: "",
    birth_date: "",
    phone_number: "",
    nationality: "Việt Nam",
    marital_status: false, // false là độc thân, true là đã kết hôn
    history: "",
    status: ["employed"], // mặc định là "Đi Làm"
    gender: true, // true là nam, false là nữ
    is_alive: true, // true là còn sống, false là đã mất
    education_level: "",
    occupation: "",
    monk_notes: "",
    unemployed_notes: "",
    death_date: "",
    wedding_day: "",
    profile_picture: null,
    hobbies_interests: "",
    social_media_links: "",
    cause_of_death: "",
    religion: ["catholic"], // mặc định là "Công giáo"
    achievement: "",
    relationship_category: ["ex_girlfriend"], // mặc định là "Bạn"
    address: {
      country: "",
      postal_code: "",
      city: "",
      state_or_province: "",
      district_or_county: "",
      address_line: "",
    },
    place_of_birth: {
      country: "",
      postal_code: "",
      city: "",
      state_or_province: "",
      district_or_county: "",
      address_line: "",
    },
    place_of_death: {
      country: "",
      postal_code: "",
      city: "",
      state_or_province: "",
      district_or_county: "",
      address_line: "",
    },
  });
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
  console.log(theme.mode);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <AppHeader back title="Thêm bạn bè" />
      <View style={styles.container}>
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <AppFormInput title="Họ và tên" />
          <AppFormInput title="Email" />
          <AppFormInput title="Ngày tháng năm sinh (yyy-mm-dd)" />
          <AppFormInput title="Số điện thoại" />
          <AppFormInput title="Quốc tịch" />
          <ItemToogle
            onPress={() => {
              setFormData({
                ...formData,
                gender: !formData.gender,
              });
            }}
            isChecked={formData.gender}
            color={"#ff1694"}
            colorChecked={"#1a70ce"}
            icon={"transgender"}
            title="Giới tính"
            textChecked="Nam"
            textUnchecked="Nữ"
          />
        </ScrollView>
      </View>
    </View>
  );
};
const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
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

export default FriendScreen;
