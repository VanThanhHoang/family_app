import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Provider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import PersonInfoForm from "../components/PersonInfoForm";
import RegisterMemberForm from "./RegisForm";
import AppHeader from "../../components/AppHeader";
import { defaultPeople } from "./Data";
import AppFormDateInput from "../../components/FormDateInput";
const AddFatherMotherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { father, mother, marriageDate } = route?.params ?? {
    father: defaultPeople,
    mother: defaultPeople,
    marriageDate: "",
  };
  const [fatherData, setFather] = useState(father);
  const [motherData, setMother] = useState(mother);
  const [marriageDateData, setMarriageDate] = useState(marriageDate);
  const defaultEducation = {
    level: "unknow",
  };
    fatherData.education_level = defaultEducation;
    motherData.education_level = defaultEducation;
  console.log({
    husband: fatherData,
    wife: motherData,
    marriageDate: marriageDateData,
  });
  return (
    <Provider>
      <AppHeader back title={"Thêm thông tin về cha mẹ"} />
      <ScrollView contentContainerStyle={styles.container}>
        <PersonInfoForm
          title={"Thông tin về ba"}
          person={fatherData}
          setPerson={setFather}
        />
        <View style={styles.marriageDateSection}>
          <AppFormDateInput
            title={"Ngày cưới"}
            value={marriageDateData}
            onSaveText={setMarriageDate}
          />
        </View>
        <PersonInfoForm
          setPerson={setMother}
          title={"Thông tin về mẹ"}
          person={motherData}
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
