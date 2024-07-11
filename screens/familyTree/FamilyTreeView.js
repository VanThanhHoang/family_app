import { ScrollView, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import FamilyTree, { convertToFamilyTreeFormat } from "./FamilyTree";
import AxiosInstance from "../../network/AxiosInstance";
const FamilyMap = () => {
  const [data, setData] = useState([]);
  const { setIsLoading } = useContext(AppContext);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get("/relationships/");
      setData(res);
      console.log("data", JSON.stringify(convertToFamilyTreeFormat(res)));
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ScrollView
      
      >
         <FamilyTree    />
      </ScrollView>
     
    </View>
  );
};
export default FamilyMap;
