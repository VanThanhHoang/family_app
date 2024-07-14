import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Menu } from "react-native-paper";
import AppFormInput from "../../components/FormInput";
import ItemToggle from "../friend/ItemToogle";
import { useThemeContext } from "../../ThemeContext";
import { RELIGION_CHOICES } from "../friend/data";
import { Image } from "react-native";
import { APP_CONSTANTS } from "../../helper/constant";
import AppFormDateInput from "../../components/FormDateInput";
const ChildForm = ({ title }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [religion, setReligion] = useState("");
  const [gender, setGender]=useState(false);
  const [saint, setSaint] = useState("");
  const [religionVisible, setReligionVisible] = useState(false);
  const [saintVisible, setSaintVisible] = useState(false);
  const { theme } = useThemeContext();
  const getReigion = () => {
    if (religion === "") return "Tôn giáo *";
    if (religion === "catholic") return "Công giáo";
    if (religion === "buddhist") return "Phật giáo";
    if (religion === "protestant") return "Tin Lành";
    if (religion === "other") return "Đạo khác";
    return religion;
  };
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.row}>
        <TouchableOpacity>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              marginRight: 10,
            }}
            source={{
              uri: APP_CONSTANTS.defaultAvatar,
            }}
          />
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "#fff",
              padding: 5,
              borderRadius: 50,
            }}
          >
            <Icon name="camera" />
          </View>
        </TouchableOpacity>
        <ItemToggle
          title=""
          onPress={() => setIsAlive(!isAlive)}
          icon={"pulse"}
          color={theme.colors.text}
          colorChecked="#ff1694"
          isChecked={isAlive}
          textChecked="Còn sống"
          textUnchecked="Đã mất"
        />
        {
          title === "Con" &&   <ItemToggle
          title=""
          onPress={() => setGender(!gender)}
          icon={"transgender"}
          color={'#ff1694'}
          colorChecked="#1a70ce"
          isChecked={gender}
          textChecked="Nam"
          textUnchecked="Nữ"
        />
        }
      </View>

      <View style={styles.dropdownContainer}>
        <Menu
          visible={religionVisible}
          onDismiss={() => setReligionVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setReligionVisible(true)}
              style={styles.dropdown}
            >
              <Text>{getReigion(religion) || "Tôn giáo *"}</Text>
              <Icon name="caret-down" size={20} />
            </TouchableOpacity>
          }
        >
          {RELIGION_CHOICES.map((item, index) => (
            <Menu.Item
              title={item.label}
              onPress={() => {
                setReligion(item.value);
                setReligionVisible(false);
              }}
            />
          ))}
        </Menu>
        <Menu
          visible={saintVisible}
          onDismiss={() => setSaintVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setSaintVisible(true)}
              style={styles.dropdown}
            >
              <Text>{saint || "Tên Thánh"}</Text>
              <Icon name="caret-down" size={20} />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => setSaint("Tên Thánh 1")}
            title="Tên Thánh 1"
          />
          <Menu.Item
            onPress={() => setSaint("Tên Thánh 2")}
            title="Tên Thánh 2"
          />
          <Menu.Item
            onPress={() => setSaint("Tên Thánh 3")}
            title="Tên Thánh 3"
          />
        </Menu>
      </View>

      <AppFormInput title="Họ và tên" onTextChange={() => {}} value="" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppFormDateInput onSaveText={() => {}} title={"Ngày sinh"} />
        <AppFormInput title="Quốc tịch" onTextChange={() => {}} value="" />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <AppFormInput title="Sở thích" onTextChange={() => {}} value="" />
        <AppFormInput title="Nghề nghiệp" onTextChange={() => {}} value="" />
      </View>
      <AppFormInput title="Địa chỉ" onTextChange={() => {}} value="" />

      {!isAlive && (
        <>
          <AppFormDateInput onSaveText={() => {}} title={"Ngày mất"} />
          <AppFormInput title="Lý do" onTextChange={() => {}} value="" />
          <AppFormInput title="Địa chỉ mất" onTextChange={() => {}} value="" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dropdownContainer: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
    padding: 10,
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    minWidth: 150,
    justifyContent: "space-between",
  },
});

export default ChildForm;