import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppFormInput from "../../components/FormInput";
import AppHeader from "../../components/AppHeader";
import ItemToogle from "./ItemToogle";
import AppFormDateInput from "../../components/FormDateInput";
import Dropdown from "./Dropdown";
import { useThemeContext } from "../../ThemeContext";
import { AppContext } from "../../AppContext";
import AxiosInstance from "../../network/AxiosInstance";
import { defaultInfo, validateForm } from "./data";
import { formatDate2 } from "../../helper/string_format";

const CRFriendScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { isAddFamilyMember, data } = route.params ?? {
    isAddFamilyMember: false,
    data: null,
  };
  const [formData, setFormData] = useState(data ?? defaultInfo);
  const [selectedImage, setSelectedImage] = useState(
    data?.profile_picture ?? null
  );
  const { theme } = useThemeContext();
  const { setIsLoading } = useContext(AppContext);
  const styles = useStyles(theme);
  const scrollViewRef = React.useRef(null);

  const toggleItems = [
    {
      title: "Giới tính",
      onPress: () => setFormData({ ...formData, gender: !formData.gender }),
      isChecked: formData.gender,
      color: "#ff1694",
      colorChecked: "#1a70ce",
      icon: "transgender",
      textChecked: "Nam",
      textUnchecked: "Nữ",
    },
    {
      title: "Tình trạng hôn nhân",
      onPress: () => {
        setFormData({ ...formData, marital_status: !formData.marital_status });
        if (!formData.marital_status)
          scrollViewRef.current?.scrollTo({ y: 400, animated: true });
      },
      isChecked: formData.marital_status,
      color: theme.colors.text,
      colorChecked: "#ff1694",
      icon: "heart",
      textChecked: "Đã kết hôn",
      textUnchecked: "Độc thân",
    },
    {
      title: "Tình trạng sống",
      onPress: () => {
        setFormData({
          ...formData,
          is_alive: !formData.is_alive,
          death_date: formData.is_alive ? "" : formData.death_date,
        });
        if (formData.is_alive)
          scrollViewRef.current?.scrollTo({ y: 400, animated: true });
      },
      isChecked: formData.is_alive,
      color: theme.colors.text,
      colorChecked: "#ff1694",
      icon: "pulse",
      textChecked: "Còn sống",
      textUnchecked: "Đã mất",
    },
  ];

  const RELIGION_CHOICES = [
    { label: "Công giáo", value: "catholic" },
    { label: "Phật giáo", value: "buddhist" },
    { label: "Tin Lành", value: "protestant" },
    { label: "Đạo khác", value: "other" },
  ];

  const STATUS_CHOICES = [
    { label: "Đang đi học", value: "student" },
    { label: "Đã đi làm", value: "employed" },
    { label: "Thất nghiệp", value: "unemployed" },
    { label: "Đi tu", value: "monk" },
  ];

  const RELATIONSHIP_CATEGORY_CHOICES = [
    { label: "Ân Nhân", value: "benefactor" },
    { label: "Teacher", value: "teacher" },
    { label: "Bạn gái cũ", value: "ex_girlfriend" },
    { label: "Bạn học", value: "classmate" },
  ];

  const formInputs = [
    { title: "Họ và tên", key: "full_name_vn" },
    { title: "Email", key: "email" },
    {
      title: "Ngày tháng năm sinh (yyyy-mm-dd)",
      key: "birth_date",
      isDate: true,
      onChangeDate: (date) =>
        setFormData({ ...formData, birth_date: formatDate2(date) }),
    },
    { title: "Số điện thoại", key: "phone_number" },
    { title: "Quốc tịch", key: "nationality" },
    { title: "Tiểu sử", key: "history" },
  ];

  const additionalFormInputs = [
    { title: "Trình độ học vấn", key: "education_level" },
    { title: "Ghi chú tu hành", key: "monk_notes" },
    { title: "Nghề nghiệp", key: "occupation" },
    { title: "Liên kết mạng xã hội", key: "social_media_links" },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (file) => {
    if (!selectedImage) {
      Alert.alert("Lỗi", "Vui lòng chọn ảnh trước khi tải lên");
      return;
    }
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

  const handleSave = async () => {
    const formErrors = validateForm(formData);
    console.log(formData)
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
          Alert.alert("Thành công", "Thông tin đã được cập nhật")
        } else {
          const res = await AxiosInstance().post("friend/", dataF);
          if (res) {
            navigation.goBack();
          }
        }
      } catch (error) {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu thông tin", [{ text: "OK" }]);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader
        right={{
          icon: "save",
          onPress: handleSave,
        }}
        back
        title={!isAddFamilyMember ? "Thêm bạn" : "Thêm thành viên gia đình"}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.placeholderImage,
                  { backgroundColor: theme.colors.card },
                ]}
              >
                <Ionicons name="camera" size={50} color={theme.colors.text} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {formInputs.map((input, index) =>
          input.isDate ? (
            <AppFormDateInput
              key={index}
              onSaveText={input.onChangeDate}
              value={formData[input.key]}
              title={input.title}
            />
          ) : (
            <AppFormInput
              key={index}
              title={input.title}
              value={formData[input.key]}
              onTextChange={(text) =>
                setFormData({ ...formData, [input.key]: text })
              }
            />
          )
        )}

        {toggleItems.map((item, index) => (
          <ItemToogle
            key={index}
            title={item.title}
            onPress={item.onPress}
            isChecked={item.isChecked}
            color={item.color}
            colorChecked={item.colorChecked}
            icon={item.icon}
            textChecked={item.textChecked}
            textUnchecked={item.textUnchecked}
          />
        ))}

        {formData.marital_status && (
          <AppFormDateInput
            value={formData.wedding_day}
            onSaveText={(date) =>
              setFormData({ ...formData, wedding_day: formatDate2(date) })
            }
            title="Ngày cưới (yyyy-mm-dd)"
          />
        )}

        {!formData.is_alive && (
          <AppFormDateInput
            value={formData.death_date}
            onSaveText={(date) =>
              setFormData({ ...formData, death_date: formatDate2(date) })
            }
            title="Ngày mất (yyyy-mm-dd)"
          />
        )}

        <Dropdown
          label="Tình trạng công việc"
          options={STATUS_CHOICES}
          selectedValue={formData.status}
          onSelect={(value) => setFormData({ ...formData, status: value })}
          theme={theme}
        />

        <Dropdown
          label="Tôn giáo"
          options={RELIGION_CHOICES}
          selectedValue={formData.religion}
          onSelect={(value) => setFormData({ ...formData, religion: value })}
          theme={theme}
        />

        <Dropdown
          label="Quan hệ"
          options={RELATIONSHIP_CATEGORY_CHOICES}
          selectedValue={formData.relationship_category}
          onSelect={(value) =>
            setFormData({ ...formData, relationship_category: value })
          }
          theme={theme}
        />

        {additionalFormInputs.map((input, index) => (
          <AppFormInput
            key={index}
            title={input.title}
            value={formData[input.key]}
            onTextChange={(text) =>
              setFormData({ ...formData, [input.key]: text })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      padding: 15,
      paddingBottom: 300,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    placeholderImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default CRFriendScreen;
