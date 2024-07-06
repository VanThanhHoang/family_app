//Users/macm1/Documents/mobile_app/screens/components/details/PeopleDetailItem.js
import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../AppContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../network/AxiosInstance';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailScreen = () => {
    const [data, setData] = React.useState([]);
    const { setIsLoading } = useContext(AppContext);
    const { id } = useRoute().params;
    const navigation = useNavigation();

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await AxiosInstance().get("people/" + id + "/");
            console.log(res);
            setData(res);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
            >
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Detail birthday Screen</Text>
            </View>
        </View>
    )
}

export default DetailScreen;
