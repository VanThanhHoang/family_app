import { View, StyleSheet, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import BirthDayItem from "./components/BirthDayItem";
import { removeDiacritics } from "../helper/string_format";
import { useThemeContext } from "../ThemeContext";

const BirthDayScreen = () => {
  const { birthdayData} = React.useContext(AppContext);
  const { theme : rneTheme } = useThemeContext();
  const [filteredList, setFilteredList] = useState(birthdayData.data);
  const [searchText, setSearchText] = useState("");

  const searchFilter = (text) => {
    const normalizedText = removeDiacritics(text);
    setSearchText(text);
    const filteredData = birthdayData.data.filter((item) => {
      const husbandName = item?.full_name_vn || "";
      const normalizedHusbandName = removeDiacritics(husbandName);
      const isMatchHusband = normalizedHusbandName.includes(normalizedText);
      return isMatchHusband;
    });
    setFilteredList(filteredData);
  };

  return (
    <View style={[styles.container, { backgroundColor: rneTheme.colors.background }]}>
      <SearchBar onChangeText={searchFilter} />
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => {
          return item.people_id.toString();
        }}
        renderItem={({ item }) => {
          return <BirthDayItem data={item} />;
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

export default BirthDayScreen;
