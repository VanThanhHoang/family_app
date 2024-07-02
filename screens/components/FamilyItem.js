import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";
const FamilyItem = ({ family }) => {
  const ItemInfo = ({ ...props }) => {
    const getImage = () => {
      if (props.info.profile_picture === null) {
        if (props.isHusband) return require("../../assets/father.png");
        else return require("../../assets/mother.png");
      }
      return { uri: props.image };
    };
    const DeadInfo = () => {
      if (!props.info.death_info) {
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
           <Text style={styles.birthDate}>
            {dateFormater(props.info.death_info.death_date)}
          </Text>
        </View>
      );
    };
    const LifeSpan = () => {
      if (props.info.death_info) {
        return (
          <Text style={styles.life}>{props.info.death_info.life_span}</Text>
        );
      }
      return (
        <View style={styles.ageContainer}>
          <Image
            source={require("../../assets/age.png")}
            style={styles.ageIcon}
          />
          <Text style={styles.ageText}>
            {props.info.current_age ?? "Chưa rõ"}
          </Text>
        </View>
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
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {props.info.full_name_vn}
        </Text>
        <View style={styles.line} />
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
          <Text style={styles.birthDate}>
            {dateFormater(props.info.birth_date)}
          </Text>
        </View>
        <DeadInfo />
        <LifeSpan />
        {props.info.death_info && (
          <Text
            style={{
              fontSize: 12,
              color: "black",
              fontStyle: "italic",
              fontWeight: "500",
            }}
          >
            {`${props.info.death_info.is_alive}: ${props.info.death_info.years_since_death}`}
          </Text>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <ItemInfo isHusband info={family.husband} />
        <View style={styles.line}>
          <Children isBoy total={family.total_sons} />
          <Children total={family.total_daughters} />
        </View>
        <ItemInfo info={family.wife} />
      </View>
    </View>
  );
};
const Children = ({ ...props }) => {
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
        <Text style={styles.totalText}>{`${props.total}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
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
  ageContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  line: {
    marginVertical: 5,
  },
  totalContainer: {
    gap: 5,
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
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
  life:{
    fontSize: 12,
    color: "black",
    fontStyle: "italic",
    fontWeight: "700"
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
  line: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
export default FamilyItem;
