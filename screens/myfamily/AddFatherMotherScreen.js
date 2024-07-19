import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Provider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import PersonInfoForm from "../components/PersonInfoForm";
import RegisterMemberForm from "./RegisForm";
import AppHeader from "../../components/AppHeader";
import { defaultPeople } from "./Data";
import AppFormDateInput from "../../components/FormDateInput";
import { AppContext } from "../../AppContext";
import AxiosInstance from "../../network/AxiosInstance";
import { useThemeContext } from "../../ThemeContext";
const AddFatherMotherScreen = () => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const getTittleByType = (type) => {
    if (type == 1) {
      return {
        mother: "Mẹ",
        father: "Cha",
        tittle: "Thêm thông tin về cha mẹ",
        link: "people/motherfather/",
      };
    }
    if (type == 2) {
      return {
        mother: "Bà Ngoại",
        father: "Ông Ngoại",
        tittle: "Thêm thông tin về ông bà ngoại",
        link: "people/maternalgrandmotherfather/",
      };
    }
    return {
      mother: "Bà Nội",
      father: "Ông Nội",
      tittle: "Thêm thông tin về ông bà nội",
      link: "people/grandmotherfather/",
    };
  };
  const route = useRoute();
  const { father, mother, marriageDate, type } = route?.params ?? {
    father: defaultPeople,
    mother: defaultPeople,
    marriageDate: "",
    type: 1,
  };
  const [fatherData, setFather] = useState(father || defaultPeople);
  const [motherData, setMother] = useState(mother || defaultPeople);
  const [marriageDateData, setMarriageDate] = useState(marriageDate);
  const validateData = () => {
    const errors = [];

    if (!fatherData.full_name_vn.trim()) {
      errors.push(
        `Tên của ${getTittleByType(type).father} không được để trống`
      );
    }

    if (!fatherData.birth_date) {
      errors.push(
        `Ngày sinh của ${getTittleByType(type).father} không được để trống`
      );
    }

    if (!motherData.full_name_vn.trim()) {
      errors.push(
        `Tên của ${getTittleByType(type).mother} không được để trống`
      );
    }

    if (!motherData.birth_date) {
      errors.push(
        `Ngày sinh của ${getTittleByType(type).mother} không được để trống`
      );
    }

    if (!marriageDateData) {
      errors.push("Ngày cưới không được để trống");
    }

    return errors;
  };

  const { setIsLoading } = useContext(AppContext);
  const handleSubmit = async () => {
    const validationErrors = validateData();

    if (validationErrors.length > 0) {
      Alert.alert(
        "Lỗi",
        validationErrors.join("\n"),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      setIsLoading(true);
      try {
        const data = {
          husband: {
            ...fatherData,
            gender: true,
          },
          wife: {
            ...motherData,
            gender: false,
          },
          marriage_date: marriageDateData,
        };
        const rs = await AxiosInstance().post(getTittleByType(type).link, data);
        console.log(rs);
        if (rs?.spouse_relationship?.husband) {
          navigation.navigate("UploadImageScreen3", {
            title1: `Ảnh ${getTittleByType(type).father}`,
            id1: rs.spouse_relationship.husband.people_id,
            title2: `Ảnh ${getTittleByType(type).mother}`,
            id2: rs.spouse_relationship.wife.people_id,
          });
        } else {
          navigation.navigate("UploadImageScreen3", {
            title1: `Ảnh ${getTittleByType(type).father}`,
            id1: rs.data.husband.people_id,
            title2: `Ảnh ${getTittleByType(type).mother}`,
            id2: rs.data.wife.people_id,
          });
        }
        Alert.alert("Thành công", "Thêm thông tin thành công");
      } catch (err) {
        console.log(
          err
        );
        Alert.alert("Lỗi", "Người dùng đã có " + getTittleByType(type).father);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Provider>
      <AppHeader
        right={{
          icon: "save",
          onPress: handleSubmit,
        }}
        back
        title={`${getTittleByType(type).tittle}`}
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <PersonInfoForm
          title={`Thông tin về ${getTittleByType(type).father}`}
          person={fatherData}
          setPerson={setFather}
        />
        <View
          style={[
            styles.marriageDateSection,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <AppFormDateInput
            title={"Ngày cưới"}
            value={marriageDateData}
            onSaveText={setMarriageDate}
          />
        </View>
        <PersonInfoForm
          setPerson={setMother}
          title={`Thông tin về ${getTittleByType(type).mother}`}
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
