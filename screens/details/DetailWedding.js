import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ItemFamily } from "./DetailFamilyScreen";
import AppHeader from "../../components/AppHeader";

const DetailWeddingScreen = () => {
  const { data } = useRoute().params;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader back title={`Gia đình ${data.husband.full_name_vn}`} />
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.coupleContainer}>
          <ItemFamily
            image={data.husband.profile_picture}
            isRoot
            gender={true}
            name={data.husband.full_name_vn}
            id={data.husband.people_id}
            title={"Chồng"}
          />
          <ItemFamily
            image={data.wife.profile_picture}
            isRoot
            gender={false}
            data={data.wife}
            name={data.wife.full_name_vn}
            id={data.wife.people_id}
            title={"Vợ"}
          />
        </View>

        <View style={styles.weddingInfoContainer}>
          <Text style={styles.weddingInfoTitle}>Thông tin hôn nhân</Text>
          <Text style={styles.weddingInfoText}>
            Ngày cưới: {data.marriage_date}
          </Text>
          <Text style={styles.weddingInfoText}>
            Thời gian kết hôn: {data.marriage_duration}
          </Text>
          <Text style={styles.weddingInfoText}>
            Còn {data.days_until_anniversary} ngày đến kỷ niệm ngày cưới
          </Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.detail}>Các con trong gia đình</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.childrenContainer}
        >
          {data?.children &&
            data.children.map((item, index) => (
              <ItemFamily
                image={item.child.profile_picture}
                gender={item.child.gender}
                data={item.child}
                key={index}
                name={item.child.full_name_vn}
                id={item.child.people_id}
                title={`Con ${item.child.gender ? "trai" : "gái"}`}
              />
            ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  coupleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    gap: 20,
    paddingTop: 30,
  },
  weddingInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  weddingInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weddingInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detail: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
  },
  childrenContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 100,
  },
  line: {
    width: "100%",
    height: 4,
    backgroundColor: "#f4f4f4",
    marginVertical: 10,
    borderRadius: 3,
  },
});

export default DetailWeddingScreen;
