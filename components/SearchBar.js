///Users/macm1/Documents/mobile_app/components/SearchBar.js
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { useThemeContext } from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = ({ onChangeText, value }) => {
  const { theme, toggleTheme } = useThemeContext();
  const { theme: rneTheme } = useTheme();
  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.container,
          {
            backgroundColor: rneTheme.colors.card,
            color: rneTheme.colors.text,
          },
        ]}
        placeholder="Tìm kiếm..."
        placeholderTextColor={
          rneTheme.mode === "dark" ? "#ffffff" : rneTheme.colors.border
        } // Thay đổi màu placeholder khi ở chế độ tối
      />
      <Icon
        name="search"
        style={styles.searchIcon}
        color={rneTheme.mode === "dark" ? "#ffffff" : "gray"}
        size={20}
      />
      <TouchableOpacity
        onPress={() => {
          toggleTheme();
          // change status bar style
          AsyncStorage.setItem("theme", theme.mode === "light" ? "dark" : "light");
        }}
        style={styles.themeToggle}
      >
        <Icon
          name={theme.mode === "light" ? "sunny" : "moon"}
          style={styles.themeIcon}
          size={20}
          color={rneTheme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  container: {
    flex: 1,
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 40,
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    top: 14,
    left: 10,
  },
  themeToggle: {
    marginLeft: 10,
  },
  themeIcon: {
    width: 20,
    height: 20,
  },
});

export default SearchBar;
