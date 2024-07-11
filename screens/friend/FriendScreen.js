import { View } from "react-native";
import AppHeader from "../../components/AppHeader";
import AxiosInstance from "../../network/AxiosInstance";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { FlatList } from "react-native-gesture-handler";
import FriendItem from "../components/friend/FriendItem";
import { useThemeContext } from "../../ThemeContext";
const FriendScreen = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const { setIsLoading } = useContext(AppContext);
  const deteleFriend = async (id) => {
    try {
      AxiosInstance().delete(`friend/${id}/`);
      setFriendList(friendList.filter((item) => item.friend_id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const getFriendList = async () => {
    setIsLoading(true);
    try {
      const data = await AxiosInstance().get("friend/");
      setFriendList(data.data);
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i].friend_id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const { theme } = useThemeContext();
  useEffect(() => {
    getFriendList();
  }, []);
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
        title="Danh sách bạn bè"
        right={{
          icon: "add",
          onPress: () => navigation.navigate("AddFriendScreen"),
        }}
      />
      <FlatList
        data={friendList}
        keyExtractor={(item) => item.friend_id.toString()}
        renderItem={({ item }) => (
          <FriendItem
            onDelete={() => deteleFriend(item.friend_id)}
            item={item}
            onPress={() =>
              navigation.navigate("DetailScreen", { id: item.people_id })
            }
          />
        )}
      />
    </View>
  );
};
export default FriendScreen;
