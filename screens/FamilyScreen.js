import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList } from "react-native";
import FamilyItem from "./components/FamilyItem";
import { AppContext } from "../AppContext";
import SearchBar from "../components/SearchBar";
import { removeDiacritics } from "../helper/string_format";
import { useTheme } from '@rneui/themed';

const FamilyScreen = () => {
  const [familyData, setFamilyData] = useState([]);
  const { setIsLoading } = useContext(AppContext);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { theme } = useTheme();

  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance().get("families/");
      const data = response.data; // Lấy dữ liệu từ response
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
    const normalizedText = removeDiacritics(text).toLowerCase();
    setSearchText(text);
    const filteredData = familyData.filter((item) => {
      const husbandName = item?.husband?.full_name_vn || "";
      const wifeName = item?.wife?.full_name_vn || "";
      const normalizedHusbandName = removeDiacritics(husbandName).toLowerCase();
      const normalizedWifeName = removeDiacritics(wifeName).toLowerCase();
      const isMatchHusband = normalizedHusbandName.includes(normalizedText);
      const isMatchWife = normalizedWifeName.includes(normalizedText);
      return isMatchHusband || isMatchWife;
    });
    setFilteredList(filteredData);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
