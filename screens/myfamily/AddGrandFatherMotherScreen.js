import {

  StyleSheet,
  ScrollView,
} from "react-native";
import { Provider } from "react-native-paper";
import AppHeader from "../../components/AppHeader";
import PersonInfoForm from "../components/PersonInfoForm";
import RegisterMemberForm from "./RegisForm";

const AddGrandFatherMotherScreen = () => {
  return (
    <Provider>
      <AppHeader back title={"Thêm thông tin ông, bà nội"} />
      <ScrollView contentContainerStyle={styles.container}>
        <PersonInfoForm title={"Thông tin về ông nội"} />
        <PersonInfoForm title={"Thông tin về bà nội"} />
        <RegisterMemberForm/>
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
    marginLeft: 15,
  },
  statusText: {
    marginLeft: 5,
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

export default AddGrandFatherMotherScreen;
