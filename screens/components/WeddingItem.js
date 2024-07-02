import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";

const WeddingItem = ({ family }) => {
  const ItemInfo = ({ isHusband, image, age }) => {
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
          <View style={styles.ageContainer}>
            <Image
              source={require("../../assets/age.png")}
              style={styles.ageIcon}
            />
            <Text style={styles.ageText}>{age ?? "Chưa rõ"}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.nameText}>
          {isHusband ? family.husband.full_name_vn : family.wife.full_name_vn}
        </Text>
        <Text style={styles.birthDate}>
          {isHusband
            ? dateFormater(family.husband.birth_date)
            : dateFormater(family.wife.birth_date)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <ItemInfo
          age={family.husband.current_age}
          isHusband
          image={family.husband.profile_picture}
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
          <Text style={styles.birthDate}>{dateFormater(family.marriage_date)}</Text>
          <Image
            style={styles.marriedIcon}
            source={require("../../assets/married.png")}
          />
          <View>
            <Text style={styles.marriageDurationText}>
              {family.marriage_duration}
            </Text>
          </View>
        </View>
        <ItemInfo
          age={family.wife.current_age}
          isHusband={false}
          image={family.wife.profile_picture}
        />
      </View>
    </View>
  );
};

const Children = ({ isBoy, total }) => {
  return  <View style={styles.totalContainer}>
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
}

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
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  ageContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ageIcon: {
    width: 15,
    height: 15,
    borderRadius: 25,
  },
  ageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    width: "80%",
    height: 0.5,
    marginVertical: 5,
    backgroundColor: "#969696",
  },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  marriageDurationText: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
    fontStyle: "italic",
  },
  totalContainer: {
    gap: 5,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
  },
  totalImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  totalText: {
    fontSize: 14,
    color: "black",
    fontStyle: "italic",
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
    bottom: -5,
  },
});

export default WeddingItem;
