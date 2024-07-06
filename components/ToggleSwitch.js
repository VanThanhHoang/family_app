import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.toggleContainer, isOn ? styles.onContainer : styles.offContainer]}>
      <View style={styles.circle}></View>
      <Text style={[styles.text, isOn ? styles.onText : styles.offText]}>{isOn ? 'ON' : 'RIP'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 100,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  onContainer: {
    backgroundColor: 'green',
  },
  offContainer: {
    backgroundColor: 'red',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  onText: {
    color: 'white',
  },
  offText: {
    color: 'white',
  },
});

export default ToggleSwitch;
