import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyfamilyScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const token = await AsyncStorage.getItem('access'); // Đảm bảo tên khóa là 'access'
        const peopleId = await AsyncStorage.getItem('people_id'); // Đảm bảo tên khóa là 'people_id'

        console.log('Token:', token);
        console.log('People ID:', peopleId);

        if (token && peopleId) {
          const response = await axios.get('https://api.lehungba.com/api/user/user-detail/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('API Response:', response.data);

          // Kết hợp các mảng parents và siblings lại thành một mảng duy nhất
          const parents = response.data.parent_relationships.map(rel => {
            return {
              ...rel.father,
              relation: 'Ba'
            };
          }).concat(response.data.parent_relationships.map(rel => {
            return {
              ...rel.mother,
              relation: 'Mẹ'
            };
          }));

          const siblings = [
            ...(response.data.siblings.older_brothers || []).map(sibling => ({...sibling, relation: 'Anh trai'})),
            ...(response.data.siblings.younger_brothers || []).map(sibling => ({...sibling, relation: 'Em trai'})),
            ...(response.data.siblings.older_sisters || []).map(sibling => ({...sibling, relation: 'Chị gái'})),
            ...(response.data.siblings.younger_sisters || []).map(sibling => ({...sibling, relation: 'Em gái'})),
          ];

          const familyMembers = [
            ...parents,
            ...siblings,
          ];

          setFamilyMembers(familyMembers);
        }
      } catch (error) {
        console.error('Error fetching family data:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    fetchFamilyData();
  }, []);

  const renderFamilyMember = ({ item }) => (
    <TouchableOpacity 
      style={styles.memberContainer}
      onPress={() => navigation.navigate('DetailScreen', { id: item.people_id })}
    >
      <Image
        source={item.profile_picture ? { uri: item.profile_picture } : (item.gender ? require("../../assets/father.png") : require("../../assets/mother.png"))}
        style={styles.profilePicture}
      />
      <View style={styles.textContainer}>
        <Text style={styles.memberName}>{item.full_name_vn}</Text>
        {item.relation && <Text style={styles.relation}>{item.relation}</Text>}
        <Text style={styles.birthDate}>{item.birth_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Thành Viên Gia Đình</Text>
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
    paddingTop: 50,
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
});

export default MyfamilyScreen;
