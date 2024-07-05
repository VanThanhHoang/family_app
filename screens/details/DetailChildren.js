import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ItemFamily } from "./DetailFamilyScreen";
import AppHeader from "../../components/AppHeader";
const DetailScreenChildren = () => {
  const { data } = useRoute().params;
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
            name={data.full_name_vn}
            id={data.people_id}
            title={"Chồng"}
          />
          <ItemFamily
            isRoot
            name={data.full_name_vn}
            id={data.people_id}
            title={"Vợ"}
          />
        </View>
        <View style={styles.line} />
        <Text style={styles.detail}>Các con trong gia đình</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          {data?.children &&
            data.children.map((item, index) => {
              return (
                <ItemFamily
                  data={item}
                  key={index}
                  name={item.full_name_vn}
                  id={item.people_id}
                  title={"Con"}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
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
export default DetailScreenChildren;
