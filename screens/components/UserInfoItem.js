import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const UserInfoItem = ({ icon, label, value, type }) => {
  const navigation = useNavigation();
  const getGenderText = () => {
    if (value == null) {
      return "Chưa chia sẻ";
    }
    if (value) {
      return "Nam";
    }
    return "Nữ";
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Ionicons name={icon} size={24} color="black" />
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          {type == "gender" ? (
            <Text style={styles.value}>{getGenderText()}</Text>
          ) : (
            <Text style={styles.value}>{value ?? "Chưa chia sẻ"}</Text>
          )}
          {type == "marital_status" ? (
            <Text style={styles.value}>
              {value ? "Đã kết hôn" : "Chưa kết hôn"}
            </Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const data = {
            type,
            label,
            value,
          };
          if (type === "gender" || type === "marital_status") {
            navigation.navigate("UpdateInfoScreenBoolean", data);
          }
          else if (type === "birth_date") {
            navigation.navigate("UpdateInfoDate", data);
          }
           else {
            navigation.navigate("UpdateProfile", data);
          }

        }}
      >
        <Ionicons name={"create"} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#808080",
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserInfoItem;
