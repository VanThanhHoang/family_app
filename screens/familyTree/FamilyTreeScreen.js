import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext"; // Import theme context
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const getGradientColors = (level) => {
  switch (level) {
    case 0:
      return ["#FFD700", "#FFA500"]; // Vàng
    case 1:
      return ["#00FF00", "#32CD32"]; // Xanh lá
    case 2:
      return ["#0000FF", "#1E90FF"]; // Xanh dương
    case 3:
      return ["#FF00FF", "#FF69B4"]; // Hồng
    default:
      return ["#FFD700", "#FFA500"]; // Vàng mặc định
  }
};

const FamilyTreeNode = ({ person, level, onToggle }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(level < 1);
  const [animation] = useState(new Animated.Value(level < 1 ? 1 : 0));
  const { theme } = useThemeContext(); // Sử dụng context theme

  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    Animated.timing(animation, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onToggle();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10000],
  });

  return (
    <View
      style={[
        styles.nodeContainer,
        { marginLeft: level * 20, backgroundColor: theme.colors.background },
      ]}
    >
      <LinearGradient
        colors={getGradientColors(level)}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradientLine}
      />
      <TouchableOpacity onPress={toggleExpand} style={styles.nodeHeader}>
        <View style={styles.personInfo}>
          <Image
            source={{
              uri: person.profile_picture ?? APP_CONSTANTS.defaultAvatar,
            }}
            style={[styles.profileImage, { borderColor: theme.colors.border }]}
          />
          <View style={styles.textInfo}>
            <Text style={[styles.personName, { color: theme.colors.text }]}>
              {person.full_name_vn}
            </Text>
            <Text style={[styles.dateInfo, { color: theme.colors.text }]}>
              {person.birth_date}
              {person.death_date && ` - ${person.death_date}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailBirthDay", {
                id: person.people_id,
              });
            }}
            style={styles.detailButton}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={theme.colors.icon}
            />
          </TouchableOpacity>
        </View>
        {person.children && person.children.length > 0 && (
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "90deg"],
                  }),
                },
              ],
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.icon}
            />
          </Animated.View>
        )}
      </TouchableOpacity>
      {person.children && person.children.length > 0 && (
        <Animated.View style={{ maxHeight, overflow: "hidden" }}>
          {person.children.map((child) => (
            <FamilyTreeNode
              key={child.people_id}
              person={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const FamilyTree = ({ data }) => {
  const [, forceUpdate] = useState();

  const handleToggle = () => {
    forceUpdate({});
  };

  return (
    <FlatList
      style={{
        paddingBottom: 100,
      }}
      data={[data]}
      horizontal
      renderItem={({ item }) => (
        <FamilyTreeNode person={item} level={0} onToggle={handleToggle} />
      )}
      keyExtractor={(item) => item.people_id.toString()}
    />
  );
};

const FamilyTreeScreen = () => {
  const [data, setData] = useState(null);
  const { setIsLoading } = useContext(AppContext);
  const { theme } = useThemeContext(); // Sử dụng context theme

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("/relationships/");
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const navigation = useNavigation();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppHeader
        back
        title="Gia phả"
        right={{
          icon: "map",
          onPress: () => {
            navigation.navigate("FamilyMap");
          },
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data ? (
          <FamilyTree data={data} />
        ) : (
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Đang tải dữ liệu gia phả...
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    padding: 10,
  },
  nodeContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0,
    minWidth: 250,
    position: "relative",
  },
  gradientLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
  },
  nodeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
  },
  textInfo: {
    flex: 1,
  },
  personName: {
    maxWidth: 150,
    fontSize: 16,
    fontWeight: "bold",
  },
  dateInfo: {
    fontSize: 12,
    marginTop: 5,
  },
  detailButton: {
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default FamilyTreeScreen;
