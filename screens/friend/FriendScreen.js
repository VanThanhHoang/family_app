import { View } from "react-native";
import AppHeader from "../../components/AppHeader";

const FriendScreen = ({ navigation }) => {
  return (
    <View>
      <AppHeader
        back
        title="Danh sách bạn bè"
        right={{
          icon: "add",
          onPress: () => navigation.navigate("AddFriendScreen"),
        }}
      />
    </View>
  );
};
export default FriendScreen;
