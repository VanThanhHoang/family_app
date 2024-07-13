import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Modal from "react-native-modal";
import AppHeader from "../../components/AppHeader";

const AddFamilyCenterScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(
          `https://api.lehungba.com/api/people/search-spouse/?search=${query}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectParent = (parent) => {
    const father = parent;
    const mother = parent.spouse;
    const marriageDate = parent.marriage_date;
    navigation.navigate("AddFatherMotherScreen", {
      father,
      mother,
      marriageDate,
    });
    toggleModal();
  };

  const handleFatherMotherPress = () => {
    toggleModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelectParent(item)}
    >
      <Text style={styles.resultText}>{item.full_name_vn}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <AppHeader back title={"Thêm thành viên gia đình"} />
      </View>

      <View style={styles.familyContainer}>
        <FamilyMember
          label="GrandFather & GrandMother"
          onPress={() => navigation.navigate("AddGrandFatherMotherScreen")}
        />
        <FamilyMember
          label="Father & Mother"
          onPress={handleFatherMotherPress}
        />
        <CurrentUser name="Lê Nguyên Kim Sa" birthDate="02-04-1982" />
        <FamilyMember
          label="Your Wife"
          onPress={() => navigation.navigate("AddspouseScreen")}
        />
        <FamilyMember
          label="Your Child"
          onPress={() => navigation.navigate("AddChildScreen")}
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Search Father or Mother</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.people_id.toString()}
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

const FamilyMember = ({ label, onPress }) => (
  <TouchableOpacity style={styles.familyMember} onPress={onPress}>
    <Icon name="plus-circle" size={30} color="#4CAF50" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const CurrentUser = ({ name, birthDate }) => (
  <View style={styles.currentUser}>
    <Icon name="user-circle" size={50} color="#9E9E9E" />
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.birthDate}>{birthDate}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  familyContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  familyMember: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  label: {
    marginLeft: 15,
    fontSize: 18,
  },
  currentUser: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  name: {
    marginLeft: 15,
    fontSize: 18,
  },
  birthDate: {
    marginLeft: 15,
    fontSize: 14,
    color: "#757575",
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
  },
  resultsList: {
    width: "100%",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddFamilyCenterScreen;
