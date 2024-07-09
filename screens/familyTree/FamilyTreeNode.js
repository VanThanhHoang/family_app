import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FamilyTreeNode = ({ person, level, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onToggle();
  };

  return (
    <View style={[styles.nodeContainer, { marginLeft: level * 20 }]}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.personName}>{person.full_name_vn}</Text>
        {person.children && person.children.length > 0 && (
          <Text>{expanded ? '▼' : '▶'}</Text>
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

const FamilyTree = ({ data }) => {
  const [, forceUpdate] = useState();

  const handleToggle = () => {
    forceUpdate({});
  };

  return (
    <FlatList
      data={[data]}
      horizontal
      renderItem={({ item }) => (
        <FamilyTreeNode person={item} level={0} onToggle={handleToggle} />
      )}
      keyExtractor={(item) => item.people_id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FamilyTree;