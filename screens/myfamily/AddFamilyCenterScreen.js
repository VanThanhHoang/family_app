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
import Modal from "react-native-modal";
import AppHeader from "../../components/AppHeader";
import AxiosInstace from "../../network/AxiosInstance";
const AddFamilyCenterScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await AxiosInstace().get(`/people/search-spouse/?search=${query}`)
        setSearchResults(response.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectParent = (parent) => {
    navigation.navigate("AddFatherMotherScreen", {
      father: parent,
      mother: parent.spouse,
      marriageDate: parent.marriage_date,
    });
    toggleModal();
  };

  const familyMembers = [
    {
      label: "GrandFather & GrandMother",
      screen: "AddGrandFatherMotherScreen",
    },
    { label: "Father & Mother", onPress: toggleModal },
    { label: "Your Wife", screen: "AddspouseScreen" },
    { label: "Your Child", screen: "AddChildScreen" },
  ];

  return (
    <View style={styles.container}>
      <AppHeader back title={"Thêm thành viên gia đình"} />
      <View style={styles.familyContainer}>
        <CurrentUser name="Lê Nguyên Kim Sa" birthDate="02-04-1982" />

        {familyMembers.map((member, index) => (
          <FamilyMember
            key={index}
            label={member.label}
            onPress={() =>
              member.screen
                ? navigation.navigate(member.screen)
                : member.onPress()
            }
          />
        ))}
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
          contentContainerStyle={{
          }}
            data={searchResults}
            keyExtractor={(item) => item.people_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectParent(item)}
              >
                <Text style={styles.resultText}>{item.full_name_vn}</Text>
              </TouchableOpacity>
            )}
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
    paddingBottom: 130,
    height:300

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
