import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { APP_CONSTANTS } from '../../helper/constant';

const FamilyTreeNode = ({ person, level, onToggle }) => {
  console.log(person);
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(level < 1);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onToggle();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  };
  console.log(person);
  return (
    <View style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.personInfo}>
            <Image source={{ uri: person.profile_image ?? APP_CONSTANTS.defaultAvatar }} style={styles.avatar} />
          <View style={styles.textInfo}>
            <Text style={styles.personName}>{person.full_name_vn}</Text>
            <Text style={styles.dateInfo}>
              {formatDate(person.date_of_birth)} 
              {person.date_of_death && ` - ${formatDate(person.date_of_death)}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailBirthDay", {
                id: person.people_id,
              });
            }}
          >
            <Text style={styles.detailButton}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
        {person.children && person.children.length > 0 && (
          <Text style={styles.expandIcon}>{expanded ? "▼" : "▶"}</Text>
        )}
      </TouchableOpacity>
      {expanded && person.children && (
        <View>
          {person.children.map((child) => (
            <FamilyTreeNode
              key={child.people_id}
              person={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    backgroundColor: 'white',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateInfo: {
    fontSize: 12,
    color: '#666',
  },
  detailButton: {
    color: '#005400',
    fontWeight: 'bold',
  },
  expandIcon: {
    marginLeft: 10,
  },
});

export default FamilyTreeNode;