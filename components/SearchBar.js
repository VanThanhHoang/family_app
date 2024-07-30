///Users/macm1/Documents/mobile_app/components/SearchBar.js
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { useThemeContext } from "../ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ onChangeText, value, showFamilyTree }) => {
  const { theme, toggleTheme } = useThemeContext();
  const [showIcon, setShowIcon] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <TextInput
        onFocus={() => {
          setShowIcon(false);
        }}
        onBlur={() => {
          setShowIcon(true);
        }}
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
          },
        ]}
        placeholder="Tìm kiếm..."
        placeholderTextColor={
          theme.mode === "dark" ? "#ffffff" : theme.colors.border
        } // Thay đổi màu placeholder khi ở chế độ tối
      />
      <Icon
        name="search"
        style={styles.searchIcon}
        color={theme.mode === "dark" ? "#ffffff" : "gray"}
        size={20}
      />
      {showIcon && (
        <>
          <TouchableOpacity
            onPress={() => {
              toggleTheme();
              // change status bar style
              AsyncStorage.setItem(
                "theme",
                theme.mode === "light" ? "dark" : "light"
              );
            }}
            style={styles.themeToggle}
          >
            <Icon
              name={theme.mode === "light" ? "sunny" : "moon"}
              style={styles.themeIcon}
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TreeScreen");
            }}
          >
            <Image
              style={{
                tintColor: theme.colors.text,
                width: 30,
                height: 30,
              }}
              source={require("../assets/family_tree.png")}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 10,
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
