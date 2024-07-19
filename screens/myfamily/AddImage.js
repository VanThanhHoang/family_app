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

const UploadImageScreen2 = () => {
  const route = useRoute();
  const { setIsLoading } = useContext(AppContext);
  const navigation = useNavigation();
  const { id, numberOfImages = 1, title } = route.params;
  const [selectedImages, setSelectedImages] = useState(
    Array(numberOfImages).fill(null)
  );
  const { theme } = useThemeContext();

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    if (!result.canceled) {
      const newSelectedImages = [...selectedImages];
      newSelectedImages[index] = result.assets[0].uri;
      setSelectedImages(newSelectedImages);
    }
  };

  const uploadImages = async () => {
    if (selectedImages.some((img) => !img)) {
      Alert.alert("Lỗi", "Vui lòng chọn đủ số ảnh trước khi tải lên");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      selectedImages.forEach((image, index) => {
        const fileData = {
          uri: image,
          type: "image/jpeg",
          name: `image${index + 1}_${new Date().getTime()}.jpg`,
        };
        formData.append(`image${index + 1}`, fileData);
      });

      const response = await AxiosInstance("multipart/form-data").patch(
        `people/people-detail/${id}/`,
        formData
      );
      if (response) {
        Alert.alert("Thành công", "Ảnh đã được cập nhật");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", "Tải lên ảnh thất bại");
      }
    } catch (error) {
      console.log("Error uploading images", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải lên ảnh");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <View style={styles.imagesContainer}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => pickImage(index)}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
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
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={uploadImages}>
          <LinearGradient
            colors={["#A8E063", "#56AB2F"]}
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
            colors={["#D3D3D3", "#A9A9A9"]}
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginHorizontal: 10,
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
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
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

export default UploadImageScreen2;
