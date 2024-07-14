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
import {
  additionalFormInputs,
  defaultInfo,
  formInputs,
  RELATIONSHIP_CATEGORY_CHOICES,
  RELIGION_CHOICES,
  STATUS_CHOICES,
  validateForm,
} from "./data";
import { formatDate2 } from "../../helper/string_format";
import { handleSave, uploadImage } from "./Service";

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


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0], setIsLoading);
    }
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader
        right={{
          icon: "save",
          onPress: () => {
            handleSave(formData, setIsLoading, data,navigation);
          },
        }}
        back
        title={!isAddFamilyMember ? "Thêm bạn" : "Thêm thành viên gia đình"}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {data != null && (
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
        )}

        {formInputs.map((input, index) => (
          !input.isDate ?   <AppFormInput
            key={index}
            title={input.title}
            value={formData[input.key]}
            onTextChange={(text) =>
              setFormData({ ...formData, [input.key]: text })
            }
          />:  <AppFormDateInput
          value={formData.birth_date}
          onSaveText={(date) =>
            setFormData({ ...formData,birth_date: formatDate2(date) })
          }
          title="Ngày sinh (yyyy-mm-dd)"
        />
        ))}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
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
        </ScrollView>

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

        <ScrollView
        showsHorizontalScrollIndicator={false}
         horizontal>
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
        </ScrollView>

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
