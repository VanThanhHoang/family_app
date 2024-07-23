import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Modal from "react-native-modal";
import { AppContext } from "../../AppContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../ThemeContext";
import createMember from "../myfamily/DataFamily"; // Import the utility function
import styles from "../components/myfamily/MyfamilyScreenStyles";
import FamilyMemberCard from "../components/Avata/FamilyMemberCard"; // Import FamilyMemberCard

const PaternalScreen = () => {
  const navigation = useNavigation();
  const { setIsLoading } = useContext(AppContext);
  const { theme: rneTheme } = useThemeContext();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchFamilyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("access");
      const peopleId = await AsyncStorage.getItem("people_id");
      if (token && peopleId) {
        const response = await AxiosInstance().get("paternaltree/_test/");
        const data = response.data;
        console.log("Family data:", data);
        const processedData = processFamilyData(data);
        setFamilyMembers(processedData);
      }
    } catch (error) {
      console.error("Error fetching family data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchFamilyData);
    return unsubscribe;
  }, [fetchFamilyData, navigation]);

  const processFamilyData = (data) => {
    const processedData = [];

    if (data.paternal_grandparents) {
      const paternalGrandparents = processRelationships(data.paternal_grandparents.relationships, data.paternal_grandparents.title);
      processedData.push({
        title: data.paternal_grandparents.title,
        members: paternalGrandparents,
      });
    }

    if (data.user_parents) {
      const userParents = processRelationships(data.user_parents.relationships, data.user_parents.title);
      processedData.push({
        title: data.user_parents.title,
        members: userParents,
      });
    }

    if (data.user_spouse && data.user_spouse.relationships) {
      const userSpouse = processRelationships([data.user_spouse.relationships], data.user_spouse.title);
      processedData.push({
        title: data.user_spouse.title,
        members: userSpouse,
      });
    }

    if (data.user_children) {
      let children = data.user_children.relationships;
      children.sort((a, b) => new Date(a.birth_date) - new Date(b.birth_date));
      const userChildren = processRelationships(children, data.user_children.title);
      processedData.push({
        title: data.user_children.title,
        members: userChildren,
      });
    }

    if (data.user_siblings) {
      let siblings = data.user_siblings.relationships;
      siblings.sort((a, b) => new Date(a.birth_date) - new Date(b.birth_date));
      const userSiblings = processRelationships(siblings, data.user_siblings.title);
      processedData.push({
        title: data.user_siblings.title,
        members: userSiblings,
      });
    }

    if (data.user_siblings_children) {
      const userSiblingsChildren = processUserSiblingsChildren(data.user_siblings_children.relationships);
      processedData.push(...userSiblingsChildren);
    }

    return processedData;
  };

  const processRelationships = (relationships, title) => {
    let members = [];
    let singleMembers = [];

    if (relationships && Array.isArray(relationships)) {
      relationships.forEach((person) => {
        const member = createMember(person, title);
        if (person.spouse) {
          members.push([member, createMember(person.spouse, title)]);
        } else {
          singleMembers.push(member);
        }
      });
    }

    if (singleMembers.length > 0) {
      while (singleMembers.length > 1) {
        members.unshift([singleMembers.pop(), singleMembers.pop()]);
      }
      if (singleMembers.length === 1) {
        members.unshift([singleMembers.pop()]);
      }
    }

    return members;
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const processUserSiblingsChildren = (siblingsChildren) => {
    return siblingsChildren.map((sibling) => {
      if (sibling.children && sibling.children.length > 0) {
        const children = sibling.children.map((child) => createMember(child, `${sibling.full_name_vn} và ${sibling.spouse ? sibling.spouse.full_name_vn : ""}`));
  
        return {
          title: `${sibling.full_name_vn} và ${sibling.spouse ? sibling.spouse.full_name_vn : ""}`,
          age: calculateAge(sibling.birth_date),
          members: pairChildren(children),
        };
      }
      return null;
    }).filter(Boolean).sort((a, b) => b.age - a.age);
  };

  const pairChildren = (children) => {
    const paired = [];
    for (let i = 0; i < children.length; i += 2) {
      paired.push(children.slice(i, i + 2));
    }
    return paired;
  };

  const renderFamilyPairs = ({ item }) => (
    <View>
      <Text style={[styles.categoryTitle, { color: rneTheme.colors.text }]}>{item.title}</Text>
      {Array.isArray(item.members) && item.members.map((memberGroup, index) => (
        <View style={styles.pairContainer} key={index}>
          {Array.isArray(memberGroup) ? (
            memberGroup.map((member, idx) => (
              <FamilyMemberCard key={idx} member={member} />
            ))
          ) : (
            <FamilyMemberCard key={index} member={memberGroup} />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: rneTheme.colors.background }]}>
      <AppHeader back title="Thành viên gia đình" />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddFamilyCenterScreen")}
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
        renderItem={renderFamilyPairs}
      />
      <Modal isVisible={isModalVisible}>
        <View style={[styles.modalContent, { backgroundColor: rneTheme.colors.card }]}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PaternalScreen;
