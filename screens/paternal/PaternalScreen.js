import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppHeader from '../../components/AppHeader';  // Đảm bảo đường dẫn đúng

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
          const response = await axios.get(`https://api.lehungba.com/api/user/paternal-detail/?people_id=${peopleId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('API Response:', response.data);

          const familyMembers = [];

          if (response.data.paternal_grandfather) {
            familyMembers.push(response.data.paternal_grandfather);
          }
          if (response.data.paternal_grandmother) {
            familyMembers.push(response.data.paternal_grandmother);
          }
          if (response.data.parent_relationships) {
            response.data.parent_relationships.forEach(rel => {
              if (rel.father) familyMembers.push(rel.father);
              if (rel.mother) familyMembers.push(rel.mother);
            });
          }
          if (response.data.siblings) {
            if (response.data.siblings.older_brothers) {
              familyMembers.push(...response.data.siblings.older_brothers);
            }
            if (response.data.siblings.younger_brothers) {
              familyMembers.push(...response.data.siblings.younger_brothers);
            }
            if (response.data.siblings.older_sisters) {
              familyMembers.push(...response.data.siblings.older_sisters);
            }
            if (response.data.siblings.younger_sisters) {
              familyMembers.push(...response.data.siblings.younger_sisters);
            }
          }
          if (response.data.paternal_aunts_uncles) {
            familyMembers.push(...response.data.paternal_aunts_uncles);
          }

          setFamilyMembers(familyMembers);
        }
      } catch (error) {
        console.error('Error fetching family data:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
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
      <AppHeader back title="Thành Viên Gia Đình Nội" />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddFamilyMember")}
      >
        <Icon name="person-add" size={30} color="black" />
      </TouchableOpacity>
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
