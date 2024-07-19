import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Modal from "react-native-modal";

const AddFamilyCenterScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setShowNoResults(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setShowNoResults(false);
    if (query.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.lehungba.com/api/people/search-spouse/?search=${query}`
        );
        setSearchResults(response.data.results.data);
        if (response.data.results.data.length === 0) {
          setTimeout(() => {
            setShowNoResults(true);
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectParent = (parent) => {
    const father = parent.husband;
    const mother = parent.wife;
    const marriageDate = parent.marriage_date;
    navigation.navigate("AddFatherMotherScreen", {
      father,
      mother,
      marriageDate,
      type:1
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Thêm thành viên gia đình</Text>
      </View>
      <View style={styles.familyContainer}>
        <FamilyMember
          label="Ông bà"
          onPress={() => navigation.navigate("AddFatherMotherScreen",{
            type:3,
            marriage_date:""
          })}
        />
        <FamilyMember label="Cha mẹ" onPress={handleFatherMotherPress} />
        <CurrentUser name="Lê Nguyên Kim Sa" birthDate="02-04-1982" />
        <FamilyMember
          label="Vợ"
          onPress={() =>
            navigation.navigate("AddspouseScreen", {
              gender: false,
              nationally: "Việt Nam",
            })
          }
        />
        <FamilyMember
          label="Con"
          onPress={() => navigation.navigate("AddChildScreen")}
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tìm cha mẹ</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length >= 3 &&
          searchResults.length === 0 &&
          showNoResults ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  toggleModal();
                  navigation.navigate("AddFatherMotherScreen",{
                    type:1,
                    marriage_date:""
                  });
                }}
              >
                <Text style={styles.addButtonText}>Tạo mới cha mẹ</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.husband.people_id.toString()}
              renderItem={renderItem}
              style={styles.resultsList}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Đóng</Text>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  familyContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
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
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
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

export default AddFamilyCenterScreen;
