import { Image, StyleSheet, Text, View } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useThemeContext } from "../../ThemeContext";

const BirthDayItem = ({ ...props }) => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const familyInfo = props.data?.parent_relationships[0];
  const subTextColor = theme.mode === "dark" ? "#C0C0C0" : theme.colors.subText;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailBirthDay", {
          id: props.data.people_id,
        });
      }}
      style={[
        styles.container,
        props.data?.notification && {
          shadowColor: "red",
          shadowOffset: {
            width: 2,
            height: 5,
          },
          borderWidth: 0.2,
          borderColor: "red",
        },
        {
          backgroundColor: theme.colors.card,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            if (props.data.profile_picture) {
              navigation.navigate("DetailImage", {
                link: props.data.profile_picture,
              });
            }
          }}
        >
          <Image
            source={
              props.data.profile_picture
                ? { uri: props.data.profile_picture }
                : props.data.gender
                ? require("../../assets/father.png")
                : require("../../assets/mother.png")
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {props.data.full_name_vn}
        </Text>
        <View style={styles.birthDateContainer}>
          <View style={styles.ageContainer}>
            <Image
              source={require("../../assets/age.png")}
              style={styles.ageImage}
            />
            <Text style={[styles.ageText, { color: subTextColor }]}>
              {props.data.current_age ?? "Chưa rõ"}
            </Text>
          </View>
          <Text style={[styles.birthDate, { color: subTextColor }]}>
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
          style={styles.marriImage}
          source={require("../../assets/married.png")}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  marriImage: {
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
    resizeMode: "cover",
  },
  infoContainer: {
    gap: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  birthDateContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ageContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ageImage: {
    width: 15,
    height: 15,
    borderRadius: 25,
  },
  ageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  birthDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  parentContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  parentImage: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  parentText: {
    fontSize: 11,
  },
});

export const ItemParent = ({ ...props }) => {
  const { theme } = useThemeContext();
  const subTextColor = theme.mode === "dark" ? "#C0C0C0" : theme.colors.subText;

  return (
    <View style={styles.parentContainer}>
      <Image
        style={styles.parentImage}
        source={
          props.isFather
            ? require("../../assets/father.png")
            : require("../../assets/mother.png")
        }
      />
      <Text style={[styles.parentText, { color: subTextColor }]}>
        {props.isFather
          ? `Ba: ${props.name ?? "Chưa rõ"}`
          : `Mẹ: ${props.name ?? "Chưa rõ"}`}
      </Text>
    </View>
  );
};

export default BirthDayItem;
