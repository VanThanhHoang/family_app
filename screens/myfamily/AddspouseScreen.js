import React, { useContext } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { Provider } from "react-native-paper";
import RegisterMemberForm from "./RegisForm";
import AppHeader from "../../components/AppHeader";
import PersionInfoForm from "../components/PersonInfoForm";
import { useRoute } from "@react-navigation/native";
import { defaultPeople } from "./Data";
import { AppContext } from "../../AppContext";
import AxiosInstance from "../../network/AxiosInstance";

const AddspouseScreen = ({navigation}) => {
  const route = useRoute();
  const { gender, nationality } = route.params;
  const [personInfo, setPersonInfo] = React.useState({
    ...defaultPeople,
    gender,
    nationality,
  });
  const validate = (data) => {
    // require name,birth_date
    if (!data.full_name_vn) {
      Alert.alert("Lỗi", "Vui lòng nhập tên");
      return false;
    }
    if (!data.birth_date) {
      Alert.alert("Lỗi", "Vui lòng nhập ngày sinh");
      return false;
    }
  return true;
  };
  const {setIsLoading}=useContext(AppContext)
  const addSpouse=async (data)=>{
    if(validate(data)){
      try {
        setIsLoading(true);
        delete personInfo.place_of_birth;
        delete personInfo.place_of_death;
        const data = await AxiosInstance().post("people/husbandwife/", {
          wife:personInfo,
          marriage_date:personInfo.marriage_date
        });
        setPersonInfo(defaultPeople)
        navigation.navigate("UploadImageScreen2", {
          id:data.data.wife.people_id,
          title:"Thêm ảnh đại diện vợ",
        })
        Alert.alert("Thành công", "Thêm thông tin thành công");
      } catch (err) {
        console.log({ ...err });
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau");
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <Provider>
      <AppHeader right={{
        icon:'save',
        onPress:()=>{
          addSpouse(personInfo);
        }
      }} back title={`Thêm thông tin ${!gender ? "vợ" : "chồng"}`} />
      <ScrollView contentContainerStyle={styles.container}>
        <PersionInfoForm
            title={`${gender ? "Thông tin về chồng" : "Thông tin về vợ"}`}
            person={personInfo}
            setPerson={setPersonInfo}
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

export default AddspouseScreen;
