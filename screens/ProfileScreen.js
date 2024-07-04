import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const getUserInfo = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const email = await AsyncStorage.getItem("email");
      const id = await AsyncStorage.getItem("id");
      const people_id = await AsyncStorage.getItem("people_id");
      let profile_picture = await AsyncStorage.getItem("profile_picture");
      const full_name_vn = await AsyncStorage.getItem("full_name_vn");

      // Thêm tiền tố nếu profile_picture có giá trị
      if (profile_picture) {
        profile_picture = `https://api.lehungba.com${profile_picture}`;
      }

      setUserInfo({
        access,
        email,
        id,
        people_id,
        profile_picture,
        full_name_vn
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      // Here you can also handle uploading the image to your server if needed
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tài khoản</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePass')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="key" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          >
            <Ionicons name="log-out" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}
      >
        <View style={{ position: 'relative', width: 80, height: 80 }}>
          <Image
            source={{
              uri: selectedImage || userInfo.profile_picture || 'https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 2,
              borderColor: 'gray',
              backgroundColor: 'gray',
              resizeMode: 'cover',
            }}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              bottom: 1,
              right: -1,
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 2,
            }}
          >
            <Ionicons name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          {userInfo.full_name_vn || userInfo.email}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', padding: 25 }}>
        <SettingItem
          icon={'person'}
          title="My Profile"
          onPress={() => navigation.navigate('DetailInfo')}
        />
        <SettingItem
          icon={'people'}
          title="My Family"
          onPress={() => navigation.navigate('Family')}
        />
        <SettingItem
          icon={'home'}
          title="Gia Đình Nội"
          onPress={() => navigation.navigate('GiaDinhNoi')}
        />
        <SettingItem
          icon={'home'}
          title="Gia Ngoại"
          onPress={() => navigation.navigate('GiaNgoai')}
        />
        <SettingItem
          icon={'school'}
          title="My Teacher"
          onPress={() => navigation.navigate('Teacher')}
        />
        <SettingItem
          icon={'person-add'}
          title="My Friend"
          onPress={() => navigation.navigate('Friend')}
        />
        <TouchableOpacity style={styles.crmButton} onPress={() => {/* Add your navigation or functionality here */}}>
          <Text style={styles.crmButtonText}>BUSINESS CRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingItem = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        width: '100%',
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color="black" />
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>
        {title}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="gray"
        style={{ marginLeft: 'auto' }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  crmButton: {
    marginTop: 20,
    backgroundColor: '#3BC371', // Change to the green color you want
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
    bottom: -30,
  },
  crmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ProfileScreen;
