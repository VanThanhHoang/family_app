import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppFormInput from "../../components/FormInput";
import AppFormDateInput from "../../components/FormDateInput";
import AppHeader from "../../components/AppHeader";
import { useThemeContext } from "../../ThemeContext";
import ItemToogle from "../friend/ItemToogle";
import RadioButtonGroup from "../friend/RadioButtonGroup";
import { formatDate2 } from "../../helper/string_format";
import { AppContext } from "../../AppContext";
import AxiosInstance from "../../network/AxiosInstance";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";

const PeopleEditScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [personData, setPersonData] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === "dark";
  const styles = useStyles(theme);
  const scrollView = React.useRef(null);
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
      console.log(result)
    }
  };
  const uploadImage = async (file) => {
    setIsLoading(true);
    try {
      const fileData = {
        uri: file.uri,
        type: file.type,
        name: `${new Date().getTime()}.jpg`,
      };
      const formData = new FormData();
      formData.append("profile_picture", fileData);
      const response = await AxiosInstance("multipart/form-data").put(
        `people/upload/${id}/`,
        formData
      );
      console.log("res", response);
      if (response.profile_picture) {
        Alert.alert("Thành công", "Ảnh đã được cập nhật");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", "Tải lên ảnh thất bại");
      }
    } catch (error) {
      console.log("123", { ...error });
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải lên ảnh");
    } finally {
      setIsLoading(false);
    }
  };
  const scroll = () => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        y: 400,
        animated: true,
      });
    }
  };

  const getPersonData = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance().get(`people/people-detail/${id}/`);
      setPersonData(response.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load person data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPersonData();
  }, [id]);

  const toggleItems = [
    {
      title: "Giới tính",
      onPress: () => {
        setPersonData({
          ...personData,
          gender: !personData.gender,
        });
      },
      isChecked: personData?.gender,
      color: "#ff1694",
      colorChecked: "#1a70ce",
      icon: "transgender",
      textChecked: "Nam",
      textUnchecked: "Nữ",
    },
    {
      title: "Tình trạng hôn nhân",
      onPress: () => {
        setPersonData({
          ...personData,
          marital_status: !personData.marital_status,
        });
        if (!personData.marital_status) {
          scroll();
        }
      },
      isChecked: personData?.marital_status,
      color: theme.colors.text,
      colorChecked: "#ff1694",
      icon: "heart",
      textChecked: "Đã kết hôn",
      textUnchecked: "Độc thân",
    },
    {
      title: "Tình trạng sống",
      onPress: () => {
        setPersonData({
          ...personData,
          is_alive: !personData.is_alive,
          death_date: personData.is_alive ? "" : personData.death_date,
        });
        if (personData.is_alive) {
          scroll();
        }
      },
      isChecked: personData?.is_alive,
      color: theme.colors.text,
      colorChecked: "#ff1694",
      icon: "pulse",
      textChecked: "Còn sống",
      textUnchecked: "Đã mất",
    },
  ];

  const radioButtonGroups = [
    {
      title: "Tình trạng công việc",
      options: [
        { label: "Đang học", value: "Đang học" },
        { label: "Đi làm", value: "Đi làm" },
        { label: "Nội trợ", value: "Nội trợ" },
        { label: "Đi tu", value: "Đi tu" },
      ],
      selectedValue: personData?.status,
      onSelect: (value) => setPersonData({ ...personData, status: [value] }),
      formKey: "status",
    },
    {
      title: "Tôn giáo",
      options: [
        { label: "Công giáo", value: "Công giáo" },
        { label: "Đạo Phật", value: "Đạo Phật" },
        { label: "Tin Lành", value: "Tin Lành" },
        { label: "Đạo khác", value: "Đạo khác" },
      ],
      selectedValue: personData?.religion,
      onSelect: (value) => setPersonData({ ...personData, religion: [value] }),
      formKey: "religion",
    },
    {
      title: "Quan hệ",
      options: [
        { label: "Ân nhân", value: "Ân nhân" },
        { label: "Giáo viên", value: "Giáo viên" },
        { label: "Bạn bè", value: "Bạn bè" },
        { label: "Bạn học", value: "Bạn học" },
      ],
      selectedValue: personData?.relationship_category,
      onSelect: (value) =>
        setPersonData({ ...personData, relationship_category: [value] }),
      formKey: "relationship_category",
    },
  ];

  const formInputs = [
    {
      title: "Họ và tên",
      key: "full_name_vn",
      value: personData?.full_name_vn,
    },
    {
      title: "Email",
      key: "email",
      value: personData?.email,
    },
    {
      title: "Ngày tháng năm sinh (yyyy-mm-dd)",
      key: "birth_date",
      isDate: true,
      onChangeDate: (date) => {
        setPersonData({
          ...personData,
          birth_date: formatDate2(date),
        });
      },
      value: personData?.birth_date,
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      value: personData?.phone_number,
    },
    {
      title: "Quốc tịch",
      key: "nationality",
      value: personData?.nationality,
    },
    {
      title: "Tiểu sử",
      key: "history",
      value: personData?.history,
    },
  ];

  const additionalFormInputs = [
    {
      title: "Trình độ học vấn",
      key: "education_level",
      value: personData?.education_level,
    },
    {
      title: "Ghi chú tu hành",
      key: "monk_notes",
      value: personData?.monk_notes,
    },
    {
      title: "Nghề nghiệp",
      key: "occupation",
      value: personData?.occupation,
    },
    {
      title: "Liên kết mạng xã hội",
      key: "social_media_links",
      value: personData?.social_media_links,
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataUpdate = {
        full_name_vn: personData.full_name_vn,
        birth_date: personData.birth_date,
        achievement: personData.achievement,
        cause_of_death: personData.cause_of_death,
        current_age: personData.current_age,
        death_date: personData.death_date,
        death_info: personData.death_info,
        education_level: personData.education_level,
        email: personData.email,
        full_name: personData.full_name,
        gender: personData.gender,
        health_status: personData.health_status,
        history: personData.history,
        hobbies_interests: personData.hobbies_interests,
        is_alive: personData.is_alive,
        marital_status: personData.marital_status,
        nationality: personData.nationality,
        occupation: personData.occupation,
        people_id: personData.people_id,
        phone_number: personData.phone_number,
        profile_picture: personData.profile_picture,
        social_media_links: personData.social_media_links,
      };
      const res = await AxiosInstance().patch(
        `people/people-detail/${id}/`,
        dataUpdate
      );
      if (res) {
        Alert.alert("Thành công", "Đã cập nhật thông tin người dùng");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật thông tin");
    } finally {
      setIsLoading(false);
    }
  };

  if (!personData) {
    return null;
  }

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
        title="Chỉnh sửa thông tin"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 300,
        }}
        ref={scrollView}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
        }}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: profileImage ?? APP_CONSTANTS.defaultAvatar,
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
        {formInputs.map((input, index) => {
          return input.isDate ? (
            <AppFormDateInput
              key={index}
              onSaveText={input.onChangeDate}
              value={input.value}
              title={input.title}
            />
          ) : (
            <AppFormInput
              key={index}
              title={input.title}
              value={input.value}
              onTextChange={(text) =>
                setPersonData({ ...personData, [input.key]: text })
              }
            />
          );
        })}
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
        {personData.marital_status && (
          <AppFormDateInput
            value={personData.wedding_day}
            onSaveText={(date) => {
              setPersonData({
                ...personData,
                wedding_day: formatDate2(date),
              });
            }}
            title="Ngày cưới (yyy-mm-dd)"
          />
        )}
        {!personData.is_alive && (
          <AppFormDateInput
            value={personData.death_date}
            onSaveText={(date) => {
              setPersonData({
                ...personData,
                death_date: formatDate2(date),
              });
            }}
            title="Ngày mất (yyy-mm-dd)"
          />
        )}
        {radioButtonGroups.map((group, index) => (
          <RadioButtonGroup
            key={index}
            title={group.title}
            options={group.options}
            selectedValue={group.selectedValue}
            onSelect={(value) => {
              setPersonData({ ...personData, [group.formKey]: [value] });
            }}
            color={theme.colors.text}
            colorSelected="#1a70ce"
          />
        ))}
        {additionalFormInputs.map((input, index) => (
          <AppFormInput
            key={index}
            title={input.title}
            value={input.value}
            onTextChange={(text) => {
              setPersonData({ ...personData, [input.key]: text });
            }}
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
      padding: 15,
    },
    imageWrapper: {
      position: "relative",
      width: 120,
      height: 120,
      alignSelf: "center",
      marginVertical: 10,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
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
  });

export default PeopleEditScreen;
