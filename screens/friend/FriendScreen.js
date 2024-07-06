import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useTheme } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../components/friend/FriendItem'; // Điều chỉnh đường dẫn nếu cần thiết
import Button from '/Users/macm1/Documents/mobile_app/components/Button.js'; // Import nút bấm

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
    full_name_vn: '',
    birth_date: '',
    phone_number: '',
    nationality: 'Việt Nam',
    marital_status: false, // false là độc thân, true là đã kết hôn
    history: '',
    status: ['employed'], // mặc định là "Đi Làm"
    gender: true, // true là nam, false là nữ
    is_alive: true, // true là còn sống, false là đã mất
    education_level: '',
    occupation: '',
    monk_notes: '',
    unemployed_notes: '',
    death_date: '',
    wedding_day: '',
    profile_picture: null,
    hobbies_interests: '',
    social_media_links: '',
    cause_of_death: '',
    religion: ['catholic'], // mặc định là "Công giáo"
    achievement: '',
    relationship_category: ['ex_girlfriend'], // mặc định là "Bạn"
    address: {
      country: '',
      postal_code: '',
      city: '',
      state_or_province: '',
      district_or_county: '',
      address_line: '',
    },
    place_of_birth: {
      country: '',
      postal_code: '',
      city: '',
      state_or_province: '',
      district_or_county: '',
      address_line: '',
    },
    place_of_death: {
      country: '',
      postal_code: '',
      city: '',
      state_or_province: '',
      district_or_county: '',
      address_line: '',
    },
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

  const handleNestedInputChange = (section, name, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
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

  const handleToggleMaritalStatus = () => {
    setFormData({
      ...formData,
      marital_status: !formData.marital_status,
    });
  };

  const handleStatusChange = (status) => {
    const newStatus = formData.status.includes(status)
      ? formData.status.filter(item => item !== status)
      : [status]; // đảm bảo chỉ có một trạng thái được chọn mỗi lần
    setFormData({ ...formData, status: newStatus });
  };

  const handleReligionChange = (religion) => {
    const newReligion = formData.religion.includes(religion)
      ? formData.religion.filter(item => item !== religion)
      : [religion]; // đảm bảo chỉ có một tôn giáo được chọn mỗi lần
    setFormData({ ...formData, religion: newReligion });
  };

  const handleRelationshipCategoryChange = (category) => {
    const newCategory = formData.relationship_category.includes(category)
      ? formData.relationship_category.filter(item => item !== category)
      : [category]; // đảm bảo chỉ có một loại quan hệ được chọn mỗi lần
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
      alert('Tạo bạn thành công');
      navigation.goBack(); // Quay lại màn hình trước sau khi tạo thành công
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tạo bạn');
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
      const cacheDir = FileSystem.cacheDirectory + 'avatars/';
      await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
      const newPath = cacheDir + result.uri.split('/').pop();
      await FileSystem.copyAsync({
        from: result.uri,
        to: newPath,
      });
      setFormData({ ...formData, profile_picture: newPath });
    }
  };

  const RELIGION_CHOICES = [
    { value: 'catholic', label: 'Công giáo' },
    { value: 'buddhist', label: 'Phật giáo' },
    { value: 'protestant', label: 'Tin Lành' },
    { value: 'other', label: 'Đạo khác' },
  ];

  const STATUS_CHOICES = [
    { value: 'student', label: 'Đang học' },
    { value: 'employed', label: 'Đi Làm' },
    { value: 'unemployed', label: 'Nội Trợ' },
    { value: 'monk', label: 'Đi tu' },
  ];

  const RELATIONSHIP_CATEGORY_CHOICES = [
    { value: 'benefactor', label: 'Ân Nhân' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'ex_girlfriend', label: 'Bạn' },
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
          <View style={updatedStyles.avatarContainer}>
            <Image
              source={{ uri: formData.profile_picture || 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=' }}
              style={updatedStyles.avatar}
            />
            <TouchableOpacity onPress={pickImage} style={updatedStyles.cameraIconContainer}>
              <Icon name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên đầy đủ"
            value={formData.full_name_vn}
            onChangeText={(text) => handleInputChange('full_name_vn', text)}
          />
          <View style={styles.toggleContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Ngày sinh"
              value={formData.birth_date}
              onChangeText={(text) => handleInputChange('birth_date', text)}
            />
            <TouchableOpacity onPress={handleToggleGender} style={styles.toggleButton}>
              <Icon
                name={formData.gender ? "male" : "female"}
                size={30}
                color={formData.gender ? "blue" : "pink"}
              />
              <Text>{formData.gender ? "Nam" : "Nữ"}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange('phone_number', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quốc tịch"
            value={formData.nationality}
            onChangeText={(text) => handleInputChange('nationality', text)}
          />
          <View style={styles.toggleContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formData.marital_status}
                onValueChange={handleToggleMaritalStatus}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxLabel}>Đã Kết Hôn</Text>
            </View>
            <ToggleSwitch isOn={formData.is_alive} handleToggle={handleToggleIsAlive} />
          </View>
          {formData.marital_status && (
            <TextInput
              style={styles.input}
              placeholder="Ngày cưới"
              value={formData.wedding_day}
              onChangeText={(text) => handleInputChange('wedding_day', text)}
            />
          )}

          {!formData.is_alive && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nguyên nhân tử vong"
                value={formData.cause_of_death}
                onChangeText={(text) => handleInputChange('cause_of_death', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Ngày mất"
                value={formData.death_date}
                onChangeText={(text) => handleInputChange('death_date', text)}
              />
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="Lịch sử"
            value={formData.history}
            onChangeText={(text) => handleInputChange('history', text)}
          />
          <View style={updatedStyles.checkboxSection}>
            <Text>Trạng thái:</Text>
            <View style={updatedStyles.checkboxContainerRow}>
              {STATUS_CHOICES.map((status) => (
                <View key={status.value} style={updatedStyles.checkboxItem}>
                  <Checkbox
                    value={formData.status.includes(status.value)}
                    onValueChange={() => handleStatusChange(status.value)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{status.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={updatedStyles.checkboxSection}>
            <Text>Tôn giáo:</Text>
            <View style={updatedStyles.checkboxContainerRow}>
              {RELIGION_CHOICES.map((religion) => (
                <View key={religion.value} style={updatedStyles.checkboxItem}>
                  <Checkbox
                    value={formData.religion.includes(religion.value)}
                    onValueChange={() => handleReligionChange(religion.value)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{religion.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={updatedStyles.checkboxSection}>
            <Text>Quan hệ:</Text>
            <View style={updatedStyles.checkboxContainerRow}>
              {RELATIONSHIP_CATEGORY_CHOICES.map((category) => (
                <View key={category.value} style={updatedStyles.checkboxItem}>
                  <Checkbox
                    value={formData.relationship_category.includes(category.value)}
                    onValueChange={() => handleRelationshipCategoryChange(category.value)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{category.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Trình độ học vấn"
            value={formData.education_level}
            onChangeText={(text) => handleInputChange('education_level', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nghề nghiệp"
            value={formData.occupation}
            onChangeText={(text) => handleInputChange('occupation', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Ghi chú tu hành"
            value={formData.monk_notes}
            onChangeText={(text) => handleInputChange('monk_notes', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Sở thích"
            value={formData.hobbies_interests}
            onChangeText={(text) => handleInputChange('hobbies_interests', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Liên kết mạng xã hội"
            value={formData.social_media_links}
            onChangeText={(text) => handleInputChange('social_media_links', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Thành tích"
            value={formData.achievement}
            onChangeText={(text) => handleInputChange('achievement', text)}
          />

          {formData.profile_picture && (
            <Image source={{ uri: formData.profile_picture }} style={styles.image} />
          )}
          <Button
            title="Tạo Bạn"
            onPress={handleSubmit}
            filled
            style={{ marginBottom: 20 }}
            disabled={loading}
          />
        </ScrollView>
      )}
    </View>
  );
};

const toggleStyles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    borderRadius: 10,
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
    fontSize: 13,
    fontWeight: 'bold',
  },
});

const updatedStyles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    position: 'relative',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 15,
    right: 130,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  checkboxSection: {
    marginBottom: 20,
  },
  checkboxContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkboxItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '22%',
    marginBottom: -15,
  },
  checkboxLabel: {
    marginTop: 8,
  },
});

export default CreateFriendScreen;
