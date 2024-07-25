import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../ThemeContext";
import { dateFormater } from "../../helper/string_format";

const WeddingItem = ({ family }) => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === "dark";

  if (!family.marriage_date) {
    return null; // Hide the item if there is no marriage date
  }

  const ItemInfo = ({ isHusband, image }) => {
    const getImage = () => {
      if (image === null) {
        return isHusband
          ? require("../../assets/father.png")
          : require("../../assets/mother.png");
      }
      return { uri: image };
    };

    return (
      <View style={styles.itemInfoContainer}>
        <TouchableOpacity
          onPress={() => {
            if (image) {
              navigation.navigate("DetailImage", {
                link: image,
              });
            }
          }}
        >
          <Image
            source={image ? { uri: image } : getImage()}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text
          style={[styles.nameText, isDarkMode && { color: "#FFFFFF" }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {isHusband ? family.husband.full_name_vn : family.wife.full_name_vn}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailWeddingScreen", {
          data: family,
        });
      }}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.dateAndDurationContainer}>
        <Text
          style={[
            styles.anniversaryDateText,
            isDarkMode && { color: "#C0C0C0" },
          ]}
        >
          {dateFormater(family.marriage_date)}
        </Text>
        <Text
          style={[
            styles.marriageDurationText,
            isDarkMode && { color: "#C0C0C0" },
          ]}
        >
          {family.marriage_duration}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <ItemInfo isHusband image={family.husband.profile_picture} />
        <ItemInfo isHusband={false} image={family.wife.profile_picture} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 0, // Adjust the space between name and date
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    marginVertical: 5, // Adjust the margin between items
    gap: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 130,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateAndDurationContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: -35, // Adjust the space between date and info row
  },
  marriageDurationText: {
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },
  anniversaryDateText: {
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default WeddingItem;
