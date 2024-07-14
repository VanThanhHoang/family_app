import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import UpdateHeader from "../components/UpdateHeader";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import React from "react";
const UpdateProfileScreen = ({ navigation }) => {
  const { type, label, value } = useRoute().params;
  const { userData, setUserData, setIsLoading } = React.useContext(AppContext);
  const [newInfo, setNewInfo] = React.useState(value);
  const updateInfo = async (info, value) => {
    try {
      setIsLoading(true);
      console.log({ [info]: newInfo });
      const data = await AxiosInstance().patch("user-detail/update/", {
        [info]: newInfo,
      });

      setUserData({
        ...userData,
        [info]: newInfo,
      });
      Alert.alert("Thành công", "Cập nhật thông tin của bạn thành công");
      navigation.goBack();
    } catch (err) {
      console.log(err);
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
      <TextInput
        value={newInfo}
        onChangeText={(text) => {
          setNewInfo(text);
        }}
        multiline
        placeholder={label}
        style={styles.textInput}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: "auto",
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    minHeight: "auto",
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    borderColor: "#D4D5D4",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
});
export default UpdateProfileScreen;
