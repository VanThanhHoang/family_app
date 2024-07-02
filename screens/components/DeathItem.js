import { Image, StyleSheet, Text, View } from "react-native";

const DeathItem = ({ ...props }) => {
  const dateFormater = (date) => {
    if (!date) return "Chưa rõ";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  console.log(props.data.death_date);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Image
          source={
            props.data.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{
          fontStyle: "italic",
          fontSize: 12,
          fontWeight: "500",
        }}>Hưởng dương</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/age.png")}
            style={{ width: 15, height: 15, borderRadius: 25 }}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
            }}
          >
            {props.data.death_info.age_at_death ?? "Chưa rõ"}
          </Text>
        </View>
        <Text style={styles.totalText}>{props.data.death_info.years_since_death}</Text>
      </View>
      <View
        style={{
          gap: 5,
        }}
      >
        <Text style={styles.name}>{props.data.full_name_vn}</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Text style={styles.birthDate}>
           {`${dateFormater(props.data.birth_date)} - ${dateFormater(props.data.death_date)}`}
          </Text>
        </View>
        {props.data.marital_status && (
          <View>
            <ItemParent
              isMarried={props.data.marital_status}
              name={props.data.spouse_relationships[0]}
              isFather={!props.data.gender}
            />
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
              <Children isBoy total={props.data.spouse_relationships[0].total_sons} />
              <Children total={props.data.spouse_relationships[0].total_daughters} />
            </View>
          </View>
        )}
      </View>
         
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    gap:10,
    alignItems: "flex-start",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
  },
  totalContainer: {
    gap: 5,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  totalImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  totalText: {
    fontSize: 14,
    color: "black",
    fontWeight: "700",
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
const ItemParent = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
        }}
        source={
          props.isFather
            ? require("../../assets/father.png")
            : require("../../assets/mother.png")
        }
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        {!props.isFather
          ? `${props.name?.wife.full_name_vn ?? "Chưa rõ"}`
          : `${props.name?.husband.full_name_vn ?? "Chưa rõ"}`}
      </Text>
    </View>
  );
};
const Children = ({ isBoy, total }) => (
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
export default DeathItem;