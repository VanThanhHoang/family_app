import { Image, StyleSheet, Text, View } from "react-native";
const FamilyItem = ({ family }) => {
  const dateFormater = (date) => {
    if (!date) return "Chưa rõ";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  const ItemInfo = ({ ...props }) => {
    const getImage = () => {
      if (props.image === null) {
        if (props.isHusband) return require("../../assets/father.png");
        else return require("../../assets/mother.png");
      }
      return { uri: props.image };
    };
    const DeadInfo = () => {
      if (
        !family?.[props.isHusband ? "husband_death_info" : "wife_death_info"]
      ) {
        return null;
      }
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require("../../assets/grave.png")}
          />
          <Text
            style={{
              fontSize: 16,
              color: "black",
            }}
          >
            {props.isHusband
              ? dateFormater(family.husband_death_info?.death_date)
              : dateFormater(family.wife_death_info?.death_date)}
          </Text>
        </View>
      );
    };
    const LifeSpan = () => {
      if (
        family?.[props.isHusband ? "husband_death_info" : "wife_death_info"]
      ) {
        return (
          <Text style={styles.textInfo}>
            {props.isHusband
              ? family.husband_death_info?.life_span
              : family.wife_death_info?.life_span}
          </Text>
        );
      }
      return (
        <Text style={styles.textInfo}>{`${props.age ?? "Chưa rõ"} tuổi`}</Text>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <Image style={styles.image} source={getImage()} />
        <View style={styles.line} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {props.isHusband ? family.husband_name : family.wife_name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require("../../assets/born.png")}
          />
          <Text style={styles.textInfo}>
            {props.isHusband
              ? dateFormater(family.husband_birth_date)
              : dateFormater(family.wife_birth_date)}
          </Text>
        </View>
        <DeadInfo />
        <LifeSpan />
        {props.deadInfo && (
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontStyle: "italic",
            }}
          >
            {`${props.deadInfo.is_alive}: ${props.deadInfo.years_since_death}`}
          </Text>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <ItemInfo
          deadInfo={family.husband_death_info}
          age={family.husband_age}
          isHusband
          image={family.husband_profile_picture}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Children isBoy total={family.male_children_count} />
          <Children total={family.female_children_count} />
        </View>
        <ItemInfo
          deadInfo={family.wife_death_info}
          age={family.wife_age}
          isHusband={false}
          image={family.wife_profile_picture}
        />
      </View>
    </View>
  );
};
const Children = ({ ...props }) => {
  // get total from '2 trai'
  const total = props.total.split(" ");

  return (
    <View style={styles.totalContainer}>
      <Image
        style={styles.totalImage}
        source={
          props.isBoy
            ? require("../../assets/son.png")
            : require("../../assets/dauther.png")
        }
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>{`${total[0]}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    width: "80%",
    height: 0.5,
    marginVertical: 5,
    backgroundColor: "#969696",
  },
  totalContainer: {
    gap: 5,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  totalImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  totalText: {
    fontSize: 14,
    color: "black",
    fontStyle: "italic",
    fontWeight: "500",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    shadowColor: "#000",
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
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
export default FamilyItem;
