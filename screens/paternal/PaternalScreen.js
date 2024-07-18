import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../ThemeContext";
import { defaultPeople } from "../myfamily/Data";

const PaternalScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);
  const { theme } = useThemeContext();
  const [isHasGrandMother, setIsHasGrandMother] = useState(false);
  const fetchFamilyData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      console.log("Token for fetching family data:", token);
      if (token) {
        const response = await AxiosInstance().get("paternal-relationship/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data) {
          const data = response.data;

          const groupedMembers = [];

          // Group paternal grandparents
          if (data.paternal_grandparents) {
            const grandparents = [];
            if (data.paternal_grandparents.paternal_grandfather) {
              grandparents.push({
                ...data.paternal_grandparents.paternal_grandfather,
                relationship:
                  data.paternal_grandparents.paternal_grandfather_relationship,
                relationship_id:
                  data.paternal_grandparents
                    .paternal_grandfather_relationship_id,
              });
            }
            if (data.paternal_grandparents.paternal_grandmother) {
              grandparents.push({
                ...data.paternal_grandparents.paternal_grandmother,
                relationship:
                  data.paternal_grandparents.paternal_grandmother_relationship,
                relationship_id:
                  data.paternal_grandparents
                    .paternal_grandmother_relationship_id,
              });
            }

            groupedMembers.push(grandparents);
            if (groupedMembers.length > 0) {
              setIsHasGrandMother(true);
            }
          }

          // Group user parents
          if (data.user_parents) {
            const parents = [];
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
            groupedMembers.push(parents);
          }

          // Add siblings
          const siblings = (data.user_siblings?.siblings || []).map(
            (sibling) => ({
              ...sibling,
              key: `sibling-${sibling.people_id}`,
            })
          );
          groupedMembers.push(siblings);

          // Add father's siblings
          const fatherSiblings = (data.father_siblings || []).map(
            (sibling) => ({
              ...sibling,
              key: `father-sibling-${sibling.people_id}`,
            })
          );
          groupedMembers.push(fatherSiblings);

          setFamilyMembers(groupedMembers);
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
    return (
      <View style={styles.memberRow}>
        {item.map((member) => {
          const profilePictureUrl = member.profile_picture
            ? { uri: member.profile_picture }
            : member.gender
            ? require("../../assets/father.png")
            : require("../../assets/mother.png");
          const age = member.birth_date
            ? new Date().getFullYear() -
              new Date(member.birth_date).getFullYear()
            : null;
          return (
            <TouchableOpacity
              key={member.people_id}
              style={styles.memberContainer}
              onPress={() =>
                navigation.navigate("DetailBirthDay", { id: member.people_id })
              }
            >
              <Image source={profilePictureUrl} style={styles.profilePicture} />
              <View style={styles.textContainer}>
                <Text style={[styles.memberName, { color: theme.colors.text }]}>
                  {member.full_name_vn}
                </Text>
                {age !== null && (
                  <Text
                    style={[styles.age, { color: theme.colors.text }]}
                  >{`Tuổi: ${age}`}</Text>
                )}
                {member.relationship && (
                  <Text style={[styles.relation, { color: theme.colors.text }]}>
                    {member.relationship}
                  </Text>
                )}
                <Text style={[styles.birthDate, { color: theme.colors.text }]}>
                  {member.birth_date}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader back title="Thành viên gia đình" />
      {!isHasGrandMother && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddFatherMotherScreen", {
              type: 3,
              father: defaultPeople,
              mother: defaultPeople,
              marriageDate: "",
            })
          }
        >
          <LinearGradient
            colors={["#FFD700", "#FFA500"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.addButtonGradient}
          >
            <Icon name="person-add" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      )}
      <FlatList
        data={familyMembers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFamilyMember}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  memberContainer: {
    flexBasis: "48%",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  profilePicture: {
    width: 60, // Increase the size by 20%
    height: 60, // Increase the size by 20%
    borderRadius: 30,
    marginBottom: 5,
  },
  textContainer: {
    alignItems: "center",
  },
  memberName: {
    fontSize: 16, // Increase the size by 20%
    fontWeight: "bold",
    textAlign: "center",
  },
  age: {
    fontSize: 14, // Increase the size by 20%
    textAlign: "center",
  },
  relation: {
    fontSize: 14, // Increase the size by 20%
    textAlign: "center",
  },
  birthDate: {
    fontSize: 14, // Increase the size by 20%
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  addButtonGradient: {
    borderRadius: 50,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaternalScreen;
