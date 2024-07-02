import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList, TouchableOpacity } from "react-native";
import FamilyItem from "./components/FamilyItem";
import { AppContext } from "../AppContext";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import { removeDiacritics } from "../helper/string_format";
// "total_sons": 1,
// "total_daughters": 3
const FamilyScreen = () => {
  const [familyData, setFamilyData] = useState([]);
  const { setIsLoading } = React.useContext(AppContext);
  const [filteredList, setFilteredList] = useState(familyData);
  const [searchText, setSearchText] = useState("");
  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().get("families/");
      if (data) {
        setFamilyData(data);
        setFilteredList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFamilyData();
  }, []);

  const searchFilter = (text) => {
    const normalizedText = removeDiacritics(text);
    setSearchText(text);
    const filteredData = familyData.filter((item) => {
      const husbandName = item?.husband?.full_name_vn || "";
      const wifeName = item?.wife?.full_name_vn || "";
      const normalizedHusbandName = removeDiacritics(husbandName);
      const normalizedWifeName = removeDiacritics(wifeName);
      const isMatchHusband = normalizedHusbandName.includes(normalizedText);
      const isMatchWife = normalizedWifeName.includes(normalizedText);
      return isMatchHusband || isMatchWife;
    });
    setFilteredList(filteredData);
  };
  return (
    <View style={styles.container}>
      <AppHeader title="Danh sách gia đình" />
      <SearchBar onChangeText={searchFilter} value={searchText} />
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.relationship_id.toString()}
        renderItem={({ item }) => {
          return <FamilyItem family={item} />;
        }}
        data={filteredList}
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
