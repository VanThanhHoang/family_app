import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Modal from "react-native-modal";
import { AppContext } from "../../AppContext";
import Icon from "react-native-vector-icons/MaterialIcons"; // Sử dụng thư viện icon
import { LinearGradient } from "expo-linear-gradient";

const MyfamilyScreen = () => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectParent = (parent) => {
    const father = parent.husband;
    const mother = parent.wife;
    const marriageDate = parent.marriage_date;
    navigation.navigate("AddFatherMotherScreen", {
      father,
      mother,
      marriageDate,
      type: 1,
    });
    toggleModal();
  };

  const processFamilyData = (data) => {
    const categories = ["maternal_grandparents", "paternal_grandparents", "user_parents"];
    let members = [];

    categories.forEach((category) => {
      if (data[category] && data[category].relationships) {
        const processedMembers = data[category].relationships.map(person => ({
          people_id: person.people_id,
          full_name_vn: person.full_name_vn,
          profile_picture: person.profile_picture,
          birth_date: person.birth_date,
          gender: person.gender,
          phone_number: person.phone_number,
          marital_status: person.marital_status,
          is_alive: person.is_alive,
          saint: person.saint,
          religion: person.religion,
          relationship: person.relationship,
          title: data[category].title
        }));
        members = [...members, ...processedMembers];
      }
    });

    return members;
  };

  const fetchFamilyData = async () => {
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
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFamilyData();
    });
    return unsubscribe;
  }, []);

  const RenderFamilyMember = ({ item }) => {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.memberTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.memberDetailContainer}
          onPress={() =>
            navigation.navigate("DetailBirthDay", { id: item.people_id })
          }
        >
          <Image
            source={
              item.profile_picture
                ? { uri: item.profile_picture }
                : item.gender
                ? require("../../assets/father.png")
                : require("../../assets/mother.png")
            }
            style={styles.profilePicture}
          />
          <View style={styles.textContainer}>
            <Text style={styles.memberName}>{item.full_name_vn}</Text>
            <Text style={styles.birthDate}>{item.birth_date}</Text>
            <Text style={styles.relationship}>{item.relationship}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        handleSelectParent(item);
      }}
    >
      <View style={styles.resultContent}>
        <Image
          source={
            item.husband.profile_picture
              ? { uri: item.husband.profile_picture }
              : require("../../assets/father.png")
          }
          style={styles.avatar}
        />
        <Image
          source={
            item.wife.profile_picture
              ? { uri: item.wife.profile_picture }
              : require("../../assets/mother.png")
          }
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.resultText}>{item.husband.full_name_vn}</Text>
          <Text style={styles.resultText}>{item.wife.full_name_vn}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      const response = await AxiosInstance().get(`myfamily/search/?query=${query}`);
      const results = response.data;
      setSearchResults(results);
      setShowNoResults(results.length === 0);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

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
        keyExtractor={(item, index) =>
          item?.people_id?.toString() || index + new Date().getTime().toString()
        }
        renderItem={({ item }) => {
          return <RenderFamilyMember item={item} />;
        }}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nhập Tên Ba Hoặc Mẹ </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name..."
            value={searchQuery}
            onChangeText={(text) => {
              handleSearch(text);
            }}
          />
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.husband.people_id.toString()}
            renderItem={renderItem}
            style={styles.resultsList}
          />
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  memberContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  memberTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  memberDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  birthDate: {
    fontSize: 12,
    color: "#555",
  },
  relationship: {
    fontSize: 14,
    color: "#777",
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  noResultsContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  noResultsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultsList: {
    width: "100%",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  resultText: {
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MyfamilyScreen;
