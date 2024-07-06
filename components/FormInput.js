import { StyleSheet, View, Text, TextInput } from "react-native";
import { useTheme } from "@rneui/themed";

const AppFormInput = ({ title, onTextChange, value }) => {
  const { theme } = useTheme();
  const styles = useStyle(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onTextChange}
      />
    </View>
  );
};
const useStyle = (theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      padding: 10,
      backgroundColor: theme.colors.backgroundColor,
      gap: 10,
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
      height: 48,
      paddingHorizontal: 10,
      fontSize: 16,
    },
  });
};
export default AppFormInput;
