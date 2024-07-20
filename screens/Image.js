import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";

const DetailImage = ({ route, navigation }) => {
  const { link } = route.params;
  const [loading, setLoading] = useState(false);

  const images = [{ url: link }];

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to save the image"
        );
        setLoading(false);
        return;
      }

      const fileUri = FileSystem.documentDirectory + "temp_image.jpg";
      const downloadResult = await FileSystem.downloadAsync(link, fileUri);

      if (downloadResult.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Downloads", asset, false);
        Alert.alert("Success", "Image downloaded successfully");
      } else {
        Alert.alert("Error", "Failed to download image");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "An error occurred while downloading the image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDownload}
          style={styles.downloadButton}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.downloadingText}>Downloading...</Text>
          ) : (
            <Ionicons name="download-outline" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <ImageViewer
        enableImageZoom={true}
        imageUrls={images}
        enableSwipeDown={true}
        renderImage={(props) => {
            return <Image {...props}  style={{
                width:Dimensions.get('window').width,
                backgroundColor: "white",
                alignSelf: "center",
                height:400
            }} />
        }}
        saveToLocalByLongPress={true}
        onSwipeDown={() => navigation.goBack()}
        backgroundColor="black"
        renderIndicator={() => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  backButton: {
    padding: 8,
  },
  downloadButton: {
    padding: 8,
  },
  downloadingText: {
    color: "#fff",
  },
});

export default DetailImage;
