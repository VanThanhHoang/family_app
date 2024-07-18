import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppHeader from '../../components/AppHeader';
import AxiosInstance from '../../network/AxiosInstance';

const PaternalScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const token = await AsyncStorage.getItem('access');
        const peopleId = await AsyncStorage.getItem('people_id');

        console.log('Token:', token);
        console.log('People ID:', peopleId);
        if (token && peopleId) {
          const response = await AxiosInstance().get(`user/paternal-detail/`);
          const familyMembers = [
            ...(response.paternal_grandfather ? [{ ...response.paternal_grandfather, relation: 'Ông nội' }] : []),
            ...(response.paternal_grandmother ? [{ ...response.paternal_grandmother, relation: 'Bà nội' }] : []),
            ...(response.parent_relationships || []).map(rel => ({
              ...rel.father,
              relation: 'Ba'
            })).concat((response.parent_relationships || []).map(rel => ({
              ...rel.mother,
              relation: 'Mẹ'
            }))),
            ...(response.siblings.older_brothers || []).map(sibling => ({ ...sibling, relation: 'Anh trai' })),
            ...(response.siblings.younger_brothers || []).map(sibling => ({ ...sibling, relation: 'Em trai' })),
            ...(response.siblings.older_sisters || []).map(sibling => ({ ...sibling, relation: 'Chị gái' })),
            ...(response.siblings.younger_sisters || []).map(sibling => ({ ...sibling, relation: 'Em gái' })),
            ...(response.paternal_aunts_uncles || []).map(auntUncle => ({
              ...auntUncle,
              relation: auntUncle.relation // Quan hệ được xử lý từ backend
            }))
          ];

          setFamilyMembers(familyMembers);
        }
      } catch (error) {
        console.error('Error fetching family data:', error);
        console.error('Error details:', error.response ? error.response : error.message);
      }
    };

    fetchFamilyData();
  }, []);

  const renderFamilyMember = ({ item }) => {
    const profilePictureUrl = item.profile_picture
      ? { uri: item.profile_picture }
      : item.gender
      ? require("../../assets/father.png")
      : require("../../assets/mother.png");
    console.log("Profile picture:", profilePictureUrl.uri || profilePictureUrl);

    return (
      <TouchableOpacity 
        style={styles.memberContainer}
        onPress={() => navigation.navigate('DetailBirthDay', { id: item.people_id })}
      >
        <Image source={profilePictureUrl} style={styles.profilePicture} />
        <View style={styles.textContainer}>
          <Text style={styles.memberName}>{item.full_name_vn}</Text>
          {item.relationship && <Text style={styles.relation}>{item.relationship}</Text>}
          <Text style={styles.birthDate}>{item.birth_date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader back title={'Thành viên gia đình nội'} />
      <FlatList
        data={familyMembers}
        keyExtractor={(item) => item.people_id.toString()}
        renderItem={renderFamilyMember}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  relation: {
    fontSize: 14,
    color: '#777',
  },
  birthDate: {
    fontSize: 12,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    padding: 10,
    elevation: 3, // Tạo bóng để nút nổi bật hơn
  },
});

export default PaternalScreen;
