import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../ThemeContext";
const AppHeader = ({ ...props }) => {
  // get device status bar height
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const styles = useStyles(theme);
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
          <Ionicons name="arrow-back-outline" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};
const useStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      alignItems: "center",
      height: 60,
      padding: 10,
      paddingHorizontal: 20,
      borderBottomColor: "#969696",
      borderBottomWidth: 0.5,
      flexDirection: "row",
      gap: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    back:{
      width: 50,
      height: 50,
      justifyContent: "center",
    }
  });
export default AppHeader;
