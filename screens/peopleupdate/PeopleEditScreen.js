import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import AppHeader from "../../components/AppHeader";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import { useThemeContext } from "../../ThemeContext";
import defaultAvatar from "../../assets/father.png"; // Make sure to have a default avatar in your assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const PeopleEditScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [personData, setPersonData] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const { theme } = useThemeContext();

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

  if (!personData) {
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await AxiosInstance().put(`people/people-detail/${id}/`, {
        ...personData,
        profile_picture: newProfilePicture || personData.profile_picture,
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update person data.");
    } finally {
      setIsLoading(false);
    }
  };

  const getImageSource = () => {
    if (newProfilePicture) {
      return { uri: newProfilePicture };
    }
    if (personData.profile_picture) {
      return { uri: personData.profile_picture };
    }
    return defaultAvatar;
  };

  const handleUploadImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert("Error", "Failed to pick image.");
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        // Upload the image to your temporary storage service here
        try {
          const formData = new FormData();
          formData.append('file', {
            uri,
            name: 'profile.jpg',
            type: 'image/jpeg'
          });

          const uploadResponse = await AxiosInstance().post('/upload/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (uploadResponse.data && uploadResponse.data.file_url) {
            setNewProfilePicture(uploadResponse.data.file_url);
          } else {
            Alert.alert("Upload failed", "Failed to get uploaded image URL.");
          }
        } catch (err) {
          console.log(err);
          Alert.alert("Upload failed", "Image upload failed. Please try again.");
        }
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader back title="Edit Person" />
      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <Image source={getImageSource()} style={styles.avatar} />
          <TouchableOpacity style={styles.uploadIconContainer} onPress={handleUploadImage}>
            <Icon name="photo-camera" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.full_name_vn || ''}
          onChangeText={(text) => setPersonData({ ...personData, full_name: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Birth Date</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.birth_date || ''}
          onChangeText={(text) => setPersonData({ ...personData, birth_date: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Gender</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.gender ? 'Male' : 'Female'}
          onChangeText={(text) => setPersonData({ ...personData, gender: text === 'Male' })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Phone Number</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.phone_number || ''}
          onChangeText={(text) => setPersonData({ ...personData, phone_number: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Nationality</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.nationality || ''}
          onChangeText={(text) => setPersonData({ ...personData, nationality: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Marital Status</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.marital_status ? 'Married' : 'Single'}
          onChangeText={(text) => setPersonData({ ...personData, marital_status: text === 'Married' })}
        />  
        <Text style={[styles.label, { color: theme.colors.text }]}>History</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.history || ''}
          onChangeText={(text) => setPersonData({ ...personData, history: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Achievement</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.achievement || ''}
          onChangeText={(text) => setPersonData({ ...personData, achievement: text })}
        /> 
        <Text style={[styles.label, { color: theme.colors.text }]}>Occupation</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.occupation || ''}
          onChangeText={(text) => setPersonData({ ...personData, occupation: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Education Level</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.education_level || ''}
          onChangeText={(text) => setPersonData({ ...personData, education_level: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Hobbies and Interests</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.hobbies_interests || ''}
          onChangeText={(text) => setPersonData({ ...personData, hobbies_interests: text })}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>Social Media Links</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          value={personData.social_media_links || ''}
          onChangeText={(text) => setPersonData({ ...personData, social_media_links: text })}
        />                
        {/* Add other fields similarly */}
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
});

export default PeopleEditScreen;
