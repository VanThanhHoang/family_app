import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../ThemeContext";

const SpouseFamilyScreen = () => {
  const navigation = useNavigation();
  const [familyMembers, setFamilyMembers] = useState([]);
  const { theme } = useThemeContext();

  const fetchFamilyData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      console.log("Token for fetching family data:", token);
      if (token) {
        const response = await AxiosInstance().get('spouse/relationship/');
        if (response.data && response.data) {
          const data = response.data;

          const groupedMembers = [];

          // Group spouse parents
          if (data.spouse_parents) {
            groupedMembers.push({
              title: data.spouse_parents.spouse_parents.title,
              members: [
                data.spouse_parents.spouse_parents.father,
                data.spouse_parents.spouse_parents.mother
              ].filter(Boolean)
            });
          }

          // Group spouse siblings and their spouses
          if (data.spouse_siblings) {
            const siblingPairs = data.spouse_siblings.siblings.map(sibling => ({
              sibling,
              spouse: sibling.spouse
            }));
            groupedMembers.push({
              title: data.spouse_siblings.title,
              members: siblingPairs
            });
          }

          // Group spouse children
          if (data.spouse_children) {
            groupedMembers.push({
              title: data.spouse_children.title,
              members: data.spouse_children.children
            });
          }

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
      <View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
        <View style={styles.memberRow}>
          {item.members.map((memberPair, index) => {
            if (memberPair.sibling) {
              const sibling = memberPair.sibling;
              const spouse = memberPair.spouse;

              const siblingProfilePictureUrl = sibling.profile_picture
                ? { uri: sibling.profile_picture }
                : sibling.gender
                ? require("../../assets/father.png")
                : require("../../assets/mother.png");

              const spouseProfilePictureUrl = spouse && spouse.profile_picture
                ? { uri: spouse.profile_picture }
                : spouse && spouse.gender
                ? require("../../assets/father.png")
                : require("../../assets/mother.png");

              const siblingAge = sibling.birth_date ? new Date().getFullYear() - new Date(sibling.birth_date).getFullYear() : null;
              const spouseAge = spouse && spouse.birth_date ? new Date().getFullYear() - new Date(spouse.birth_date).getFullYear() : null;

              return (
                <View key={index} style={styles.coupleContainer}>
                  <TouchableOpacity
                    style={styles.memberContainer}
                    onPress={() => navigation.navigate('DetailBirthDay', { id: sibling.people_id })}
                  >
                    <Image source={siblingProfilePictureUrl} style={styles.profilePicture} />
                    <View style={styles.textContainer}>
                      <Text style={[styles.memberName, { color: theme.colors.text }]}>{sibling.full_name_vn}</Text>
                      {siblingAge !== null && <Text style={[styles.age, { color: theme.colors.text }]}>{`Tuổi: ${siblingAge}`}</Text>}
                      {sibling.relationship && <Text style={[styles.relation, { color: theme.colors.text }]}>{sibling.relationship}</Text>}
                      <Text style={[styles.birthDate, { color: theme.colors.text }]}>{sibling.birth_date}</Text>
                    </View>
                  </TouchableOpacity>
                  {spouse && (
                    <TouchableOpacity
                      style={styles.memberContainer}
                      onPress={() => navigation.navigate('DetailBirthDay', { id: spouse.people_id })}
                    >
                      <Image source={spouseProfilePictureUrl} style={styles.profilePicture} />
                      <View style={styles.textContainer}>
                        <Text style={[styles.memberName, { color: theme.colors.text }]}>{spouse.full_name_vn}</Text>
                        {spouseAge !== null && <Text style={[styles.age, { color: theme.colors.text }]}>{`Tuổi: ${spouseAge}`}</Text>}
                        <Text style={[styles.birthDate, { color: theme.colors.text }]}>{spouse.birth_date}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }

            // Nếu không có cặp đôi, chỉ có một người
            const profilePictureUrl = memberPair.profile_picture
              ? { uri: memberPair.profile_picture }
              : memberPair.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png");

            const age = memberPair.birth_date ? new Date().getFullYear() - new Date(memberPair.birth_date).getFullYear() : null;

            return (
              <TouchableOpacity
                key={memberPair.people_id}
                style={styles.memberContainer}
                onPress={() => navigation.navigate('DetailBirthDay', { id: memberPair.people_id })}
              >
                <Image source={profilePictureUrl} style={styles.profilePicture} />
                <View style={styles.textContainer}>
                  <Text style={[styles.memberName, { color: theme.colors.text }]}>{memberPair.full_name_vn}</Text>
                  {age !== null && <Text style={[styles.age, { color: theme.colors.text }]}>{`Tuổi: ${age}`}</Text>}
                  {memberPair.relationship && <Text style={[styles.relation, { color: theme.colors.text }]}>{memberPair.relationship}</Text>}
                  <Text style={[styles.birthDate, { color: theme.colors.text }]}>{memberPair.birth_date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader back title="Thành viên gia đình" />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddFamilyMember")}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  coupleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  textContainer: {
    alignItems: "center",
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  age: {
    fontSize: 14,
    textAlign: "center",
  },
  relation: {
    fontSize: 14,
    textAlign: "center",
  },
  birthDate: {
    fontSize: 14,
    textAlign: "center",
  },
  addButton: {
    position: 'absolute',
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

export default SpouseFamilyScreen;
