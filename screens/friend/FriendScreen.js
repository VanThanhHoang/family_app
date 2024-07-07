import { View } from "react-native";
import AppHeader from "../../components/AppHeader";
import AxiosInstance from "../../network/AxiosInstance";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { FlatList } from "react-native-gesture-handler";
import PeopleItem from "../components/ItemPeople";
import { useThemeContext } from "../../ThemeContext";
import EditDelModal from "../../components/EditDelModal";

const FriendScreen = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const { setIsLoading } = useContext(AppContext);

  const getFriendList = async () => {
    // Call API to get friend list
    setIsLoading(true);
    try {
      const data = await AxiosInstance().get("friend/");
      // Filter friends to include only those with a profile picture
      const filteredData = data.filter(friend => friend.profile_picture);
      setFriendList(filteredData);
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

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      flex: 1,
    }}>
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
          <PeopleItem 
            item={item} 
            onPress={() => navigation.navigate("DetailScreen", { id: item.people_id })}
          />
        )}
      />
    </View>
  );
};

export default FriendScreen;
