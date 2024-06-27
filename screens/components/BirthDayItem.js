import { Image, StyleSheet, Text, View } from "react-native";

const BirthDayItem = ({ ...props }) => {
  const dateFormater = (date) => {
    if (!date) return "Chưa rõ";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <View style={{
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Image
          source={
            props.data.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
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
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {props.data.age ?? "Chưa rõ"}
          </Text>
        </View>
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
            {dateFormater(props.data.birth_date)}
          </Text>
        </View>
          <ItemParent isMarried={props.data.marital_status} name={props.data.father_name} isFather />
          <ItemParent isMarried={props.data.marital_status} name={props.data.mother_name} />
      </View>
      {props.data.marital_status && (
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 25,
            position: "absolute",
            right: 10,
          }}
          source={require("../../assets/ring2.png")}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
  },
});
const ItemParent = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
      }}marital_status
    >
      <Image
        style={{
          width: 20,
          height: 20,
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
        {props.isFather
          ? `Ba: ${props.name ?? "Chưa rõ"}`
          : `Mẹ: ${props.name ?? "Chưa rõ"}`}
      </Text>
    </View>
  );
};
export default BirthDayItem;
