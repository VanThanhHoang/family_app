import { View, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import AxiosInstance from "../network/AxiosInstance";
import { FlatList } from "react-native-gesture-handler";
import BirthDayItem from "./components/BirthDayItem";
import WeddingItem from "./components/WeddingItem";
// "male_children_count": 1,
// "female_children_count": 1,
const WeddingScreen = () => {
    const [weddingData, setWeddingData] = useState([]);
    const { setIsLoading } = React.useContext(AppContext);
    const getFamilyData = async () => {
      try {
        setIsLoading(true);
        const data = await AxiosInstance().get("weddingdays/");
        data?.data && setWeddingData(data.data);
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
      <AppHeader title="Danh sách ngày cưới" />
      <SearchBar/>
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{ width: "100%" }}
        keyExtractor={(item) => {
          return item.relationship_id.toString();
        }}
        renderItem={({ item }) => {
          return <WeddingItem family={item}/>;
        }}
        data={weddingData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WeddingScreen
