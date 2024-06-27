import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

const AppHeader = ({ ...props }) => {
  // get device status bar height
  const paddingTop = Platform.OS === "android" ? (StatusBar.currentHeight) : 0;

  return (
    <View style={[styles.container,{
      paddingTop:Platform.OS === "android" ? 40 : 0,
    }]}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#969696",
    borderBottomWidth: 0.5,
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  }
});
export default AppHeader;
