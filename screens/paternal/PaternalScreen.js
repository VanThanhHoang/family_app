import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Icon from "react-native-vector-icons/Ionicons";

const PaternalFamilyScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);

  const fetchFamilyData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      console.log("Token for fetching family data:", token);
      if (token) {
        const response = await AxiosInstance().get('paternal-relationship/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data) {
          const data = response.data;

          const paternalGrandparents = [];
          if (data.paternal_grandparents) {
            if (data.paternal_grandparents.paternal_grandfather) {
              paternalGrandparents.push({
                ...data.paternal_grandparents.paternal_grandfather,
                relationship: data.paternal_grandparents.paternal_grandfather_relationship,
                relationship_id: data.paternal_grandparents.paternal_grandfather_relationship_id,
              });
            }
            if (data.paternal_grandparents.paternal_grandmother) {
              paternalGrandparents.push({
                ...data.paternal_grandparents.paternal_grandmother,
                relationship: data.paternal_grandparents.paternal_grandmother_relationship,
                relationship_id: data.paternal_grandparents.paternal_grandmother_relationship_id,
              });
            }
          }

          const parents = [];
          if (data.user_parents) {
            if (data.user_parents.father) {
              parents.push({
                ...data.user_parents.father,
                relationship: data.user_parents.father_relationship,
                relationship_id: data.user_parents.father_relationship_id,
              });
            }
            if (data.user_parents.mother) {
              parents.push({
                ...data.user_parents.mother,
                relationship: data.user_parents.mother_relationship,
                relationship_id: data.user_parents.mother_relationship_id,
              });
            }
          }

          const siblings = data.user_siblings?.siblings || [];
          const fatherSiblings = data.father_siblings || [];

          setFamilyMembers([...paternalGrandparents, ...parents, ...siblings, ...fatherSiblings]);
        }
      }
    } catch (error) {
      console.error("Error fetching family data:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
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
      <AppHeader back title="Thành viên gia đình" />
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  relation: {
    fontSize: 14,
    color: "#777",
  },
  birthDate: {
    fontSize: 12,
    color: "#555",
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
});

export default PaternalFamilyScreen;
