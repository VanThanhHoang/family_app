import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import styles from '../components/friend/FriendItem'; // Adjust the import path if necessary

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <TouchableOpacity style={[toggleStyles.switch, isOn ? toggleStyles.on : toggleStyles.off]} onPress={handleToggle}>
      <Text style={[toggleStyles.text, { color: isOn ? 'white' : 'white' }]}>{isOn ? 'Còn Sống' : 'Đã Mất'}</Text>
    </TouchableOpacity>
  );
};

const CreateFriendScreen = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    full_name_vn: '',
    birth_date: '',
    gender: false, // false for female, true for male
    is_alive: true, // true for alive, false for deceased
    phone_number: '',
    nationality: '',
    marital_status: '',
    history: '',
    status: [],
    education_level: '',
    occupation: '',
    monk_notes: '',
    unemployed_notes: '',
    health_status: '',
    death_date: '',
    wedding_day: '',
    family_info: '',
    profile_picture: null,
    hobbies_interests: '',
    social_media_links: '',
    cause_of_death: '',
    religion: [],
    achievement: '',
    relationship_category: [],
  });

  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleGender = () => {
    setFormData({
      ...formData,
      gender: !formData.gender,
    });
  };

  const handleToggleIsAlive = () => {
    setFormData({
      ...formData,
      is_alive: !formData.is_alive,
    });
  };

  const handleStatusChange = (status) => {
    const newStatus = formData.status.includes(status)
      ? formData.status.filter(item => item !== status)
      : [...formData.status, status];
    setFormData({ ...formData, status: newStatus });
  };

  const handleReligionChange = (religion) => {
    const newReligion = formData.religion.includes(religion)
      ? formData.religion.filter(item => item !== religion)
      : [...formData.religion, religion];
    setFormData({ ...formData, religion: newReligion });
  };

  const handleRelationshipCategoryChange = (category) => {
    const newCategory = formData.relationship_category.includes(category)
      ? formData.relationship_category.filter(item => item !== category)
      : [...formData.relationship_category, category];
    setFormData({ ...formData, relationship_category: newCategory });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    for (const key in formData) {
      if (key === 'profile_picture' && formData[key]) {
        const uriParts = formData[key].split('.');
        const fileType = uriParts[uriParts.length - 1];
        form.append('profile_picture', {
          uri: formData[key],
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      } else {
        form.append(key, JSON.stringify(formData[key]));
      }
    }

    try {
      await axios.post('https://api.lehungba.com/api/create-friend/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Friend created successfully');
      navigation.goBack(); // Quay lại màn hình trước sau khi tạo thành công
    } catch (error) {
      console.error(error);
      alert('Error creating friend');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profile_picture: result.uri });
    }
  };

  const RELIGION_CHOICES = [
    { value: 'catholic', label: 'Công giáo' },
    { value: 'buddhist', label: 'Phật giáo' },
    { value: 'protestant', label: 'Tin Lành' },
    { value: 'other', label: 'Đạo khác' },
  ];

  const STATUS_CHOICES = [
    { value: 'student', label: 'Đang đi học' },
    { value: 'employed', label: 'Đã đi làm' },
    { value: 'unemployed', label: 'Thất nghiệp' },
    { value: 'monk', label: 'Đi tu' },
  ];

  const RELATIONSHIP_CATEGORY_CHOICES = [
    { value: 'benefactor', label: 'Ân Nhân' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'ex_girlfriend', label: 'Bạn gái cũ' },
    { value: 'classmate', label: 'Bạn học' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={30}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Icon
          name="person-add"
          size={30}
          color="#000"
          onPress={() => setFormVisible(!formVisible)}
        />
      </View>
      {formVisible && (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.full_name}
            onChangeText={(text) => handleInputChange('full_name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name VN"
            value={formData.full_name_vn}
            onChangeText={(text) => handleInputChange('full_name_vn', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Birth Date"
            value={formData.birth_date}
            onChangeText={(text) => handleInputChange('birth_date', text)}
          />
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={handleToggleGender} style={styles.toggleButton}>
              <Icon
                name={formData.gender ? "male" : "female"}
                size={30}
                color={formData.gender ? "blue" : "pink"}
              />
              <Text>{formData.gender ? "Male" : "Female"}</Text>
            </TouchableOpacity>
            <ToggleSwitch isOn={formData.is_alive} handleToggle={handleToggleIsAlive} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange('phone_number', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nationality"
            value={formData.nationality}
            onChangeText={(text) => handleInputChange('nationality', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Marital Status"
            value={formData.marital_status}
            onChangeText={(text) => handleInputChange('marital_status', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="History"
            value={formData.history}
            onChangeText={(text) => handleInputChange('history', text)}
          />

          <Text>Status:</Text>
          {STATUS_CHOICES.map((status) => (
            <View key={status.value} style={styles.checkboxContainer}>
              <Checkbox
                value={formData.status.includes(status.value)}
                onValueChange={() => handleStatusChange(status.value)}
              />
              <Text>{status.label}</Text>
            </View>
          ))}

          <Text>Religion:</Text>
          {RELIGION_CHOICES.map((religion) => (
            <View key={religion.value} style={styles.checkboxContainer}>
              <Checkbox
                value={formData.religion.includes(religion.value)}
                onValueChange={() => handleReligionChange(religion.value)}
              />
              <Text>{religion.label}</Text>
            </View>
          ))}

          <Text>Relationship Category:</Text>
          {RELATIONSHIP_CATEGORY_CHOICES.map((category) => (
            <View key={category.value} style={styles.checkboxContainer}>
              <Checkbox
                value={formData.relationship_category.includes(category.value)}
                onValueChange={() => handleRelationshipCategoryChange(category.value)}
              />
              <Text>{category.label}</Text>
            </View>
          ))}

          <TextInput
            style={styles.input}
            placeholder="Education Level"
            value={formData.education_level}
            onChangeText={(text) => handleInputChange('education_level', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Occupation"
            value={formData.occupation}
            onChangeText={(text) => handleInputChange('occupation', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Monk Notes"
            value={formData.monk_notes}
            onChangeText={(text) => handleInputChange('monk_notes', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Unemployed Notes"
            value={formData.unemployed_notes}
            onChangeText={(text) => handleInputChange('unemployed_notes', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Health Status"
            value={formData.health_status}
            onChangeText={(text) => handleInputChange('health_status', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Death Date"
            value={formData.death_date}
            onChangeText={(text) => handleInputChange('death_date', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Wedding Day"
            value={formData.wedding_day}
            onChangeText={(text) => handleInputChange('wedding_day', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Family Info"
            value={formData.family_info}
            onChangeText={(text) => handleInputChange('family_info', text)}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.button}>Pick an image from camera roll</Text>
          </TouchableOpacity>
          {formData.profile_picture && (
            <Image source={{ uri: formData.profile_picture }} style={styles.image} />
          )}
          <TextInput
            style={styles.input}
            placeholder="Hobbies Interests"
            value={formData.hobbies_interests}
            onChangeText={(text) => handleInputChange('hobbies_interests', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Social Media Links"
            value={formData.social_media_links}
            onChangeText={(text) => handleInputChange('social_media_links', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cause of Death"
            value={formData.cause_of_death}
            onChangeText={(text) => handleInputChange('cause_of_death', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Religion"
            value={formData.religion}
            onChangeText={(text) => handleInputChange('religion', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Achievement"
            value={formData.achievement}
            onChangeText={(text) => handleInputChange('achievement', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Relationship Category"
            value={formData.relationship_category}
            onChangeText={(text) => handleInputChange('relationship_category', text)}
          />
          <Button title="Create Friend" onPress={handleSubmit} disabled={loading} />
        </ScrollView>
      )}
    </View>
  );
};;

const toggleStyles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 25,
    padding: 5,
    margin: 10,
  },
  on: {
    backgroundColor: 'green',
  },
  off: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const additionalStyles = StyleSheet.create({
  alive: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
  },
  deceased: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateFriendScreen;
