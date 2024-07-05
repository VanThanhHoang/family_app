import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { dateFormater } from "../../helper/string_format";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@rneui/themed';

const BirthDayItem = ({ ...props }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const familyInfo = props.data?.parent_relationships[0];

  const isDarkMode = theme.mode === 'dark';
  console.log({...props})
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailBirthDay", {
          id: props.data.people_id,
        });
      }}
      style={[
        styles.container,
        { backgroundColor: theme.colors.card },
        props.data?.notification && {
          shadowColor: "red",
          shadowOffset: {
            width: 2,
            height: 5,
          },
          borderWidth: 0.2,
          borderColor: "red",
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            props.data.profile_picture ?
            {
              uri: `https://api.lehungba.com${props.data.profile_picture}`,
            }:
            props.data.gender
              ? require("../../assets/father.png")
              : require("../../assets/mother.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: isDarkMode ? "#FFFFFF" : theme.colors.text }]}>{props.data.full_name_vn}</Text>
        <View style={styles.ageContainer}>
          <View style={styles.ageInfo}>
            <Image
              source={require("../../assets/age.png")}
              style={[styles.ageImage, { tintColor: theme.colors.text, opacity: 0.7 }]}
            />
            <Text style={[styles.ageText, { color: theme.colors.text }]}>
              {props.data.current_age ?? "Chưa rõ"}
            </Text>
          </View>
          <Text style={[styles.birthDate, { color: theme.colors.text }]}>
            {dateFormater(props.data.birth_date)}
          </Text>
        </View>
        <ItemParent
          isMarried={props.data.marital_status}
          name={familyInfo?.parent.full_name_vn}
          isFather
          theme={theme}
        />
        <ItemParent
          isMarried={props.data.marital_status}
          name={familyInfo?.mother?.full_name_vn}
          theme={theme}
        />
      </View>
      {props.data.marital_status && (
        <Image
          style={[styles.marri_image, { tintColor: theme.colors.text, opacity: 0.7 }]}
          source={require("../../assets/rings.png")}
        />
      )}
    </TouchableOpacity>
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
    borderRadius: 40,
  },
  infoContainer: {
    gap: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  ageContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  ageInfo: {
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
    opacity: 0.7,
  },
  parentText: {
    fontSize: 11,
    color: "#C0C0C0", // Set parent text color to grey
  },
});

export const ItemParent = ({ ...props }) => {
  const { theme } = props;
  const isDarkMode = theme.mode === 'dark';

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
      <Text style={[styles.parentText, { color: isDarkMode ? "#C0C0C0" : theme.colors.text }]}>
        {props.isFather
          ? `Ba: ${props.name ?? "Chưa rõ"}`
          : `Mẹ: ${props.name ?? "Chưa rõ"}`}
      </Text>
    </View>
  );
};

export default BirthDayItem;
