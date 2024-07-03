import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";

const BirthDayItem = ({ ...props }) => {
  const familyInfo = props.data?.parent_relationships[0];
  return (
    <View
      style={[
        styles.container,
        props.data?.notification && {
          shadowColor: "red",
          shadowOffset: {
            width: 2,
            height: 5,
          },
          borderWidth:0.2,
          borderColor:"red",
        },
      ]}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={
            props.data.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={{ width: 80, height: 80, borderRadius: 25 }}
        />
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
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {props.data.current_age ?? "Chưa rõ"}
            </Text>
          </View>
          <Text style={styles.birthDate}>
            {dateFormater(props.data.birth_date)}
          </Text>
        </View>
        <ItemParent
          isMarried={props.data.marital_status}
          name={familyInfo?.parent.full_name_vn}
          isFather
        />
        <ItemParent
          isMarried={props.data.marital_status}
          name={familyInfo?.mother?.full_name_vn}
        />
      </View>
      {props.data.marital_status && (
        <Image
          style={styles.marri_image}
          source={require("../../assets/ring2.png")}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  marri_image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    position: "absolute",
    right: 10,
  },
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
    fontSize: 15,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 12,

    fontWeight: "500",
  },
});
export const ItemParent = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
      }}
      marital_status
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

          fontSize: 11,
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
