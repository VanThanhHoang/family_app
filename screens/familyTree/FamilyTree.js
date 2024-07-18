import React from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import Svg, { Line } from "react-native-svg";
import { APP_CONSTANTS } from "../../helper/constant";
import { useThemeContext } from "../../ThemeContext";

const FamilyTree = ({
  data,
  title = "My Family Tree",
  titleStyle = {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  titleColor = "black",
  nodeStyle = {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  nodeTitleStyle = {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  pathColor = "gray",
  siblingGap = 50,
  imageStyle = {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  nodeTitleColor = "#000000",
  strokeWidth = 2,
  ...props
}) => {
  const { theme } = useThemeContext();
  const effectivePathColor = theme.mode === "dark" ? "#ffffff" : pathColor;

  const hasChildren = (member) => member.children && member.children.length > 0;

  const renderMember = (member) => {
    return (
      <View style={[nodeStyle, { backgroundColor: theme.colors.card }]}>
        <Image
          style={imageStyle}
          source={{
            uri: member.profile_picture || APP_CONSTANTS.defaultAvatar,
          }}
        />
        <Text style={[nodeTitleStyle, { color: theme.colors.text }]}>
          {member.full_name_vn}
        </Text>
        <Text style={{ fontSize: 12, color: theme.colors.text, fontWeight: 'bold' }}>
          {member.birth_date}
        </Text>
        {member.death_date && (
          <Text style={{ fontSize: 12, color: theme.colors.text, fontWeight: 'bold' }}>
            {member.death_date}
          </Text>
        )}
      </View>
    );
  };

  const renderTree = (members, level) => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={members}
        horizontal={true}
        contentContainerStyle={{ padding: 50 }}
        keyExtractor={(item) => item.people_id ? item.people_id.toString() : `${level}-${Math.random()}`}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: siblingGap / 2,
              paddingRight: siblingGap / 2,
            }}
          >
            {renderMember(item)}
            {hasChildren(item) && (
              <Svg
                style={{
                  marginTop: 10,
                }}
                height="50"
                width="20"
              >
                <Line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="150"
                  stroke={effectivePathColor}
                  strokeWidth={strokeWidth}
                />
              </Svg>
            )}
            {hasChildren(item) && (
              <View style={{ flexDirection: "row" }}>
                {item.children.map((child, index) => (
                  <View key={child.people_id ? child.people_id : `${index}-${Math.random()}`}>
                    <Svg height="50" width="100%">
                      <Line
                        x1="50%"
                        y1="0"
                        x2="50%"
                        y2="100%"
                        stroke={effectivePathColor}
                        strokeWidth={strokeWidth}
                      />
                      {item.children.length > 1 &&
                        index < item.children.length - 1 && (
                          <Line
                            x1="50%"
                            y1={strokeWidth / 2}
                            x2="100%"
                            y2={strokeWidth / 2}
                            stroke={effectivePathColor}
                            strokeWidth={strokeWidth}
                          />
                        )}
                      {index > 0 && (
                        <Line
                          x1="0"
                          y1={strokeWidth / 2}
                          x2="50%"
                          y2={strokeWidth / 2}
                          stroke={effectivePathColor}
                          strokeWidth={strokeWidth}
                        />
                      )}
                    </Svg>
                    {renderTree([child], level + 1)}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} horizontal>
      <ScrollView>
        {renderTree([data], 1)}
      </ScrollView>
    </ScrollView>
  );
};

export default FamilyTree;
