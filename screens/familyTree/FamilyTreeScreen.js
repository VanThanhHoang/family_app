import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Animated } from "react-native";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { APP_CONSTANTS } from "../../helper/constant";
import { Ionicons } from "@expo/vector-icons";

const FamilyTreeNode = ({ person, level, onToggle }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(level < 1);
  const [animation] = useState(new Animated.Value(level < 1 ? 1 : 0));

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

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10000], // Adjust this value based on your content
  });

  return (
    <View style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.nodeHeader}>
        <View style={styles.personInfo}>
          <Image source={{ uri: person.profile_picture ?? APP_CONSTANTS.defaultAvatar}} style={styles.profileImage} />
          <View style={styles.textInfo}>
            <Text style={styles.personName}>{person.full_name_vn}</Text>
            <Text style={styles.dateInfo}>
              {formatDate(person.birth_date)} 
              {person.death_date && ` - ${formatDate(person.death_date)}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailBirthDay", {
                id: person.people_id,
              });
            }}
            style={{
              ...styles.detailButton,
              marginRight:!person.children.length > 0 &&24
            }}
          >
            <Text style={styles.detailButtonText}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
        {person.children && person.children.length > 0 && (
          <Animated.View style={{ transform: [{ rotate: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
          }) }] }}>
            <Ionicons name="chevron-forward" size={24} color="#8B4513" />
          </Animated.View>
        )}
      </TouchableOpacity>
      {person.children && person.children.length > 0 && (
        <Animated.View style={{ maxHeight, overflow: 'hidden' }}>
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
      paddingBottom:100
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

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("/relationships/");
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

  return (
    <View style={styles.container}>
      <AppHeader back title="Gia phả" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data ? (
          <FamilyTree data={data} />
        ) : (
          <Text style={styles.loadingText}>Đang tải dữ liệu gia phả...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    // Beige background for a classic look
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    padding: 10,
  },
  nodeContainer: {
    marginVertical: 5,
    backgroundColor: '#FFF8DC',
    borderWidth:0, // Cornsilk background for nodes
    borderLeftWidth: 2,
    borderColor: '#DEB887', // Burlywood border
    minWidth: 250,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap:10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#8B4513', // SaddleBrown border for image
  },
  textInfo: {
    flex: 1,
  },
  personName: {
    maxWidth: 150,
    fontSize: 16,
    fontWeight: "bold",
    color: '#8B4513', // SaddleBrown text
  },
  dateInfo: {
    fontSize: 12,
    color: '#A0522D', // Sienna text for dates
    marginTop: 5,
  },
  detailButton: {
    backgroundColor: '#DEB887', // Burlywood background
    padding: 5,
    borderRadius: 5,
    width: 70,
    justifyContent: 'center',
    alignItems:'center'
  },
  detailButtonText: {
    color: '#8B4513', // SaddleBrown text
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: 'center',
    color: '#8B4513', // SaddleBrown text
    fontSize: 16,
    marginTop: 20,
  },
});

export default FamilyTreeScreen;
