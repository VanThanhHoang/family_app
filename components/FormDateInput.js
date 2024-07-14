import { StyleSheet, View, Text, TextInput } from "react-native";
import { useTheme } from "@rneui/themed";
import { useThemeContext } from "../ThemeContext";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect } from "react";

const AppFormDateInput = ({ title, onSaveText, value }) => {
  //2024-07-14T09:17:57.633Z to yyyy-mm-dd
  const formatTime = (time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  const { theme } = useThemeContext();
  const styles = useStyle(theme);
  const [showModal, setShowModal] = React.useState(false);

  const onPress = () => {
    setShowModal(true);
  };

  const handleConfirm = (date) => {
    onSaveText(formatTime(date));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.input}>
        <Text
          style={{
            ...styles.title,
            color: theme.colors.placeHolder,
            fontWeight: "600",
          }}
        >
          {value || `Chọn ${title}`}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        date={value ? new Date(value) : undefined}
        isVisible={showModal}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
const useStyle = (theme) => {
  return StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: theme.colors.backgroundColor,
      gap: 10,
      padding: 10,
      borderRadius: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.text,
      borderRadius: 10,
      color: theme.colors.text,
      padding: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      fontWeight: "600",
      height: 48,
      justifyContent: "center",
    },
  });
};
export default AppFormDateInput;
