import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

const FamilyTreeNode = ({ person, level, onToggle }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(level < 1);
  const toggleExpand = () => {
    setExpanded(!expanded);
    onToggle();
  };
  console.log(level);
  return (
    <View style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <TouchableOpacity onPress={toggleExpand}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={styles.personName}>{person.full_name_vn}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailBirthDay", {
                id: person.people_id,
              });
            }}
          >
            <Text style={{ ...styles.personName, color: "#005400" }}>
              Chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        {person.children && person.children.length > 0 && (
          <Text>{expanded ? "▼" : "▶"}</Text>
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
      <View
        style={{
          width: "100%",
        }}
      >
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
  },
  personName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FamilyTreeScreen;
