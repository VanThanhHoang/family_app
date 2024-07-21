import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { useThemeContext } from "../../ThemeContext";

const FamilyItem = ({ family }) => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  const isDarkMode = theme.mode === "dark";

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
        </View>
        <Text
          style={[styles.nameText, { color: theme.colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {isHusband ? family.husband.full_name_vn : family.wife.full_name_vn}
        </Text>
        <Text style={[styles.textInfo, { color: theme.colors.text }]}>
          {isHusband
            ? dateFormater(family.husband.birth_date)
            : dateFormater(family.wife.birth_date)}{" "}
          Tuổi {age}
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
      <View style={styles.container2}>
        <ItemInfo
          age={family.husband.current_age}
          isHusband
          image={family.husband.profile_picture}
          isAlive={family.husband.is_alive}
        />
        <View style={styles.centerContainer}>
          <View style={styles.childrenRow}>
            {family.total_sons > 0 && (
              <Children isBoy total={family.total_sons} />
            )}
            {family.total_daughters > 0 && (
              <Children total={family.total_daughters} />
            )}
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
      <Text style={styles.iconText}>{isBoy ? "👦" : "👧"}</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.totalText}>{total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    alignItems: "center",
    marginHorizontal: -5,
  },
  iconText: {
    fontSize: 20, // Adjust the size of the icon
    marginBottom: -1, // Adjust the spacing between the icon and the circle
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 15, // Adjust the size of the circle
    height: 15,
    borderRadius: 7.5, // Half of width and height to make it a circle
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0, // Space between icon and number
  },
  totalText: {
    fontSize: 10, // Adjusted font size to match
    fontWeight: "500",
  },
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
  textInfo: {
    fontSize: 11,
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
    gap: 10,
  },
  childrenRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default FamilyItem;
