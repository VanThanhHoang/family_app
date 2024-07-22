import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { AppContext } from "../../AppContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import AxiosInstance from "../../network/AxiosInstance";
import AppHeader from "../../components/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
const DetailScreen = () => {
  const { setIsLoading } = useContext(AppContext);
  const { id } = useRoute().params;
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("/relationships/");
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader back title={`Gia đình ${data.full_name_vn}`} />
      <View style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            gap: 20,
            paddingTop: 30,
          }}
        >
          <ItemFamily
            isRoot
            gender={true}
            name={data.full_name_vn}
            id={data.people_id}
            title={"Chồng"}
          />
          <ItemFamily
            gender={false}
            isRoot
            name={data.spouse_name}
            id={data.people_id}
            title={"Vợ"}
          />
        </View>
        <View style={styles.line} />
        <Text style={styles.detail}>Các con trong gia đình</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              gap: 20,
              paddingTop: 30,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {data?.children &&
              data.children.map((item, index) => {
                console.log(item.gender);
                return (
                  <ItemFamily
                    image={item.profile_picture}
                    data={item}
                    key={index}
                    name={item.full_name_vn}
                    id={item.people_id}
                    title={"Con"}
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export const ItemFamily = ({
  name,
  id,
  image,
  title,
  data,
  isRoot,
  gender,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isRoot) {
          Alert.alert("Thông báo", "Bạn đang xem thông tin của gia đình này");
        } else {
          if (data.spouse_name == null) {
            Alert.alert("Thông báo", "Thành viên này chưa chưa lập gia đình");
          } else {
            navigation.push("DetailChildren", {
              data: data,
            });
          }
        }
      }}
      style={{
        alignItems: "center",
        minWidth: 120,
        marginHorizontal: 10,
        gap: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (image) {
            navigation.navigate("DetailImage", {
              link: image,
            });
          }
        }}
      >
        <Image
          source={
            image
              ? { uri: image }
              : gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={{
            width: 80,
            height: 80,
            borderRadius: 25,
          }}
        />
      </TouchableOpacity>
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
      {data?.spouse_name != null && !isRoot && <Text>Đã lập gia đình</Text>}
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
    height: 4,
    backgroundColor: "#f4f4f4",
    marginVertical: 10,
    borderRadius: 3,
  },
});
export default DetailScreen;
