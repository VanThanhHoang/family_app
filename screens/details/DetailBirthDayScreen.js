import React, { useContext, useState, useCallback, useRef } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Modal from "react-native-modal";
import { AppContext } from "../../AppContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../ThemeContext";
import createMember from "../myfamily/DataFamily";
import styles from "../components/people/PeopleStyles";
import FamilyMemberCard from "../components/Avata/FamilyMemberCard";
import { MaterialIcons } from '@expo/vector-icons';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Lấy id từ tham số route
  const { setIsLoading } = useContext(AppContext);
  const { theme: rneTheme } = useThemeContext();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [peopleInfo, setPeopleInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null); // Thêm useRef để tham chiếu đến FlatList

  const toggleModal = () => setModalVisible(!isModalVisible);

  const fetchFamilyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("access");
      if (token) {
        const response = await AxiosInstance().get(`https://api.lehungba.com/api/people/relationship/?people_id=${id}`);
        const data = response.data;
        if (data.people_info && data.people_info.relationships) {
          setPeopleInfo(createMember(data.people_info.relationships[0], data.people_info.title));
        }
        setFamilyMembers(processFamilyData(data));
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true }); // Cuộn lên trên cùng
      }
    } catch (error) {
      console.error("Error fetching family data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading]);

  useFocusEffect(
    useCallback(() => {
      fetchFamilyData();
    }, [fetchFamilyData])
  );

  const processFamilyData = (data) => {
    const processedData = [];

    const processSection = (section, title) => {
      if (section && section.relationships) {
        const members = processRelationships(section.relationships, title);
        processedData.push({ title, members });
      }
    };

    processSection(data.maternal_grandparents, data.maternal_grandparents?.title);
    processSection(data.paternal_grandparents, data.paternal_grandparents?.title);
    processSection(data.user_parents, data.user_parents?.title);
    processSection(data.user_spouse, data.user_spouse?.title);
    processSection(data.user_children, data.user_children?.title);
    processSection(data.user_siblings, data.user_siblings?.title);
    processSection(data.father_sibling_children, data.father_sibling_children?.title);
    processSection(data.mother_sibling_children, data.mother_sibling_children?.title);

    return processedData;
  };

  const processRelationships = (relationships, title) => {
    const membersWithSpouses = [];
    const membersWithoutSpouses = [];

    relationships.forEach(person => {
      const member = createMember(person, title);
      if (person.spouse) {
        membersWithSpouses.push([member, createMember(person.spouse, title)]);
      } else {
        membersWithoutSpouses.push(member);
      }
    });

    membersWithSpouses.sort((a, b) => calculateAge(b[0].birth_date) - calculateAge(a[0].birth_date));
    membersWithoutSpouses.sort((a, b) => calculateAge(b.birth_date) - calculateAge(a.birth_date));

    const pairedWithoutSpouses = [];
    for (let i = 0; i < membersWithoutSpouses.length; i += 2) {
      pairedWithoutSpouses.push(membersWithoutSpouses.slice(i, i + 2));
    }

    return [...membersWithSpouses, ...pairedWithoutSpouses];
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleMemberPress = (member) => {
    navigation.navigate('Detail', { id: member.id }); // Điều hướng đến chi tiết thành viên với id của thành viên đó
  };

  const renderFamilyPairs = ({ item }) => (
    <View>
      <View style={[styles.divider, { borderBottomColor: rneTheme.colors.dividerColor }]} />
      <View style={styles.parentHighlightContainer}>
        {typeof item.title === 'string' ? (
          <Text style={[styles.parentTitle, { color: rneTheme.colors.text }]}>{item.title}</Text>
        ) : (
          item.title
        )}
        {item.parentAvatars && (
          <View style={styles.parentAvatarsContainer}>
            {item.parentAvatars.father && <Image source={{ uri: item.parentAvatars.father }} style={styles.parentAvatar} />}
            {item.parentAvatars.mother && <Image source={{ uri: item.parentAvatars.mother }} style={styles.parentAvatar} />}
          </View>
        )}
      </View>
      {Array.isArray(item.members) && item.members.map((memberGroup, index) => (
        <View style={styles.pairContainer} key={index}>
          {Array.isArray(memberGroup) ? memberGroup.map((member, idx) => (
            <FamilyMemberCard key={idx} member={member} onPress={() => handleMemberPress(member)} />
          )) : (
            <FamilyMemberCard key={index} member={memberGroup} onPress={() => handleMemberPress(memberGroup)} />
          )}
        </View>
      ))}
    </View>
  );

  const renderPeopleInfo = () => (
    <View style={styles.memberDetailContainer}>
      {peopleInfo && (
        <>
          <Image
            source={
              peopleInfo.profile_picture
                ? { uri: peopleInfo.profile_picture }
                : peopleInfo.gender
                ? require("../../assets/father.png")
                : require("../../assets/mother.png")
            }
            style={styles.profilePicture}
          />
          <Text style={[styles.memberName, { color: rneTheme.colors.nameColor }]}>{peopleInfo.full_name_vn}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              {peopleInfo.birth_date && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="date-range" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.birth_date}</Text>
                </View>
              )}
              {peopleInfo.birth_date && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="cake" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{calculateAge(peopleInfo.birth_date)} tuổi</Text>
                </View>
              )}
              {peopleInfo.place_of_birth?.address_line && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="place" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.place_of_birth.address_line}</Text>
                </View>
              )}
              <View style={styles.detailRow}>
                <MaterialIcons name="phone" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.phone_number}</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              {peopleInfo.religion && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="church" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.religion}</Text>
                </View>
              )}
              {peopleInfo.gender && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="person" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.gender ? "Nam" : "Nữ"}</Text>
                </View>
              )}
              {peopleInfo.marital_status && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="favorite" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.marital_status ? "Đã kết hôn" : "Chưa kết hôn"}</Text>
                </View>
              )}
              {peopleInfo.nationality && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="language" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.nationality}</Text>
                </View>
              )}
              {peopleInfo.saint && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="account-circle" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.saint}</Text>
                </View>
              )}
              {peopleInfo.education_level && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="school" style={[styles.detailIcon, { color: rneTheme.colors.text }]} />
                  <Text style={[styles.detailText, { color: rneTheme.colors.text }]}>{peopleInfo.education_level}</Text>
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
  

  return (
    <View style={[styles.container, { backgroundColor: rneTheme.colors.background }]}>
      <AppHeader back title="Thông Tin" />
      <FlatList
        ref={flatListRef} // Thêm ref vào FlatList
        data={familyMembers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFamilyPairs}
        ListHeaderComponent={renderPeopleInfo}
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

export default DetailScreen;
