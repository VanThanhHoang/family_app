import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import DeathItem from "./components/DeathItem";
import { removeDiacritics } from "../helper/string_format";
import { useThemeContext } from "../ThemeContext";

const DeathScreen = () => {
  const [deathData, setDeathData] = useState([]);
  const { setIsLoading } = React.useContext(AppContext);
  const { theme } = useThemeContext();

  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance().get("deathday/");
      if (response?.data) {
        setDeathData(response.data);
        setFilteredList(response.data);
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

  const [filteredList, setFilteredList] = useState(deathData);
  const [searchText, setSearchText] = useState("");

  const searchFilter = (text) => {
    const normalizedText = removeDiacritics(text);
    setSearchText(text);
    const filteredData = deathData.filter((item) => {
      const fullName = item?.full_name_vn || "";
      const normalizedFullName = removeDiacritics(fullName);
      return normalizedFullName.includes(normalizedText);
    });
    setFilteredList(filteredData);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SearchBar onChangeText={searchFilter} />
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.people_id.toString()}
        renderItem={({ item }) => <DeathItem data={item} />}
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

export default DeathScreen;
