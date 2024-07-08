import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../ThemeContext";

const InfoItem = ({ title, icon, label }) => {
  const { theme } = useThemeContext();
  const isInfoAvailable = title !== "Chưa cung cấp" && title !== null && title !== "";

  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={20} color={isInfoAvailable ? "#A8E063" : "#909090"} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.infoText, { color: isInfoAvailable ? theme.colors.text : "#909090" }]}>
          {title ?? "Chưa cung cấp"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 12,
    color: "#909090",
  },
  infoText: {
    fontSize: 16,
  },
});

const PeopleAllField = ({ data }) => {
  return (
    <>
      <InfoItem label="Email" title={data.email} icon="mail" />
      <InfoItem label="Ngày sinh" title={data.birth_date} icon="calendar" />
      <InfoItem label="Tuổi hiện tại" title={data.current_age} icon="hourglass" />
      <InfoItem label="Số điện thoại" title={data.phone_number} icon="call" />
      <InfoItem label="Địa chỉ" title={data?.address?.address_line} icon="location" />
      <InfoItem label="Quốc tịch" title={data.nationality} icon="flag" />
      <InfoItem label="Tình trạng hôn nhân" title={data.marital_status ? "Đã kết hôn" : "Chưa kết hôn"} icon="heart" />
      <InfoItem label="Lịch sử" title={data.history} icon="book" />
      <InfoItem label="Thành tựu" title={data.achievement} icon="trophy" />
      <InfoItem label="Nghề nghiệp" title={data.occupation} icon="briefcase" />
      <InfoItem label="Trình độ học vấn" title={data.education_level} icon="school" />
      <InfoItem label="Tình trạng sức khỏe" title={data.health_status} icon="medkit" />
      <InfoItem label="Ngày mất" title={data.death_date} icon="sad" />
      <InfoItem label="Tình trạng sống" title={data.is_alive ? "Còn sống" : "Đã mất"} icon="pulse" />
      <InfoItem label="Sở thích" title={data.hobbies_interests} icon="happy" />
      <InfoItem label="Liên kết mạng xã hội" title={data.social_media_links} icon="logo-instagram" />
      <InfoItem label="Nguyên nhân tử vong" title={data.cause_of_death} icon="alert" />
      <InfoItem label="Nơi sinh" title={data?.place_of_birth?.address_line} icon="location" />
      <InfoItem label="Nơi mất" title={data?.place_of_death?.address_line} icon="location" />
      <InfoItem label="Ngày mất" title={data?.death_info?.death_date} icon="calendar" />
      <InfoItem label="Tình trạng" title={data?.death_info?.is_alive} icon="pulse" />
      <InfoItem label="Số năm đã mất" title={data?.death_info?.years_since_death} icon="time" />
      <InfoItem label="Tuổi lúc mất" title={data?.death_info?.age_at_death} icon="hourglass" />
      <InfoItem label="Tuổi thọ" title={data?.death_info?.life_span} icon="heart" />
    </>
  );
};

export default PeopleAllField;
