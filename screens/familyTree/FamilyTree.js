import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { APP_CONSTANTS } from "../../helper/constant";

const FamilyTree = ({ data, ...props }) => {
  const hasChildren = (member) => member.children && member.children.length > 0;

  const renderMember = (member) => {
    return (
      <View style={props.nodeStyle}>
        <Image
          style={props.imageStyle}
          source={{
            uri: member.profile_picture || APP_CONSTANTS.defaultAvatar,
          }}
        />
        <Text style={{ ...props.nodeTitleStyle, color: props.nodeTitleColor }}>
          {member.full_name_vn}
        </Text>
        <Text style={{ fontSize: 10, color: props.nodeTitleColor }}>
          {member.birth_date}
        </Text>
        {member.death_date && (
          <Text style={{ fontSize: 10, color: props.nodeTitleColor }}>
            {member.death_date}
          </Text>
        )}
      </View>
    );
  };

  const renderTree = (members, level) => {
    return (
      <FlatList
        data={members}
        horizontal={true}
        contentContainerStyle={{ padding: 50 }}
        keyExtractor={(item) => {
          return new Date().getTime().toString();
        }}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: props.siblingGap / 2,
              paddingRight: props.siblingGap / 2,
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
                  stroke={props.pathColor}
                  strokeWidth={props.strokeWidth}
                />
              </Svg>
            )}
            {hasChildren(item) && (
              <View style={{ flexDirection: "row" }}>
                {item.children.map((child, index) => (
                  <View key={child.people_id}>
                    <Svg height="50" width="100%">
                      <Line
                        x1="50%"
                        y1="0"
                        x2="50%"
                        y2="100%"
                        stroke={props.pathColor}
                        strokeWidth={props.strokeWidth}
                      />
                      {item.children.length > 1 &&
                        index < item.children.length - 1 && (
                          <Line
                            x1="50%"
                            y1={props.strokeWidth / 2}
                            x2="100%"
                            y2={props.strokeWidth / 2}
                            stroke={props.pathColor}
                            strokeWidth={props.strokeWidth}
                          />
                        )}
                      {index > 0 && (
                        <Line
                          x1="0"
                          y1={props.strokeWidth / 2}
                          x2="50%"
                          y2={props.strokeWidth / 2}
                          stroke={props.pathColor}
                          strokeWidth={props.strokeWidth}
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
    <View style={{ flex: 1 }}>
      <Text style={{ ...props.titleStyle, color: props.titleColor }}>
        {props.title}
      </Text>
      {renderTree([data], 1)}
    </View>
  );
};

FamilyTree.defaultProps = {
  title: "My Family Tree",
  titleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  titleColor: "black",
  nodeStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  nodeTitleStyle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  pathColor: "#00ffd8",
  siblingGap: 50,
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  nodeTitleColor: "#000000",
  strokeWidth: 2,
};

export default FamilyTree;
