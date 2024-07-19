import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import Modal from "react-native-modal";
import { AppContext } from "../../AppContext";
import Icon from "react-native-vector-icons/MaterialIcons"; // Sử dụng thư viện icon
import ConfirmDelete from "../../components/ComfirmDelete";

const MyfamilyScreen = () => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [parentsEmpty, setParentsEmpty] = useState(false);
  const [userGender, setUserGender] = useState(null);
  const [userMaritalStatus, setUserMaritalStatus] = useState(true);
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
        const response = await AxiosInstance().get(
          `people/search-spouse/?search=${query}`
        );
        setSearchResults(response.results.data);
        if (response.results.data.length === 0) {
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
      type: 1,
    });
    toggleModal();
  };

  const handleFatherMotherPress = () => {
    toggleModal();
  };

  const fetchFamilyData = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      const peopleId = await AsyncStorage.getItem("people_id");
      if (token && peopleId) {
        const response = await AxiosInstance().get("myfamily/relationship/");
        const data = response.data;
        console.log("Family data:", data);
        const parents = [
          {
            ...data.user_parents.father,
            relation: data.user_parents.father_relationship,
            relationship_id: data.user_parents.father_relationship_id,
          },
          {
            ...data.user_parents.mother,
            relation: data.user_parents.mother_relationship,
            relationship_id: data.user_parents.mother_relationship_id,
          },
        ];
        if (!data.user_parents?.people_id) {
          setParentsEmpty(true);
        }
        const spouse = data.user_spouse
          ? [
              {
                ...data.user_spouse.spouse,
                relation: data.user_spouse.relationship,
                relationship_id: data.user_spouse.relationship_id,
              },
            ]
          : [];
        if (spouse.length == 0) {
          setUserMaritalStatus(false);
        }
        const children = data.user_children.children.map((child) => ({
          ...child,
          relation: "Con",
          relationship_id: child.relationship_id,
        }));

        const siblings = data.user_siblings.siblings.map((sibling) => ({
          ...sibling,
          relation: sibling.relationship,
          relationship_id: sibling.relationship_id,
        }));

        const grandparents = [
          {
            ...data.maternal_grandparents.maternal_grandfather,
            relation:
              data.maternal_grandparents.maternal_grandfather_relationship,
            relationship_id:
              data.maternal_grandparents.maternal_grandfather_relationship_id,
          },
          {
            ...data.maternal_grandparents.maternal_grandmother,
            relation:
              data.maternal_grandparents.maternal_grandmother_relationship,
            relationship_id:
              data.maternal_grandparents.maternal_grandmother_relationship_id,
          },
          {
            ...data.paternal_grandparents.paternal_grandfather,
            relation:
              data.paternal_grandparents.paternal_grandfather_relationship,
            relationship_id:
              data.paternal_grandparents.paternal_grandfather_relationship_id,
          },
          {
            ...data.paternal_grandparents.paternal_grandmother,
            relation:
              data.paternal_grandparents.paternal_grandmother_relationship,
            relationship_id:
              data.paternal_grandparents.paternal_grandmother_relationship_id,
          },
        ];

        const familyMembers = [
          ...grandparents,
          ...parents,
          ...spouse,
          ...children,
          ...siblings,
        ];
        setFamilyMembers(familyMembers);
        setParentsEmpty(parents.length === 0);
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
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFamilyData();
    });
    return unsubscribe;
  }, []);
  const RenderFamilyMember = ({ item }) => {
    console.log(item);
    const onDelete = async () => {};
    const [visible, setVisible] = useState(false);
    return (
      <TouchableOpacity
        style={styles.memberContainer}
        onPress={
          () => {}
          //navigation.navigate("DetailScreen", { id: item.people_id })
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
          {item.relation && (
            <Text style={styles.relation}>{item.relation}</Text>
          )}
          <Text style={styles.birthDate}>{item.birth_date}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setVisible(true);
          }}
        >
          <Icon name="delete" size={20} color="gray" />
        </TouchableOpacity>
        <ConfirmDelete
          name={item.full_name_vn}
          visible={visible}
          onConfirm={() => {
            onDelete();
            setVisible(false);
          }}
          onClose={() => {
            setVisible(false);
          }}
        />
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <AppHeader back title="Thành viên gia đình" />
      {parentsEmpty && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleFatherMotherPress}
        >
          <Icon name="add-circle" size={24} color="white" />
          <Text style={styles.addButtonText}>Father & Mother</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddspouseScreen", {
            gender: userGender ? false : true, // Giới tính ngược lại của người dùng
            nationality: "Việt Nam ",
          })
        }
      >
        <Icon name="add-circle" size={24} color="white" />
        <Text style={styles.addButtonText}>
          {userGender ? "Add Wife" : "Add Husband"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddChildScreen")}
      >
        <Icon name="add-circle" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Child</Text>
      </TouchableOpacity>
      <FlatList
        data={familyMembers}
        keyExtractor={(item, index) =>
          item?.people_id?.toString() || index + new Date().getTime().toString()
        }
        renderItem={({ item }) => {
          return item.relation && item.relationship_id ? (
            <RenderFamilyMember item={item} />
          ) : null;
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
          {searchQuery.length >= 3 &&
          searchResults.length === 0 &&
          showNoResults ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                Không có ba mẹ phù hợp với từ khoá của bạn
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  toggleModal();
                  navigation.navigate("AddFatherMotherScreen", {
                    type: 1,
                  });
                }}
              >
                <Text style={styles.addButtonText}>TẠO MỚI</Text>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  relation: {
    fontSize: 14,
    color: "#777",
  },
  birthDate: {
    fontSize: 12,
    color: "#555",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 80,
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
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
  editButton: {
    alignSelf: "flex-start",
    marginHorizontal: 5,
  },
});

export default MyfamilyScreen;
