import React from "react";
import { View } from "react-native"
import AxiosInstance from "../../network/AxiosInstance";
import { AppContext } from "../../AppContext";

const FamilyTreeScreen = ()=>{
    const [data, setData] = React.useState([]);
    const { setIsLoading } = React.useContext(AppContext);
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

  React.useEffect(() => {
    getData();
  }, []);
    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }}>

    </View>
}
export default FamilyTreeScreen