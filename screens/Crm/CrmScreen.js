import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Icon } from 'react-native-elements';
import CrmItem from '../../components/Crm/CrmItem';

const initialData = [
  { key: '1', label: 'Task 1' },
  { key: '2', label: 'Task 2' },
  { key: '3', label: 'Task 3' },
];

const CrmScreen = () => {
  const [data, setData] = useState(initialData);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task) {
      const newTask = { key: `${data.length + 1}`, label: task };
      setData([...data, newTask]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <DraggableFlatList
        data={data}
        renderItem={({ item, drag, isActive }) => (
          <CrmItem item={item} drag={drag} isActive={isActive} />
        )}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default CrmScreen;
