import { View, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList } from "react-native-gesture-handler";
import BirthDayItem from "./components/BirthDayItem";
const BirthDayScreen = () => {
  const { birhdayData } = React.useContext(AppContext);
  const [filteredList, setFilteredList] = useState(birhdayData.data);
  const [searchText, setSearchText] = useState("");
  const searchFilter = (text) => {
    text = text.trim();
    setSearchText(text);
    const filteredData = birhdayData.data.filter((item) => {
      return item?.full_name_vn.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredList(filteredData);
  };
  return (
    <View style={styles.container}>
      <AppHeader title="Sinh nhật của thành viên" />
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
