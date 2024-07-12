import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { useThemeContext } from "../../ThemeContext";

const DeathItem = ({ ...props }) => {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const isDarkMode = theme.mode === "dark";
  console.log(props.data);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailBirthDay", {
          id: props.data.people_id,
        });
      }}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            props.data.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={styles.image}
        />
        <Text style={[styles.italicText, { color: theme.colors.text }]}>
          Hưởng dương
        </Text>
        <View style={styles.ageContainer}>
          <Image
            source={require("../../assets/age.png")}
            style={[
              styles.ageImage,
              { tintColor: theme.colors.text, opacity: 0.7 },
            ]}
          />
          <Text style={[styles.ageText, { color: theme.colors.text }]}>
            {props.data.current_age ?? "Chưa rõ"}
          </Text>
        </View>
        <Text style={[styles.totalText, { color: theme.colors.text }]}>
          {props.data.years_since_death}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {props.data.full_name_vn}
        </Text>
        <View style={styles.birthDateContainer}>
          <Text style={[styles.birthDate, { color: theme.colors.text }]}>
            {`${dateFormater(props.data.birth_date)} - ${dateFormater(
              props.data.death_date
            )}`}
          </Text>
        </View>
        {props.data.marital_status && (
          <View>
            <ItemParent
              isMarried={props.data.marital_status}
              name={props.data.spouse_relationships[0]}
              isFather={!props.data.gender}
              theme={theme}
            />
            <View style={styles.childrenContainer}>
              <Children
                isBoy
                total={props.data.spouse_relationships[0].total_sons}
                theme={theme}
              />
              <Children
                total={props.data.spouse_relationships[0].total_daughters}
                theme={theme}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    gap: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  italicText: {
    fontStyle: "italic",
    fontSize: 12,
    fontWeight: "500",
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
    fontSize: 19,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 14,
    fontWeight: "700",
  },
  infoContainer: {
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  birthDateContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  birthDate: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "italic",
  },
  childrenContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  parentContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    alignItems: "center",
  },
  parentImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  parentText: {
    fontWeight: "bold",
    fontSize: 14,
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
  const { theme } = props;
  const isDarkMode = theme.mode === "dark";

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
      <Text
        style={[
          styles.parentText,
          { color: isDarkMode ? "#C0C0C0" : theme.colors.text },
        ]}
      >
        {!props.isFather
          ? `${props.name?.wife.full_name_vn ?? "Chưa rõ"}`
          : `${props.name?.husband.full_name_vn ?? "Chưa rõ"}`}
      </Text>
    </View>
  );
};

const Children = ({ isBoy, total, theme }) => (
  <View style={styles.totalContainer}>
    <Image
      style={styles.totalImage}
      source={
        isBoy
          ? require("../../assets/son.png")
          : require("../../assets/dauther.png")
      }
    />
    <View style={[styles.total, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.totalText, { color: theme.colors.text }]}>
        {total}
      </Text>
    </View>
  </View>
);

export default DeathItem;
