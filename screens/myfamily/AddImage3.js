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

const UploadImageScreen3 = () => {
  const route = useRoute();
  const { setIsLoading } = useContext(AppContext);
  const navigation = useNavigation();
  const { title1, id1, title2, id2 } = route.params;
  const [selectedImages, setSelectedImages] = useState([null, null]);
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
      const uploadPromises = selectedImages.map((image, index) => {
        const formData = new FormData();
        const fileData = {
          uri: image,
          type: "image/jpeg",
          name: `image_${new Date().getTime()}.jpg`,
        };
        formData.append("profile_picture", fileData);

        return AxiosInstance("multipart/form-data").patch(
          `people/people-detail/${index === 0 ? id1 : id2}/`,
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      
      if (responses.every((response) => response)) {
        Alert.alert("Thành công", "Các ảnh đã được cập nhật");
        console.log(responses);
        // navigation.goBack();
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
      <View style={styles.imagesContainer}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Text style={[styles.imageTitle, { color: theme.colors.text }]}>
              {index === 0 ? title1 : title2}
            </Text>
            <TouchableOpacity
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
          </View>
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
  imagesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
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

export default UploadImageScreen3;