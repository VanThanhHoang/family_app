import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import WeddingItem from "./components/WeddingItem";
import { removeDiacritics } from "../helper/string_format";
import { useTheme } from "@rneui/themed";
import { useThemeContext } from "../ThemeContext";

const WeddingScreen = () => {
  const [weddingData, setWeddingData] = useState([]);
  const { setIsLoading } = React.useContext(AppContext);
  const { theme } = useThemeContext();

  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().get("weddingdays/");
      if (data?.data) {
        setWeddingData(data.data);
        setFilteredList(data.data);
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

  const [filteredList, setFilteredList] = useState(weddingData);
  const [searchText, setSearchText] = useState("");
  const searchFilter = (text) => {
    const normalizedText = removeDiacritics(text);
    setSearchText(text);
    const filteredData = weddingData.filter((item) => {
      const husbandName = item?.husband?.full_name_vn || "";
      const wifeName = item?.wife?.full_name_vn || "";
      const normalizedHusbandName = removeDiacritics(husbandName);
      const normalizedWifeName = removeDiacritics(wifeName);
      const isMatchHusband = normalizedHusbandName.includes(normalizedText);
      const isMatchWife = normalizedWifeName.includes(normalizedText);
      return isMatchHusband || isMatchWife;
    });
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <SearchBar onChangeText={searchFilter} value={searchText} />
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.relationship_id.toString()}
        renderItem={({ item }) => <WeddingItem family={item} />}
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

export default WeddingScreen;
