import { Image, StyleSheet, Text, View } from "react-native";

const DeathItem = ({ ...props }) => {
  const dateFormater = (date) => {
    if (!date) return "Chưa rõ";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
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
          style={{ width: 62, height: 62, borderRadius: 25 }}
        />
        <Text style={{
          fontStyle: "italic",
          fontSize: 14,
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
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {props.data.death_info.age_at_death ?? "Chưa rõ"}
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
            {dateFormater(props.data.death_info.death_date)}
          </Text>
        </View>
        {props.data.marital_status && (
          <View>
            <ItemParent
              isMarried={props.data.marital_status}
              name={props.data.spouse_name}
              isFather={!props.data.gender}
            />
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
              <Children isBoy total={3} />
              <Children total={3} />
            </View>
          </View>
        )}
      </View>
          <Text style={styles.totalText}>{props.data.death_info.years_since_death}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
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
        {props.isFather
          ? `${props.name ?? "Chưa rõ"}`
          : `${props.name ?? "Chưa rõ"}`}
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

// {
//   "people_id": 139,
//   "full_name_vn": "Lưu Phương Dung",
//   "birth_date": "1986-05-20",
//   "death_date": "2021-10-14",
//   "gender": false,
//   "marital_status": true,
//   "profile_picture": null,
//   "father_name": "Lưu Quang Diệm",
//   "father_profile_picture": null,
//   "father_status": {
//     "death_date": "2023-04-16",
//     "is_alive": "Đã Mất",
//     "years_since_death": "1 năm 2 tháng",
//     "age_at_death": 83,
//     "life_span": "Hưởng Thọ: 83"
//   },
//   "mother_name": "Lê Minh Cầm",
//   "mother_profile_picture": null,
//   "mother_status": null,
//   "spouse_name": "Bùi Viết Trình",
//   "spouse_profile_picture": null,
//   "spouse_status": null,
//   "male_children_count": 2,
//   "female_children_count": 0,
//   "total_children_count": 2,
//   "deceased_children_count": 0,
//   "is_alive": false,
//   "years_since_death": "2 năm 8 tháng",
//   "age_at_death": 35,
//   "death_info": {
//     "death_date": "2021-10-14",
//     "is_alive": "Đã Mất",
//     "years_since_death": "2 năm 8 tháng",
//     "age_at_death": 35,
//     "life_span": "Hưởng Dương: 35"
//   }
// }