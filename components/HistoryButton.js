import { TouchableOpacity, Text, Image } from "react-native";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const HistoryButton = ({ ...props }) => {
  const type = props.type;
  const [history, setHistory] = useState([]);
  const getData = async () => {
    const historyRef = collection(db, "history");
    const q = query(historyRef, orderBy("time", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      setHistory((old) => [...old, doc.data()]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("History", { history, type });
      }}
      style={{
        position: "absolute",
        margin: 10,
        right: 10,
        top: 10,
        width: 52,
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          tintColor: "white",
        }}
        source={require("../assets/history.png")}
      />
    </TouchableOpacity>
  );
};
export default HistoryButton;
