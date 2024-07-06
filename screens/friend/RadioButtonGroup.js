import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext";

const RadioButtonGroup = ({
  title,
  options,
  selectedValue,
  onSelect,
  color,
  colorSelected
}) => {
  const { theme } = useThemeContext();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title + ":"}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => onSelect(option.value)}
          >
            <Ionicons
              name={selectedValue === option.value ? "checkmark-circle-outline" : "ellipse-outline"}
              size={24}
              color={selectedValue === option.value ? colorSelected : color}
            />
            <Text
              style={{
                ...styles.optionText,
               color:theme.colors.text
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
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
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      gap: 10,
    },
    optionText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

export default RadioButtonGroup;