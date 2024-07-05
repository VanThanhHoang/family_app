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
import { useNavigation, useRoute } from "@react-navigation/native";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";

const DetailScreen = () => {
  const [data, setData] = React.useState([]);
  const [family, setFamily] = React.useState([]);
  const { setIsLoading } = useContext(AppContext);
  const [listLoading, setListLoading] = React.useState(false);
  const { id } = useRoute().params;
  const getFamily = async () => {
    try {
      const res = await AxiosInstance().get(`/people/?people_id=${id}`);
      setFamily(res);
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader title={data.full_name_vn} back />
      <View style={styles.container}>
        <ListInfo data={data} familyData={family} />
      </View>
    </View>
  );
};
const HeaderData = ({ data }) => {
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.detail}>Thông tin chi tiết</Text>
        <Text
          style={[
            styles.detail,
            {
              color: "#198754",
              fontWeight: "700",
              fontSize: 16,
            },
          ]}
        >
          Xem chi tiết
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ListInfo = ({ data, familyData }) => {
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
      style={{
        width: "100%",
        flex: 1,
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
    </ScrollView>
  );
};
const ItemFamily = ({ name, id, image, title }) => {
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
          color: "#909090",
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
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  detail: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
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
  },
  line: {
    width: "100%",
    height: 6,
    backgroundColor: "#f4f4f4",
    marginVertical: 10,
    borderRadius: 3,
  },
});
const InfoItem = ({ title, onPress, icon, textColor }) => {
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
          color: "black",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
export default DetailScreen;
