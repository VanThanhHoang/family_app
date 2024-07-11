import { View, StyleSheet, Alert, Text } from "react-native";
import AppFormInput from "../../components/FormInput";
import { useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import React, { useContext, useEffect, useState } from "react";
import { useThemeContext } from "../../ThemeContext";
import ItemToogle from "./ItemToogle";
import { defaultInfo, validateForm } from "./data";
import RadioButtonGroup from "./RadioButtonGroup";
import { formatDate2 } from "../../helper/string_format";
import AppFormDateInput from "../../components/FormDateInput";
import { AppContext } from "../../AppContext";
import AxiosInstance from "../../network/AxiosInstance";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Dropdown from "./Dropdown";
const CRFriendScreen = () => {
  const { isAddFamilyMember } = useRoute()?.params ?? {
    isAddFamilyMember: false,
  };
  const { data } = useRoute()?.params ?? { data: {} };
  const navigation = useNavigation();
  const [formData, setFormData] = useState(data ?? defaultInfo);
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
  const scrollView = React.useRef(null);
  const scroll = () => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        y: 400,
        animated: true,
      });
    }
  };
  const toggleItems = [
    {
      title: "Giới tính",
      onPress: () => {
        setFormData({
          ...formData,
          gender: !formData.gender,
        });
      },
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
        setFormData({
          ...formData,
          marital_status: !formData.marital_status,
        });
        if (!formData.marital_status) {
          scroll();
        }
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
        if (formData.is_alive) {
          scroll();
        }
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
    {
      title: "Họ và tên",
      key: "full_name_vn",
      value: formData.full_name_vn,
    },
    {
      title: "Email",
      key: "email",
      value: formData.email,
    },
    {
      title: "Ngày tháng năm sinh (yyyy-mm-dd)",
      key: "birth_date",
      isDate: true,
      onChangeDate: (date) => {
        setFormData({
          ...formData,
          birth_date: formatDate2(date),
        });
      },
      value: formData.birth_date,
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      value: formData.phone_number,
    },
    {
      title: "Quốc tịch",
      key: "nationality",
      value: formData.nationality,
    },
    {
      title: "Tiểu sử",
      key: "history",
      value: formData.history,
    },
  ];
  const additionalFormInputs = [
    {
      title: "Trình độ học vấn",
      key: "education_level",
      value: formData.education_level,
    },
    {
      title: "Ghi chú tu hành",
      key: "monk_notes",
      value: formData.monk_notes,
    },
    {
      title: "Nghề nghiệp",
      key: "occupation",
      value: formData.occupation,
    },
    {
      title: "Liên kết mạng xã hội",
      key: "social_media_links",
      value: formData.social_media_links,
    },
  ];
  // Trong phần render của component:
  const handleSave = () => {
    const formErrors = validateForm(formData);
    if (formErrors.length > 0) {
      Alert.alert("Lỗi", formErrors.join("\n"), [{ text: "OK" }]);
    } else {
      handleSubmit();
    }
  };
  const { setIsLoading } = useContext(AppContext);
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let dataF = {
        ...formData,
      };
      delete data.place_of_death;
      if (dataF.is_alive) {
        delete dataF.address;
        delete dataF.death_date;
      }
      !dataF.religion && delete dataF.religion;
      !dataF.status && delete dataF.status;
      !dataF.relationship_category && delete dataF.relationship_category;
      if (data?.friend_id) {
        console.log("data", data);
        const res = await AxiosInstance().put(
          "friend/" + data.friend_id + "/",
          dataF
        );
        Alert.alert("Thông báo", "Cập nhật thông tin thành công");
      } else {
        const res = await AxiosInstance().post("friend/", dataF);
        if (!res) {
          Alert.alert(
            "Lỗi",
            "Đã xảy ra lỗi khi thêm bạn,email không được trùng",
            [{ text: "OK" }]
          );
        }
        if (res) {
          navigation.navigate("UploadImageScreen", { id: res.data.friend_id });
          setFormData(defaultInfo);
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm bạn,email không được trùng", [
        { text: "OK" },
      ]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <AppHeader
        right={{
          icon: "save",
          onPress: () => {
            console.log(formData);
            handleSave();
          },
        }}
        back
        title={!isAddFamilyMember ? "Thêm bạn" : "Thêm thành viên gia đình"}
      />
      <View style={styles.container}>
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
                  setFormData({ ...formData, [input.key]: text })
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
          {formData.marital_status && (
            <AppFormDateInput
              value={formData.wedding_day}
              onSaveText={(date) => {
                setFormData({
                  ...formData,
                  wedding_day: formatDate2(date),
                });
              }}
              title="Ngày cưới (yyy-mm-dd)"
            />
          )}
          {!formData.is_alive && (
            <AppFormDateInput
              value={formData.death_date}
              onSaveText={(date) => {
                setFormData({
                  ...formData,
                  death_date: formatDate2(date),
                });
              }}
              title="Ngày mất (yyy-mm-dd)"
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
              value={input.value}
              onTextChange={(text) => {
                setFormData({ ...formData, [input.key]: text });
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
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
    dropdownContainer: {
      marginBottom: 20,
    },
    dropdownLabel: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.colors.text,
    },
    dropdown: {
      height: 50,
      width: "100%",
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 5,
    },
  });

export default CRFriendScreen;
