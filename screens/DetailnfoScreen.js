import { View } from "react-native";
import UserInfoItem from "./components/UserInfoItem";
import AppHeader from "../components/AppHeader";
import { Axios } from "axios";
import AxiosInstance from "../network/AxiosInstance";
import React, { useEffect } from "react";
import { AppContext } from "../AppContext";
import { ScrollView } from "react-native-gesture-handler";

const DetailProfileScreen = () => {

  const { userData } = React.useContext(AppContext);
  let infoItem = [];
  if (userData) {
    infoItem = [
      {
        type:"full_name_vn",
        icon: "people",
        label: "Họ và tên",
        value: userData.full_name_vn,
      },
      {

        icon: "calendar",
        label: "Ngày sinh",
        value: userData.birth_date,
        type:"birth_date"
      },
      {
        icon: "male-female",
        label: "Giới tính",
        value: userData.gender,
        type:"gender"
      },
      {
        icon: "call",
        label: "Số điện thoại",
        value: userData.phone_number,
        type:"phone_number"
      },
      {
        icon: "home",
        label: "Địa chỉ",
        value: userData.address,
        type:"address"
      },
      {
        icon: "flag",
        label: "Quốc tịch",
        value: userData.nationality,
        type:"nationality"
      },
      {
        icon: "people",
        label: "Tình trạng hôn nhân",
        value: userData.marital_status,
        type:"marital_status"
      },
      {
        icon: "school",
        label: "Trình độ học vấn",
        value: userData.education_level,
        type:"education_level"
      },
      {
        icon: "heart",
        label: "Sở thích",
        value: userData.hobbies_interests,
        type:"hobbies_interests"
      },
      {
        icon: "logo-facebook",
        label: "Liên kết mạng xã hội",
        value: userData.social_media_links,
        type:"social_media_links"
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
      <ScrollView>
        {infoItem.map((item, index) => {
          return <UserInfoItem key={index} {...item} />;
        })}
      </ScrollView>
    </View>
  );
};
export default DetailProfileScreen;
