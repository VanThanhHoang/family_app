import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Menu } from "react-native-paper";
import AppFormInput from "../../components/FormInput";
import ItemToggle from "../friend/ItemToogle";
import { useThemeContext } from "../../ThemeContext";
import { Image } from "react-native";
import { APP_CONSTANTS } from "../../helper/constant";
import AppFormDateInput from "../../components/FormDateInput";
import { AppContext } from "../../AppContext";

const PersonInfoForm = ({ title, person, setPerson }) => {
  const { theme } = useThemeContext();
  const [religionVisible, setReligionVisible] = useState(false);
  const [saintVisible, setSaintVisible] = useState(false);
  const [eduVisible, setEduVisible] = useState(false);
  const getEdu = (id) => {
    if (!id) return "";
    return dropdownData?.education_levels[id - 1]?.level_vn;
  };
  const getReigion = () => {
    if (person.religion === "") return "Tôn giáo *";
    if (person.religion === "catholic") return "Công giáo";
    if (person.religion === "buddhist") return "Phật giáo";
    if (person.religion === "protestant") return "Tin Lành";
    if (person.religion === "other") return "Đạo khác";
  };
  const { dropdownData } = useContext(AppContext);
  const getStaint = (id) => {
    if (!id) return "";
    return dropdownData?.saints[id - 1]?.name;
  };

  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {title}
      </Text>
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
              uri: person?.profile_picture || APP_CONSTANTS.defaultAvatar,
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
          onPress={() => setPerson({ ...person, is_alive: !person.is_alive })}
          icon={"pulse"}
          color={theme.colors.text}
          colorChecked="#ff1694"
          isChecked={person.is_alive}
          textChecked="Còn sống"
          textUnchecked="Đã mất"
        />
        {title === "Con" && (
          <ItemToggle
            title=""
            onPress={() => setPerson({ ...person, gender: !person.gender })}
            icon={"transgender"}
            color={"#ff1694"}
            colorChecked="blue"
            isChecked={person.gender}
            textChecked="Nam"
            textUnchecked="Nữ"
          />
        )}
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
              <Text>{getReigion() || "Tôn giáo *"}</Text>
              <Icon name="caret-down" size={20} />
            </TouchableOpacity>
          }
        >
          {dropdownData?.religions_people?.map((item, index) => (
            <Menu.Item
              key={index}
              title={item.label}
              onPress={() => {
                setPerson({ ...person, religion: item.value });
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
              <Text>{getStaint(person?.saint) || "Tên Thánh"}</Text>
              <Icon name="caret-down" size={20} />
            </TouchableOpacity>
          }
        >
          {dropdownData?.saints?.map((item, index) => (
            <Menu.Item
              key={index}
              title={item.name}
              onPress={() => {
                setPerson({ ...person, saint: index + 1 });
                setSaintVisible(false);
              }}
            />
          ))}
          <View style={{ height: 200 }} />
        </Menu>
      </View>
      {title == "Thông tin về chồng" ||
        (title == "Thông tin về vợ" && (
          <View style={styles.marriageDateSection}>
            <AppFormDateInput
              title={"Ngày cưới"}
              value={person.marriage_date || ""}
              onSaveText={(value) =>
                setPerson({ ...person, marriage_date: value })
              }
            />
          </View>
        ))}
      {title === "Con" && (
        <Menu
          visible={eduVisible}
          onDismiss={() => setEduVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setEduVisible(true)}
              style={styles.dropdown}
            >
              <Text>
                {getEdu(person?.education_level) || "Trình độ học vấn"}
              </Text>
              <Icon name="caret-down" size={20} />
            </TouchableOpacity>
          }
        >
          {dropdownData?.education_levels?.map((item, index) => (
            <Menu.Item
              key={index}
              title={item.level_vn}
              onPress={() => {
                setPerson({ ...person, education_level: index + 1 });
                setEduVisible(false);
              }}
            />
          ))}
          <View style={{ height: 200 }} />
        </Menu>
      )}
      <AppFormInput
        title="Họ và tên"
        onTextChange={(value) => setPerson({ ...person, full_name_vn: value })}
        value={person.full_name_vn || ""}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppFormDateInput
          onSaveText={(value) => {
            console.log(value);
            setPerson({ ...person, birth_date: value });
          }}
          title={"Ngày sinh"}
          value={person.birth_date || ""}
        />
        <AppFormInput
          title="Quốc tịch"
          onTextChange={(value) => setPerson({ ...person, nationality: value })}
          value={person.nationality || ""}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <AppFormInput
          title="Sở thích"
          onTextChange={(value) => setPerson({ ...person, hobby: value })}
          value={person.hobby || ""}
        />
        <AppFormInput
          title="Nghề nghiệp"
          onTextChange={(value) => setPerson({ ...person, occupation: value })}
          value={person.occupation || ""}
        />
      </View>
      <AppFormInput
        title="Địa chỉ"
        onTextChange={(value) => setPerson({ ...person, address: value })}
        value={person.address || ""}
      />

      {!person?.is_alive && (
        <>
          <AppFormDateInput
            onSaveText={(value) => setPerson({ ...person, death_date: value })}
            title={"Ngày mất"}
            value={person.death_date || ""}
          />
          <AppFormInput
            title="Lý do"
            onTextChange={(value) =>
              setPerson({ ...person, death_reason: value })
            }
            value={person.death_reason || ""}
          />
          <AppFormInput
            title="Địa chỉ mất"
            onTextChange={(value) =>
              setPerson({ ...person, death_place: value })
            }
            value={person.death_place || ""}
          />
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

export default PersonInfoForm;
