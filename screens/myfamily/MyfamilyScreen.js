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
import styles from "../components/myfamily/MyfamilyScreenStyles";
import createMember from "./DataFamily"; // Import the utility function

const MyfamilyScreen = () => {
  const navigation = useNavigation();
  const { setIsLoading } = useContext(AppContext);
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
        const response = await AxiosInstance().get("myfamily/relationship/");
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

    if (data.maternal_grandparents) {
      const maternalGrandparents = processRelationships(data.maternal_grandparents.relationships, data.maternal_grandparents.title);
      processedData.push({
        title: data.maternal_grandparents.title,
        members: maternalGrandparents,
      });
    }

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
          members: [children],
        };
      }
      return null;
    }).filter(Boolean).sort((a, b) => b.age - a.age);
  };

  const renderFamilyPairs = ({ item }) => (
    <View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      {Array.isArray(item.members) && item.members.map((memberPair, index) => (
        <View style={styles.pairContainer} key={index}>
          {Array.isArray(memberPair) && memberPair.map((member, idx) => (
            <FamilyMemberCard key={idx} member={member} />
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
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
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const FamilyMemberCard = ({ member }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.memberContainer}>
      <TouchableOpacity
        style={styles.memberDetailContainer}
        onPress={() => navigation.navigate("DetailBirthDay", { id: member.people_id })}
      >
        <Image
          source={
            member.profile_picture
              ? { uri: member.profile_picture }
              : member.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={styles.profilePicture}
        />
        <View style={styles.textContainer}>
          <Text style={styles.memberName} numberOfLines={1} adjustsFontSizeToFit>
            {member.full_name_vn}
          </Text>
          <Text style={styles.birthDate}>{member.birth_date}</Text>
          <Text style={styles.relationship}>{member.relationship}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyfamilyScreen;
