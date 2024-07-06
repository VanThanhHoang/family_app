import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <TouchableOpacity style={[styles.switch, isOn ? styles.on : styles.off]} onPress={toggleSwitch}>
      <Text style={[styles.text, { color: isOn ? 'green' : 'red' }]}>{isOn ? 'ON' : 'OFF'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 25,
    padding: 5,
    margin: 10,
  },
  on: {
    backgroundColor: 'green',
  },
  off: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ToggleSwitch;
