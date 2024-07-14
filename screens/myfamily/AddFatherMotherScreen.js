import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Provider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import PersonInfoForm from "../components/FatherMotherForm";
import RegisterMemberForm from "./RegisForm";
import AppHeader from "../../components/AppHeader";

const AddFatherMotherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fatherAlive, setFatherAlive] = useState(true);
  const [motherAlive, setMotherAlive] = useState(true);

  const [father, setFather] = useState({});
  const [mother, setMother] = useState({});
  const [marriageDate, setMarriageDate] = useState("");

  useEffect(() => {
    if (route.params) {
      const { father, mother, marriageDate } = route.params;
      if (father) {
        setFather(father);
        setFatherAlive(father.is_alive);
      }
      if (mother) {
        setMother(mother);
        setMotherAlive(mother.is_alive);
      }
      if (marriageDate) {
        setMarriageDate(marriageDate);
      }
    }
  }, [route.params]);

  return (
    <Provider>
      <AppHeader back title={"Thêm thông tin về cha mẹ"} />
      <ScrollView contentContainerStyle={styles.container}>
        <PersonInfoForm
          title={"Thông tin về ba"}
          person={father}
          setPerson={setFather}
          isAlive={fatherAlive}
          setIsAlive={setFatherAlive}
        />
        <View style={styles.marriageDateSection}>
          <Text style={styles.sectionTitle}>Thông tin ngày cưới</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập ngày cưới"
            value={marriageDate}
            onChangeText={setMarriageDate}
          />
        </View>
        <PersonInfoForm
          title={"Thông tin về mẹ"}
          person={mother}
          setPerson={setMother}
          isAlive={motherAlive}
          setIsAlive={setMotherAlive}
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
    padding: 16,
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
  marriageDateSection: {
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
    marginLeft: 15,
  },
  statusText: {
    marginRight: 5,
    fontSize: 16,
  },
  dropdownContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
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

export default AddFatherMotherScreen;
