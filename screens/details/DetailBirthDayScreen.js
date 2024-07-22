import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../AppContext";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext";
function getSiblingsList(siblings) {
  const types = {
    older_brothers: "Anh",
    younger_brothers: "Em trai",
    older_sisters: "Chị",
    younger_sisters: "Em gái",
  };

  return Object.entries(siblings).flatMap(([key, value]) =>
    value.map((sibling) => ({
      name: sibling.full_name_vn,
      id: sibling.people_id,
      type: types[key],
      profile_picture: sibling.profile_picture,
    }))
  );
}
const DetailScreen = () => {
  const [data, setData] = React.useState([]);
  const [family, setFamily] = React.useState([]);
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  const { setIsLoading } = useContext(AppContext);
  const [listLoading, setListLoading] = React.useState(false);
  const { id } = useRoute().params;
  console.log(id);
  const getFamily = async () => {
    try {
      const res = await AxiosInstance().get(`/people/?people_id=${id}`);
      const siblings = res.siblings;
      const siblingsList = getSiblingsList(siblings);
      setFamily({
        ...res,
        siblings: siblingsList,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("people/" + id + "/");
      setData(res);
      getFamily();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppHeader title={data.full_name_vn} back />
      <View style={styles.container}>
        <ListInfo data={data} familyData={family} />
      </View>
    </View>
  );
};
const HeaderData = ({ data }) => {
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        source={{
          uri: data.profile_picture
            ? data.profile_picture
            : APP_CONSTANTS.defaultAvatar,
        }}
        style={styles.image}
      />
      <Text style={styles.textName}>{data.full_name_vn}</Text>
      <View style={styles.line} />
    </View>
  );
};
const ListInfo = ({ data, familyData }) => {
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  const isHasSpouse = familyData?.spouse_relationships?.length > 0;
  let spouse, children, parent;
  if (isHasSpouse) {
    spouse = !data.gender
      ? familyData?.spouse_relationships[0].husband
      : familyData?.spouse_relationships[0].wife;
    children = familyData?.spouse_relationships[0]?.children;
  }
  const isHasParent = familyData?.parent_relationships?.length > 0;
  if (isHasParent) {
    parent = familyData?.parent_relationships[0];
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
      }}
    >
      <HeaderData data={data} />
      {!data.is_alive && (
        <InfoItem title={"Đã qua đời"} icon="pulse" textColor="#909090" />
      )}
      <InfoItem title={data.birth_date} icon="calendar" textColor="#909090" />
      {data?.place_of_birth?.address_line && (
        <InfoItem
          title={data?.place_of_birth?.address_line}
          icon="location"
          textColor="#909090"
        />
      )}
      <InfoItem
        title={data.current_age + " tuổi"}
        icon="accessibility"
        textColor="#909090"
      />
      <InfoItem
        title={data.gender ? "Nam" : "Nữ"}
        icon="transgender"
        textColor="#909090"
      />
      <InfoItem
        title={data.marital_status ? "Đã kết hôn" : "Chưa kết hôn"}
        icon="heart-circle"
        textColor="#909090"
      />

      {data.social_media_links && (
        <InfoItem title={data.occupation} icon="link" textColor="#909090" />
      )}
      {data.nationality && (
        <InfoItem
          title={data.nationality ?? "Chưa chia sẻ"}
          icon="earth"
          textColor="#909090"
        />
      )}
      <Text style={styles.detail}>Thành viên trong gia đình</Text>

      <ScrollView
        style={{
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {parent && (
          <>
            <ItemFamily
              title={"Cha"}
              name={parent.father.full_name_vn}
              image={parent.father.profile_picture}
              id={parent.father.people_id}
            />
            <ItemFamily
              title={"Mẹ"}
              name={parent.mother.full_name_vn}
              image={parent.mother.profile_picture}
              id={parent.mother.people_id}
            />
          </>
        )}
        {spouse && (
          <ItemFamily
            title={data.gender ? "Vợ" : "Chồng"}
            name={spouse.full_name_vn}
            image={spouse.profile_picture}
            id={spouse.people_id}
          />
        )}
        {children &&
          children.map((item) => {
            return (
              <ItemFamily
                key={item.child.people_id}
                title="Con"
                name={item.child.full_name_vn}
                image={item.child.profile_picture}
                id={item.child.people_id}
              />
            );
          })}
      </ScrollView>
      {familyData?.siblings?.length > 0 && (
        <Text
          style={{
            ...styles.detail,
            marginTop: 20,
            fontSize: 14,
            fontStyle: "italic",
          }}
        >
          Anh chị em ruột
        </Text>
      )}
      <ScrollView
        style={{
          flex: 1,
          marginTop: 20,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {familyData?.siblings?.map((item) => {
          console.log(item);
          return (
            <ItemFamily

              key={item.id}
              title={item.type}
              name={item.name}
              image={item.profile_picture}
              id={item.id}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};
const ItemFamily = ({ name, id, image, title }) => {
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("DetailBirthDay", {
          id: id,
        });
      }}
      style={{
        alignItems: "center",
        minWidth: 120,
        marginHorizontal: 10,
        gap: 5,
      }}
    >
      <Image
        source={{ uri: image ?? APP_CONSTANTS.defaultAvatar }}
        style={{ width: 80, height: 80, borderRadius: 50 }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          color: theme.colors.placeHolder,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 5,
          color: theme.colors.text,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
const useStyle = (theme) =>
  StyleSheet.create({
    detail: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "left",
      color: theme.colors.text,
    },
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginVertical: 20,
      borderWidth: 1,
      borderColor: "#f4f4f4",
    },
    textName: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    line: {
      width: "100%",
      height: 6,
      backgroundColor: "#f4f4f4",
      marginVertical: 10,
      borderRadius: 3,
    },
  });
export const InfoItem = ({ title, onPress, icon, textColor }) => {
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        width: "100%",
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={textColor ?? "black"} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginLeft: 15,
          color: theme.colors.text,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export default DetailScreen;
