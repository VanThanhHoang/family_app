import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { APP_CONSTANTS } from "../../helper/constant";

const FamilyTreeNode = ({ person, level, onToggle }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(level < 1);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onToggle();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  return (
    <View style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <TouchableOpacity onPress={toggleExpand}>
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
          style={{
          }}
            onPress={() => {
              navigation.navigate("DetailBirthDay", {
                id: person.people_id,
              });
            }}
          >
            <Text style={styles.detailButton}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
        {person.children && person.children.length > 0 && (
          <Text style={styles.expandIcon}>{expanded ? "▼" : "▶"}</Text>
        )}
      </TouchableOpacity>
      {expanded && person.children && (
        <View>
          {person.children.map((child) => (
            <FamilyTreeNode
              key={child.people_id}
              person={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </View>
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
      <View style={{ width: "100%" }}>
        <AppHeader back title="Gia phả" />
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          padding: 10,
        }}
      >
        {data ? (
          <FamilyTree data={data} />
        ) : (
          <Text>Loading family tree data...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  nodeContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    backgroundColor: 'white',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textInfo: {
    flex: 1,
    justifyContent:'center',
  },
  personName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateInfo: {
    fontSize: 12,
    color: '#666',
    fontWeight:'bold',
    marginTop: 5,
  },
  detailButton: {
    color: "#005400",
    fontWeight: "bold",
  },
  expandIcon: {
    marginLeft: 10,
  },
});

export default FamilyTreeScreen;