import { Image, StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ onChangeText, value }) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.container}
        placeholder="Tìm kiếm..."
      />
      <Image style={styles.image} source={require("../assets/search.png")} />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingStart: 40,
    paddingLeft: 40,
    margin: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  image: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 25,
    alignSelf: "center",
    left: 20,
    tintColor: "gray",
  },
});
