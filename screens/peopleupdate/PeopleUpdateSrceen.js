import React, { useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import AppHeader from "../../components/AppHeader";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import PeopleUpdateItem from "../components/peopleupdate/PeopleUpdateItem";
import { useThemeContext } from "../../ThemeContext";

const PeopleUpdateScreen = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const { setIsLoading } = useContext(AppContext);
  const { theme } = useThemeContext();

  const getFriendList = async () => {
    setIsLoading(true);
    try {
      const data = await AxiosInstance().get("people/people-detail/");
      setFriendList(data.data);
      
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFriendList();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <AppHeader
        back
        title="All People"
        right={{
          icon: "add",
          onPress: () => navigation.navigate("AddFriendScreen"),
        }}
      />
      <FlatList
        data={friendList}
        keyExtractor={(item) => item.people_id.toString()}
        renderItem={({ item }) => (
          <PeopleUpdateItem
            item={item}
          />
        )}
      />
    </View>
  );
};

export default PeopleUpdateScreen;