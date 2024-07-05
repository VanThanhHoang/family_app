import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@rneui/themed';

const WeddingItem = ({ family }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
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
        <View
          style={[styles.imageRow, isHusband ? styles.rowReverse : styles.row]}
        >
          <Image style={styles.image} source={getImage()} />
        </View>
        <Text style={[styles.nameText, { color: "#FFFFFF" }]} numberOfLines={1} adjustsFontSizeToFit>
          {isHusband ? family.husband.full_name_vn : family.wife.full_name_vn}
        </Text>
        <Text style={[styles.birthDate, { color: "#C0C0C0" }]}>
          {isHusband
            ? dateFormater(family.husband.birth_date)
            : dateFormater(family.wife.birth_date)}
        </Text>
        <View
          style={[
            styles.ageContainer,
            isHusband ? styles.ageContainerLeft : styles.ageContainerRight,
          ]}
        >
          {isAlive ? (
            <Image
              source={require("../../assets/age.png")}
              style={[styles.ageIcon, { tintColor: theme.colors.text, opacity: 0.7 }]}
            />
          ) : null}
          <Text style={[styles.ageText, { color: "#C0C0C0" }]}>
            {isAlive ? age ?? "Chưa rõ" : `${age}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailWedding", {
          id: family.relationship_id,
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
          <View style={styles.childrenRow}>
            {family.total_sons > 0 && <Children isBoy total={family.total_sons} />}
            {family.total_daughters > 0 && <Children total={family.total_daughters} />}
          </View>
          <Text style={[styles.anniversaryDateText, { color: "#C0C0C0" }]}>
            {dateFormater(family.marriage_date)}
          </Text>
          <Image
            style={styles.marriedIcon}
            source={require("../../assets/married.png")}
          />
          <View>
            <Text style={[styles.marriageDurationText, { color: "#C0C0C0" }]}>
              {family.marriage_duration}
            </Text>
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
      <Image
        style={styles.totalImage}
        source={
          isBoy
            ? require("../../assets/son.png")
            : require("../../assets/dauther.png")
        }
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>{total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  imageRow: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  row: {
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  ageContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ageContainerLeft: {
    left: 0,
    top: 10,
  },
  ageContainerRight: {
    right: 0,
    top: 10,
  },
  ageIcon: {
    width: 15,
    height: 15,
    borderRadius: 25,
  },
  ageText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    marginVertical: 10,
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
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
  },
  centerContainer: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  childrenRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  marriedIcon: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  marriageDurationText: {
    fontSize: 10,
    fontWeight: "600",
    fontStyle: "italic",
  },
  totalContainer: {
    gap: 3,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  totalImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  totalText: {
    fontSize: 12,
    fontWeight: "500",
  },
  total: {
    position: "absolute",
    width: 15,
    height: 15,
    backgroundColor: "white",
    borderRadius: 7.5,
    justifyContent: "center",
    alignItems: "center",
    bottom: -8,
  },
  anniversaryDateText: {
    fontSize: 10,
    fontWeight: "400",
  },
});

export default WeddingItem;
