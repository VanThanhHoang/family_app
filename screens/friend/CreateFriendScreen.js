import { View, StyleSheet, Alert } from "react-native";
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
const CRFriendScreen = () => {
  const { isAddFamilyMember } = useRoute()?.params ?? {
    isAddFamilyMember: false,
  };
  const navigation = useNavigation();
  const [formData, setFormData] = useState(defaultInfo);
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
  const radioButtonGroups = [
    {
      title: "Tình trạng công việc",
      options: [
        { label: "Đang học", value: "Đang học" },
        { label: "Đi làm", value: "Đi làm" },
        { label: "Nội trợ", value: "Nội trợ" },
        { label: "Đi tu", value: "Đi tu" },
      ],
      selectedValue: formData.status[0],
      onSelect: (value) => setFormData({ ...formData, status: [value] }),
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
      selectedValue: formData.religion[0],
      onSelect: (value) => setFormData({ ...formData, religion: [value] }),
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
      selectedValue: formData.relationship_category[0],
      onSelect: (value) =>
        setFormData({ ...formData, relationship_category: [value] }),
      formKey: "relationship_category",
    },
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
      let data = {
        ...formData,
      }
      delete data.status;
      delete data.religion;
      delete data.relationship_category;
      delete data.death_date;
      const res = await AxiosInstance().post("friend/", data);
      if(!res){
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm bạn,email không được trùng", [{ text: "OK" }]);
      }
      console.log("res",res);
      if(res){
        navigation.navigate('UploadImageScreen', { id: res.friend_id })
        setFormData(defaultInfo);
      }
    } catch (error) {
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
          {radioButtonGroups.map((group, index) => (
            <RadioButtonGroup
              key={index}
              title={group.title}
              options={group.options}
              selectedValue={formData[group.formKey][0]}
              onSelect={(value) => {
                setFormData({ ...formData, [group.formKey]: [value] });
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
  });

export default CRFriendScreen;
