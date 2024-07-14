import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Checkbox, Button, Menu, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/AppHeader";
import RegisterMemberForm from "./RegisForm";
import PersonInfoForm from "../components/PersonInfoForm";
import { defaultPeople } from "./Data";

const AddChildScreen = () => {
  const [childInfo, setChildInfo] = useState(defaultPeople);
  return (
    <Provider>
      <AppHeader back title={"Thêm thông tin về con"} />
      <ScrollView contentContainerStyle={styles.container}>
        <PersonInfoForm
          person={childInfo}
          setPerson={setChildInfo}
          title={"Con"}
        />
        <RegisterMemberForm />
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E0E0E0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusText: {
    marginRight: 5,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  genderText: {
    marginLeft: 5,
    fontSize: 16,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 15,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
  },
  registerText: {
    flex: 1,
    marginLeft: 8,
  },
});

export default AddChildScreen;
