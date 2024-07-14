import { useRoute } from "@react-navigation/native";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import UpdateHeader from "../components/UpdateHeader";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatDate2 } from "../helper/string_format";
const UpdateProfileScreen = ({ navigation }) => {
  const { type, label, value } = useRoute().params;
  const { userData, setUserData, setIsLoading } = React.useContext(AppContext);
  const [newInfo, setNewInfo] = React.useState(value);
  const [showModal, setShowModal] = React.useState(false);
 
  const showDatePicker = () => {
    setShowModal(true);
  };

  const hideDatePicker = () => {
    setShowModal(false);
  };

  const handleConfirm = (date) => {
    setNewInfo(formatDate2(date));
    hideDatePicker();
  };

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
      <TouchableOpacity onPress={showDatePicker} style={styles.textInput}>
        <Ionicons name={"calendar"} size={24} color="black" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          {newInfo}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        date={new Date(newInfo)}
        isVisible={showModal}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 12,
    borderColor: "#D4D5D4",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    gap: 20,
  },
});
export default UpdateProfileScreen;
