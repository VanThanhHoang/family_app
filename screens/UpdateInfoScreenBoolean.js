//UpdateInfoScreenBoolean
import { useRoute } from "@react-navigation/native";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import UpdateHeader from "../components/UpdateHeader";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { RadioButton } from "react-native-paper";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const UpdateProfileScreen = ({ navigation }) => {
  const { type, label, value } = useRoute().params;
  const { userData, setUserData, setIsLoading } = React.useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(value);
  const updateInfo = async (info, value) => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().patch("user-detail/update/", {
        [info]: selectedValue,
      });

      setUserData({
        ...userData,
        [info]: selectedValue,
      });
      Alert.alert("Thành công", "Cập nhật thông tin của bạn thành công");
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        "Lỗi",
        "Có lỗi xảy ra khi cập nhật thông tin của bạn, vui lòng thử lại sau"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <UpdateHeader
        onSave={() => {
          updateInfo(type, value);
        }}
        back
        title={label}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option1"
              status={selectedValue ? "checked" : "unchecked"}
              onPress={() => setSelectedValue(true)}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>
              {type == "gender" ? "Nam" : "Đã kết hôn"}
            </Text>
            <Ionicons size={24}  name={type == "gender" ? "female" : "heart"}/>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option3"
              status={!selectedValue ? "checked" : "unchecked"}
              onPress={() => setSelectedValue(false)}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>
              {type == "gender" ? "Nữ" : "Chưa kết hôn"}
            </Text>
            <Ionicons
              name={type == "gender" ? "male" : "heart-half"}
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default UpdateProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 120,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
