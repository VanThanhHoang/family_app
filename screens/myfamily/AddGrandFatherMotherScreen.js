import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Checkbox, Button, Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const AddGrandFatherMotherScreen = () => {
  const navigation = useNavigation();
  const [grandFatherAlive, setGrandFatherAlive] = useState(true);
  const [grandMotherAlive, setGrandMotherAlive] = useState(true);

  const [religionVisible, setReligionVisible] = useState(false);
  const [religion, setReligion] = useState('');
  const [saintVisible, setSaintVisible] = useState(false);
  const [saint, setSaint] = useState('');

  const [registerMember, setRegisterMember] = useState(false);

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>GrandFather & GrandMother</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GrandFather Info</Text>
          <View style={styles.row}>
            <Icon name="user-circle" size={50} color="#9E9E9E" />
            <View style={styles.statusContainer}>
              <Checkbox
                status={grandFatherAlive ? 'checked' : 'unchecked'}
                onPress={() => setGrandFatherAlive(!grandFatherAlive)}
              />
              <Text style={styles.statusText}>Còn sống</Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Menu
                visible={religionVisible}
                onDismiss={() => setReligionVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setReligionVisible(true)} style={styles.dropdown}>
                    <Text>{religion ? religion : 'Religion *'}</Text>
                    <Icon name="caret-down" size={20} />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => setReligion('Religion 1')} title="Religion 1" />
                <Menu.Item onPress={() => setReligion('Religion 2')} title="Religion 2" />
                <Menu.Item onPress={() => setReligion('Religion 3')} title="Religion 3" />
              </Menu>
              <Menu
                visible={saintVisible}
                onDismiss={() => setSaintVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setSaintVisible(true)} style={styles.dropdown}>
                    <Text>{saint ? saint : 'Saint'}</Text>
                    <Icon name="caret-down" size={20} />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => setSaint('Saint 1')} title="Saint 1" />
                <Menu.Item onPress={() => setSaint('Saint 2')} title="Saint 2" />
                <Menu.Item onPress={() => setSaint('Saint 3')} title="Saint 3" />
              </Menu>
            </View>
          </View>
          <TextInput style={styles.input} placeholder="Full Name *" />
          <TextInput style={styles.input} placeholder="Birthday *" />
          <TextInput style={styles.input} placeholder="Hobbies" />
          <TextInput style={styles.input} placeholder="Occupation" />
          <TextInput style={styles.input} placeholder="Address *" />
          {!grandFatherAlive && (
            <>
              <TextInput style={styles.input} placeholder="Death Day *" />
              <TextInput style={styles.input} placeholder="Reason *" />
              <TextInput style={styles.input} placeholder="Death Address *" />
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GrandMother Info</Text>
          <View style={styles.row}>
            <Icon name="user-circle" size={50} color="#9E9E9E" />
            <View style={styles.statusContainer}>
              <Checkbox
                status={grandMotherAlive ? 'checked' : 'unchecked'}
                onPress={() => setGrandMotherAlive(!grandMotherAlive)}
              />
              <Text style={styles.statusText}>Còn sống</Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Menu
                visible={religionVisible}
                onDismiss={() => setReligionVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setReligionVisible(true)} style={styles.dropdown}>
                    <Text>{religion ? religion : 'Religion *'}</Text>
                    <Icon name="caret-down" size={20} />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => setReligion('Religion 1')} title="Religion 1" />
                <Menu.Item onPress={() => setReligion('Religion 2')} title="Religion 2" />
                <Menu.Item onPress={() => setReligion('Religion 3')} title="Religion 3" />
              </Menu>
              <Menu
                visible={saintVisible}
                onDismiss={() => setSaintVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setSaintVisible(true)} style={styles.dropdown}>
                    <Text>{saint ? saint : 'Saint'}</Text>
                    <Icon name="caret-down" size={20} />
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => setSaint('Saint 1')} title="Saint 1" />
                <Menu.Item onPress={() => setSaint('Saint 2')} title="Saint 2" />
                <Menu.Item onPress={() => setSaint('Saint 3')} title="Saint 3" />
              </Menu>
            </View>
          </View>
          <TextInput style={styles.input} placeholder="Full Name *" />
          <TextInput style={styles.input} placeholder="Birthday *" />
          <TextInput style={styles.input} placeholder="Hobbies" />
          <TextInput style={styles.input} placeholder="Occupation" />
          <TextInput style={styles.input} placeholder="Address *" />
          {!grandMotherAlive && (
            <>
              <TextInput style={styles.input} placeholder="Death Day *" />
              <TextInput style={styles.input} placeholder="Reason *" />
              <TextInput style={styles.input} placeholder="Death Address *" />
            </>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Checkbox
              status={registerMember ? 'checked' : 'unchecked'}
              onPress={() => setRegisterMember(!registerMember)}
            />
            <Text style={styles.registerText}>
              Bạn muốn tạo tài khoản đăng nhập cho ba mẹ bạn không? Để Ba Mẹ có thể xem được Gia Phả gia đình mình
            </Text>
          </View>
          {registerMember && (
            <>
              <TextInput style={styles.input} placeholder="Email *" keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Phone Number *" keyboardType="phone-pad" />
              <TextInput style={styles.input} placeholder="Password *" secureTextEntry />
              <TextInput style={styles.input} placeholder="Nhập lại Password *" secureTextEntry />
            </>
          )}
        </View>

        <Button mode="contained" onPress={() => {}} style={styles.button}>
          ACCEPT
        </Button>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statusText: {
    marginLeft: 5,
    fontSize: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  registerText: {
    flex: 1,
    marginLeft: 8,
  },
});

export default AddGrandFatherMotherScreen;
