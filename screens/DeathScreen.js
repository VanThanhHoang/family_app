import { View, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList } from "react-native-gesture-handler";
import BirthDayItem from "./components/BirthDayItem";
import DeathItem from "./components/DeathItem";
import { removeDiacritics } from "../helper/string_format";
const DeathScreen = () => {
    const [birhdayData, setBirhdayData] = useState([]);
    const { setIsLoading } = React.useContext(AppContext);
    const getFamilyData = async () => {
      try {
        setIsLoading(true);
        const data = await AxiosInstance().get("deathday/");
        if(data?.data){
          setBirhdayData(data.data);
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
    const [filteredList, setFilteredList] = useState(birhdayData);
    const [searchText, setSearchText] = useState("");
    const searchFilter = (text) => {
      const normalizedText = removeDiacritics(text);
      setSearchText(text);
      const filteredData = birhdayData.filter((item) => {
        const husbandName = item?.full_name_vn || "";
        const normalizedHusbandName = removeDiacritics(husbandName);
        const isMatchHusband = normalizedHusbandName.includes(normalizedText);
        return isMatchHusband 
      });
      setFilteredList(filteredData);
    };
  return (
    <View style={styles.container}>
      <SearchBar/>
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => {
          return item.people_id.toString();
        }}
        renderItem={({ item }) => {
          return <DeathItem data={item} />;
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
export default DeathScreen;
