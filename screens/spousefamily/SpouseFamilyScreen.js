import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Icon from "react-native-vector-icons/Ionicons";

const SpouseFamilyScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);

  const fetchFamilyData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      console.log("Token for fetching family data:", token);
      if (token) {
        const response = await AxiosInstance().get('spouse/relationship/');
        if (response.data && response.data) {
          const data = response.data;

          const parents = [];
          if (data.spouse_parents) {
            if (data.spouse_parents.father) {
              parents.push(data.spouse_parents.father);
            }
            if (data.spouse_parents.mother) {
              parents.push(data.spouse_parents.mother);
            }
          }

          const siblings = data.spouse_siblings || [];
          setFamilyMembers([...parents, ...siblings]);
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
    elevation: 3, // Tạo bóng để nút nổi bật hơn
  },
});

export default SpouseFamilyScreen;
