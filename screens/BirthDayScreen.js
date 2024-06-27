import { View, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList } from "react-native-gesture-handler";
import BirthDayItem from "./components/BirthDayItem";
const BirthDayScreen = () => {
  const [birhdayData, setBirhdayData] = useState([]);
  const { setIsLoading } = React.useContext(AppContext);
  const getFamilyData = async () => {
    try {
      setIsLoading(true);
      const data = await AxiosInstance().get("birthdays/");
      data && setBirhdayData(data);
    } catch (err) {
      console.log('123',err);
      console.log({...err});
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFamilyData();
  }, []);
  return (
    <View style={styles.container}>
      <AppHeader title="Sinh nhật của thành viên" />
      <SearchBar />
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => {
          return item.people_id.toString();
        }}
        renderItem={({ item }) => {
          return <BirthDayItem data={item} />;
        }}
        data={birhdayData}
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
