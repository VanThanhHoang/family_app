import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext";

const ItemToogle = ({
  title,
  onPress,
  icon,
  color,
  colorChecked,
  isChecked,
  textChecked,
  textUnchecked,
}) => {
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title + " :"}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={onPress}
        >
          <Ionicons
            name={icon}
            size={28}
            color={isChecked ? colorChecked : color}
          />
          <Text
            style={{
              ...styles.title,
              color: isChecked ? colorChecked : color,
            }}
          >
            {isChecked ? textChecked : textUnchecked}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      gap: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
    },
  });
export default ItemToogle;
