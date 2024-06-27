import { StyleSheet, Text, View } from "react-native";

const AppHeader = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
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
