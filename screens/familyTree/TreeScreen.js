import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import { AppContext } from "../../AppContext";
import { useThemeContext } from "../../ThemeContext";
import styles from "../components/familyTree/TreeStyle";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const gradientColors = {
  level0: ['#FFD700', '#FFA500'],
  level1: ['#00FF00', '#32CD32'],
  level2: ['#0000FF', '#1E90FF'],
  level3: ['#FF00FF', '#FF69B4'],
};

const TreeScreen = () => {
  const navigation = useNavigation();
  const { setIsLoading } = useContext(AppContext);
  const { theme: rneTheme } = useThemeContext();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const toggleExpanded = (key) => {
    setExpandedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const fetchFamilyData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("access");
      const peopleId = await AsyncStorage.getItem("people_id");
      if (token && peopleId) {
        const response = await AxiosInstance().get("https://api.lehungba.com/api/tree/");
        const data = response.data;

        // Set the highest-level ancestors as the initial data
        const combinedFamilyMembers = [
          { title: data.paternal_tree.title, key: 'paternal_tree' },
          { ...data.paternal_tree.relationships[0], type: 'paternal', level: 0, key: 'paternal_ancestor' },
          { title: data.maternal_tree.title, key: 'maternal_tree' },
          { ...data.maternal_tree.relationships[0], type: 'maternal', level: 0, key: 'maternal_ancestor' }
        ];

        setFamilyMembers(combinedFamilyMembers);
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

  const renderMember = (member, level, parentKey) => {
    const memberKey = `${parentKey}-${member.full_name_vn}`;

    const isExpanded = expandedKeys.includes(memberKey);

    return (
      <View key={memberKey} style={{ marginLeft: level > 0 ? 20 : 0 }}>
        <View style={styles.memberContainer}>
          <TouchableOpacity style={styles.memberRow} onPress={() => toggleExpanded(memberKey)}>
            <LinearGradient
              colors={gradientColors[`level${level}`]}
              style={styles.gradientLine}
            />
            <View style={styles.profileColumn}>
              {member.profile_picture ? (
                <Image
                  source={{ uri: member.profile_picture }}
                  style={styles.profilePicture}
                />
              ) : (
                <MaterialCommunityIcons
                  name={member.gender ? "account" : "account-outline"}
                  size={40}
                  color={gradientColors[`level${level}`][0]}
                />
              )}
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.memberName}>{member.full_name_vn}</Text>
              <Text style={styles.memberBirthDate}>{member.birth_date}</Text>
              <Text style={styles.memberRelationship}>{member.relationship}</Text>
            </View>
            {member.children && member.children.length > 0 && (
              <MaterialCommunityIcons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        {isExpanded && member.spouse && (
          <View style={{ marginLeft: 20 }}>
            <View style={styles.memberContainer}>
              <View style={styles.memberRow}>
                <LinearGradient
                  colors={gradientColors[`level${level + 1}`]}
                  style={styles.gradientLine}
                />
                <View style={styles.profileColumn}>
                  {member.spouse.profile_picture ? (
                    <Image
                      source={{ uri: member.spouse.profile_picture }}
                      style={styles.profilePicture}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={member.spouse.gender ? "account" : "account-outline"}
                      size={40}
                      color={gradientColors[`level${level + 1}`][0]}
                    />
                  )}
                </View>
                <View style={styles.detailsColumn}>
                  <Text style={styles.memberName}>{member.spouse.full_name_vn}</Text>
                  <Text style={styles.memberBirthDate}>{member.spouse.birth_date}</Text>
                  <Text style={styles.memberRelationship}>{member.spouse.relationship}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {isExpanded && member.children && member.children.map((child) =>
          renderMember(child, level + 1, memberKey)
        )}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.title) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      );
    }

    return renderMember(item, item.level, item.key);
  };

  return (
    <>
      <AppHeader back title="Gia Đình Nội & Ngoại" />
      <FlatList
        data={familyMembers}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </>
  );
};

export default TreeScreen;
