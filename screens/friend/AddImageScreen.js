import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AxiosInstance from "../../network/AxiosInstance";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../ThemeContext";
import { AppContext } from "../../AppContext";

const UploadImageScreen = () => {
  const route = useRoute();
  const {setIsLoading} = useContext(AppContext)
  const navigation = useNavigation();
  const { id } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const { theme } = useThemeContext();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("Lỗi", "Vui lòng chọn ảnh trước khi tải lên");
      return;
    }
    setIsLoading(true);
    try {
      const fileData = {
        uri: selectedImage,
        type: "image/jpeg",
        name: `${new Date().getTime()}.jpg`,
      };
      const formData = new FormData();
      formData.append("profile_picture", fileData)
      console.log("formData",id);
      const response = await AxiosInstance("multipart/form-data").put(
        `friend/${id}/`,
        formData
      );
      console.log("res",response);
        if (response.profile_picture) {
          Alert.alert('Thành công', 'Ảnh đã được cập nhật');
          navigation.goBack();
        } else {
          Alert.alert('Lỗi', 'Tải lên ảnh thất bại');
        }
    } catch (error) {
      console.log("123",{ ...error });
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải lên ảnh");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Chọn ảnh đại diện
      </Text>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <LinearGradient
            colors={["#4CAF50", "#45B649"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Tải lên</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <LinearGradient
            colors={["#FF5722", "#F4511E"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Bỏ qua</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: "40%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UploadImageScreen;
