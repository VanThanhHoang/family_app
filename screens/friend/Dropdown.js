import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dropdown = ({ label, options, selectedValue, onSelect, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
    const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{`${label}:`}</Text>
      <TouchableOpacity
        style={[styles.dropdown, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.selectedText, { color: theme.colors.text }]}>
          {options.find(option => option.value === selectedValue)?.label || 'Select an option'}
        </Text>
        <Icon name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color={theme.colors.text} />
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.optionsContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              <Text style={[styles.optionText, { color: theme.colors.text }]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const useStyles = theme=> StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,

  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
  },
  //cho view đè lên các view khác
  optionsContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop:10
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;