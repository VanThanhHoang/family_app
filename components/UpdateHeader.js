import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const AppHeader = ({ ...props }) => {
  // get device status bar height
  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? 40 : 0,
        },
      ]}
    >
      {props?.back && (
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={28} color={"black"} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{props.title}</Text>
      <TouchableOpacity
          style={styles.back}
          onPress={() => {
            props.onSave()
          }}
        >
          <Ionicons name="save" size={28} color={"black"} />
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    height: 60,
    padding: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#969696",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",  
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  back:{
    width: 50,
    height: 50,
    justifyContent: "center",
  }
});
export default AppHeader;
