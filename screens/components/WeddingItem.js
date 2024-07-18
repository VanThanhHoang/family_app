import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../ThemeContext";

const WeddingItem = ({ family }) => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === 'dark';

  const ItemInfo = ({ isHusband, image, age, isAlive }) => {
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
        <Image style={styles.image} source={getImage()} />
        <Text style={[styles.nameText, isDarkMode && { color: "#FFFFFF" }]} numberOfLines={1} adjustsFontSizeToFit>
          {isHusband ? family.husband.full_name_vn : family.wife.full_name_vn}
        </Text>
        <View style={styles.birthAndAgeRow}>
          <Text style={[styles.birthDate, isDarkMode && { color: "#C0C0C0" }]}>
            {isHusband
              ? family.husband.is_alive
                ? dateFormater(family.husband.birth_date)
                : "Chưa rõ"
              : family.wife.is_alive
              ? dateFormater(family.wife.birth_date)
              : "Chưa rõ"}
          </Text>
          {isAlive && (
            <Text style={[styles.ageText, isDarkMode && { color: "#C0C0C0" }]}>
              {` - Tuổi ${age}`}
            </Text>
          )}
        </View>
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
      <View style={styles.container2}>
        <ItemInfo
          age={family.husband.current_age}
          isHusband
          image={family.husband.profile_picture}
          isAlive={family.husband.is_alive}
        />
        <View style={styles.centerContainer}>
          <Text style={[styles.anniversaryDateText, isDarkMode && { color: "#C0C0C0" }]}>
            {dateFormater(family.marriage_date)}
          </Text>
          <Text style={[styles.marriageDurationText, isDarkMode && { color: "#C0C0C0" }]}>
            {family.marriage_duration}
          </Text>
          <View style={styles.childrenRow}>
            {family.total_sons > 0 && <Children isBoy total={family.total_sons} />}
            {family.total_daughters > 0 && <Children total={family.total_daughters} />}
          </View>
        </View>
        <ItemInfo
          age={family.wife.current_age}
          isHusband={false}
          image={family.wife.profile_picture}
          isAlive={family.wife.is_alive}
        />
      </View>
    </TouchableOpacity>
  );
};

const Children = ({ isBoy, total }) => {
  return (
    <View style={styles.totalContainer}>
      <Text style={styles.iconText}>{isBoy ? '👦' : '👧'}</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.totalText}>{total}</Text>
        </View>
      </View>
    </View>
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
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  birthAndAgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 10,
    fontWeight: "400",
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container2: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  childrenRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 5, // Adjust to add space between marriage duration and icons
  },
  marriageDurationText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  totalContainer: {
    alignItems: "center",
    marginHorizontal: -5,
  },
  iconText: {
    fontSize: 20, // Adjust the size of the icon
    marginBottom: -20, // Adjust the spacing between the icon and the circle
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 11, // Adjust the size of the circle
    height: 11,
    borderRadius: 10, // Half of width and height to make it a circle
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position relative to the icon container
    bottom: -30, // Adjust to move the circle down
  },
  totalText: {
    fontSize: 9,
    fontWeight: "500",
  },
  anniversaryDateText: {
    fontSize: 10,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default WeddingItem;
