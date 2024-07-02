import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList, TouchableOpacity } from "react-native";
import FamilyItem from "./components/FamilyItem";
import { AppContext } from "../AppContext";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
// "total_sons": 1,
// "total_daughters": 3
const FamilyScreen = () => {
  const [familyData, setFamilyData] = useState([]);
  const { setIsLoading } = React.useContext(AppContext);
  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().get("families/");
      data && setFamilyData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFamilyData();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Danh sách gia đình" />
      <SearchBar/>
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.relationship_id.toString()}
        renderItem={({ item }) => {
          return <FamilyItem family={item} />;
        }}
        data={familyData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FamilyScreen;
