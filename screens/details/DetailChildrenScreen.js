import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../AppContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import AxiosInstance from "../../network/AxiosInstance";
import Icon from "react-native-vector-icons/Ionicons";
import AppHead from "../../components/AppHeader";
import AppHeader from "../../components/AppHeader";
const DetailChildrenScreen = () => {
  const [data, setData] = React.useState([]);
  const { setIsLoading } = useContext(AppContext);
  const { id } = useRoute().params;
  const navigation = useNavigation();

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

  return (
    <View style={style.container}>
     <AppHeader back title={`Gia đình ${data.full_name_vn}`} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      </View>
    </View>
  );
};
const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})
export default DetailChildrenScreen
