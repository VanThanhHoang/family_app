import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../ThemeContext"; // Cập nhật đường dẫn
import Icon from "react-native-vector-icons/MaterialIcons"; // Sử dụng thư viện icon
import ConfirmDelete from "../../../components/ComfirmDelete";

const FriendItem = ({ item, onDelete }) => {
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity
      style={styles.memberContainer}
      onPress={() =>
        navigation.navigate("DetailScreen", { id: item.people_id })
      }
    >
      <Image
        source={
          item.profile_picture
            ? {
                uri:
                  `${item.profile_picture}?timestamp=${new Date().getTime()}` ??
                  APP_CONSTANTS.defaultAvatar,
              }
            : item.gender
            ? require("../../../assets/father.png")
            : require("../../../assets/mother.png")
        }
        style={styles.profilePicture}
      />
      {item.is_alive && (
        <Icon
          name="check-circle"
          size={20}
          color="green"
          style={styles.iconAlive}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.memberName}>
          {item.full_name_vn ?? "Chưa cung cấp tên"}
        </Text>
        <Text style={styles.birthDate}>{item.birth_date}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          navigation.navigate("AddFriendScreen", { data: item });
        }}
      >
        <Icon name="edit" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setVisible(true);
        }}
      >
        <Icon name="delete" size={20} color="gray" />
      </TouchableOpacity>
      <ConfirmDelete
        name={item.full_name_vn}
        visible={visible}
        onConfirm={() => {
          onDelete();
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
      />
    </TouchableOpacity>
  );
};

const useStyles = (theme) =>
  StyleSheet.create({
    memberContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginVertical: 6,
      marginHorizontal: 10, // Tạo khoảng cách với mép màn hình
      borderRadius: 5,
      backgroundColor: theme.colors.background,
      // Shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      // Elevation for Android
      elevation: 5,
    },
    profilePicture: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 10,
    },
    iconAlive: {
      position: "absolute",
      top: 80,
      left: 20,
    },
    textContainer: {
      flexDirection: "column",
      flex: 1, // To take up remaining space
    },
    memberName: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    birthDate: {
      fontSize: 15,
      color: theme.colors.placeHolder,
      marginTop: 5,
    },
    editButton: {
      alignSelf: "flex-start",
      marginHorizontal: 5,
    },
  });

export default FriendItem;
