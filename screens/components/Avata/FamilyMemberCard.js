import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../myfamily/MyfamilyScreenStyles";

const FamilyMemberCard = ({ member }) => {
  const navigation = useNavigation();
  const { theme: rneTheme } = useThemeContext();

  const isPrimaryUser = member.relationship === "Tôi" && member.primary === "primary";

  return (
    <View style={[styles.memberContainer, { backgroundColor: rneTheme.colors.itemBackground }]}>
      <TouchableOpacity
        style={styles.memberDetailContainer}
        onPress={() => navigation.navigate("DetailBirthDay", { id: member.people_id })}
      >
        {isPrimaryUser ? (
          <LinearGradient
            colors={[rneTheme.colors.gradientStart, rneTheme.colors.gradientEnd]}
            style={styles.gradientBorder}
          >
            <Image
              source={
                member.profile_picture
                  ? { uri: member.profile_picture }
                  : member.gender
                  ? require("../../../assets/father.png")
                  : require("../../../assets/mother.png")
              }
              style={styles.profilePicture}
            />
          </LinearGradient>
        ) : (
          <Image
            source={
              member.profile_picture
                ? { uri: member.profile_picture }
                : member.gender
                ? require("../../../assets/father.png")
                : require("../../../assets/mother.png")
            }
            style={styles.profilePicture}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.memberName, { color: rneTheme.colors.nameColor }]} numberOfLines={1} adjustsFontSizeToFit>
            {member.full_name_vn}
          </Text>
          <Text style={[styles.birthDate, { color: rneTheme.colors.birthDateColor }]}>{member.birth_date}</Text>
          <Text style={[styles.relationship, { color: rneTheme.colors.relationshipColor }]}>
            {member.education_level?.level_vn} {member.relationship}
          </Text>
          {member.parentAvatars && (
            <View style={styles.parentAvatarsContainer}>
              {member.parentAvatars.father && (
                <Image
                  source={{ uri: member.parentAvatars.father }}
                  style={styles.parentAvatar}
                />
              )}
              {member.parentAvatars.mother && (
                <Image
                  source={{ uri: member.parentAvatars.mother }}
                  style={styles.parentAvatar}
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FamilyMemberCard;
