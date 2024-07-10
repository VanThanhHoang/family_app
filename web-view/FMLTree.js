import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { familyData } from './json';

const FamilyTreeNode = ({ person }) => {
  return (
    <View style={styles.node}>
      <View style={styles.personInfo}>
        <Text style={styles.name}>{person.full_name_vn}</Text>
        <Text style={styles.details}>
          {person.birth_date} - {person.death_date || 'Hiện tại'}
        </Text>
      </View>
      {person.children && person.children.length > 0 && (
        <View style={styles.childrenContainer}>
          {person.children.map((child, index) => (
            <FamilyTreeNode key={child.people_id} person={child} />
          ))}
        </View>
      )}
    </View>
  );
};

const FamilyTree = ({ data }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <ScrollView>
          <View style={styles.tree}>
            <FamilyTreeNode person={familyData} />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tree: {
    padding: 20,
    minWidth: width,
    minHeight: height,
  },
  node: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  personInfo: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    minWidth: 150,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
  childrenContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 20,
    marginLeft: 20,
  },
});

export default FamilyTree;  