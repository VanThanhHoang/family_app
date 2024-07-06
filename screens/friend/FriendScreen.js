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
  
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === "dark";
  const styles = useStyles(theme);
  console.log(theme.mode);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <AppHeader back title="Bạn bè" />
      <View
        style={{
          flex: 1,
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: APP_CONSTANTS.defaultAvatar,
            }}
            style={styles.profileImage}
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
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <AppFormInput title="Họ và tên" />
        </ScrollView>
      </View>
    </View>
  );
};
const useStyles = (theme) =>
  StyleSheet.create({
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

export default FriendScreen;
