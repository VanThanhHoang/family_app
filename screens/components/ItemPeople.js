import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../ThemeContext";

export default FriendItem = ({ item }) => {
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
  const navigation = useNavigation();
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
            ? { uri: item.profile_picture }
            : item.gender
            ? require("../../assets/father.png")
            : require("../../assets/mother.png")
        }
        style={styles.profilePicture}
      />
      <View style={styles.textContainer}>
        <Text style={styles.memberName}>
          {item.full_name_vn ?? "Chưa cung cấp tên"}
        </Text>
        <Text style={styles.birthDate}>{item.birth_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 20,
    },
    memberContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      backgroundColor: theme.colors.background,
    },
    profilePicture: {
      width: 80,
      height: 80,
      borderRadius: 50,
      marginRight: 10,
    },
    textContainer: {
      flexDirection: "column",
    },
    memberName: {
      fontSize: 23,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    relation: {
      fontSize: 14,
      color: "#777",
    },
    birthDate: {
      fontSize: 15,
      color: theme.colors.placeHolder,
      bottom : -15,
    },
  });
