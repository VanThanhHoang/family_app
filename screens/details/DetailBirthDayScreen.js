import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AppContext } from '../../AppContext';
import { useRoute } from '@react-navigation/native';
import AxiosInstance from '../../network/AxiosInstance';

const DetailScreen = ()=>{
    const [data, setData] = React.useState([]);
    const {setIsLoading}=useContext(AppContext);
    const {id} =useRoute().params;
    console.log(id);
    const getData = async ()=>{
        setIsLoading(true);
        try {
            const res = await AxiosInstance().get("people/"+id+"/");
            console.log(res);
            setData(res);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    return (
        <View>
            <Text>Detail birthday Screen</Text>
        </View>
    )
}
export default DetailScreen;