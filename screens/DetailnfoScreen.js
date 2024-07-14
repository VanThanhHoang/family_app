import { View } from "react-native";
import UserInfoItem from "./components/UserInfoItem";
import AppHeader from "../components/AppHeader";
import { Axios } from "axios";
import AxiosInstance from "../network/AxiosInstance";
import React, { useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { ScrollView } from "react-native-gesture-handler";
import { useThemeContext } from "../ThemeContext";

const DetailProfileScreen = ({navigation}) => {
  const {theme}=useThemeContext();
  const [userData, setUserData] = useState({}); //[{},{}
  
  const getUserInfo = async () => {
    try {
      const data = await AxiosInstance().get("/user-detail/update/");
      data &&
        setUserData({
          full_name_vn: data.full_name_vn,
          birth_date: data.birth_date,
          gender: data.gender,
          phone_number: data.phone_number,
          address: data.address,
          nationality: data.nationality,
          marital_status: data.marital_status,
          occupation: data.occupation,
          education_level: data.education_level,
          hobbies_interests: data.hobbies_interests,
          social_media_links: data.social_media_links,
        });
        console.log(data);  
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  let infoItem = [];
  // {
  //   "address_line": "",
  //   "city": null,
  //   "country": null,
  //   "district_or_county": null,
  //   "id": 3,
  //   "postal_code": null,
  //   "state_or_province": null
  // }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);
  const getAddressString = (address) => {
    if (address.address_line) {
      return `${address.address_line}, ${address.district_or_county}, ${address.city}, ${address.state_or_province}, ${address.country}`;
    } else {
      return "";
    }
  };
  if (userData) {
    infoItem = [
      {
        type: "full_name_vn",
        icon: "people",
        label: "Họ và tên",
        value: userData.full_name_vn,
      },
      {
        icon: "calendar",
        label: "Ngày sinh",
        value: userData.birth_date,
        type: "birth_date",
      },
      {
        icon: "male-female",
        label: "Giới tính",
        value: userData.gender,
        type: "gender",
      },
      {
        icon: "call",
        label: "Số điện thoại",
        value: userData.phone_number,
        type: "phone_number",
      },
      {
        icon: "home",
        label: "Địa chỉ",
        value: "",
        type: "address",
      },
      {
        icon: "flag",
        label: "Quốc tịch",
        value: userData.nationality,
        type: "nationality",
      },
      {
        icon: "people",
        label: "Tình trạng hôn nhân",
        value: userData.marital_status,
        type: "marital_status",
      },
      {
        icon: "school",
        label: "Trình độ học vấn",
        value: userData.education_level,
        type: "education_level",
      },
      {
        icon: "heart",
        label: "Sở thích",
        value: userData.hobbies_interests,
        type: "hobbies_interests",
      },
      {
        icon: "logo-facebook",
        label: "Liên kết mạng xã hội",
        value: userData.social_media_links,
        type: "social_media_links",
      },
    ];
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <AppHeader back title="Thông tin cá nhân" />
      {userData && (
        <ScrollView>
          {infoItem.map((item, index) => (
            <UserInfoItem
              key={index}
              {...item}
              value={
                item.type === "address"
                  ? getAddressString(userData?.address ?? {})
                  : item.value
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default DetailProfileScreen;
