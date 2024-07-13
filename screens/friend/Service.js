import { Alert } from "react-native";
import { validateForm } from "./data";

export const uploadImage = async (file, setIsLoading) => {
  setIsLoading(true);
  try {
    const fileData = {
      uri: file.uri,
      type: "image/jpeg",
      name: `${new Date().getTime()}.jpg`,
    };
    const formData = new FormData();
    formData.append("profile_picture", fileData);
    const response = await AxiosInstance("multipart/form-data").put(
      `/friend/${data.friend_id}/`,
      formData
    );
    if (response) {
      Alert.alert("Thành công", "Ảnh đã được cập nhật");
    } else {
      Alert.alert("Lỗi", "Tải lên ảnh thất bại");
    }
  } catch (error) {
    console.log("Error uploading image:", { ...error });
    Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải lên ảnh");
  } finally {
    setIsLoading(false);
  }
};
export const handleSave = async (formData, setIsLoading, data) => {
  const formErrors = validateForm(formData);
  if (formErrors.length > 0) {
    Alert.alert("Lỗi", formErrors.join("\n"), [{ text: "OK" }]);
  } else {
    setIsLoading(true);
    try {
      let dataF = { ...formData };
      if (dataF.is_alive) {
        delete dataF.address;
        delete dataF.death_date;
      }
      delete dataF.profile_picture;
      !dataF.religion && delete dataF.religion;
      !dataF.status && delete dataF.status;
      !dataF.relationship_category && delete dataF.relationship_category;

      if (data?.friend_id) {
        const res = await AxiosInstance().put(
          `friend/${data.friend_id}/`,
          dataF
        );
        Alert.alert("Thành công", "Thông tin đã được cập nhật");
      } else {
        const res = await AxiosInstance().post("friend/", dataF);
        if (res) {
          console.log(res.data.friend_id);
          navigation.navigate("UploadImageScreen", {
            id: res.data.friend_id,
          });
          Alert.alert("Thành công", "Thông tin đã được lưu");
        }
      }
    } catch (error) {
      console.log(formData);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu thông tin", [{ text: "OK" }]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
};
