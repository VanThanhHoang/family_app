import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Checkbox, Button, Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddFatherMotherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fatherAlive, setFatherAlive] = useState(true);
  const [motherAlive, setMotherAlive] = useState(true);

  const [father, setFather] = useState({});
  const [mother, setMother] = useState({});
  const [marriageDate, setMarriageDate] = useState('');

  const [religionVisible, setReligionVisible] = useState(false);
  const [religion, setReligion] = useState('');
  const [saintVisible, setSaintVisible] = useState(false);
  const [saint, setSaint] = useState('');

  const [registerMember, setRegisterMember] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { father, mother, marriageDate } = route.params;
      if (father) {
        setFather(father);
        setFatherAlive(father.is_alive);
      }
      if (mother) {
        setMother(mother);
        setMotherAlive(mother.is_alive);
      }
      if (marriageDate) {
        setMarriageDate(marriageDate);
      }
    }
  }, [route.params]);

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Father & Mother</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Father Info</Text>
          <View style={styles.row}>
            <Icon name="user-circle" size={50} color="#9E9E9E" />
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Còn sống</Text>
              <Checkbox
                status={fatherAlive ? 'checked' : 'unchecked'}
                onPress={() => setFatherAlive(!fatherAlive)}
              />
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
          <TextInput style={styles.input} placeholder="Full Name *" value={father.full_name_vn || ''} />
          <TextInput style={styles.input} placeholder="Birthday *" value={father.birth_date || ''} />
          <TextInput style={styles.input} placeholder="Hobbies" value={father.hobbies_interests || ''} />
          <TextInput style={styles.input} placeholder="Occupation" value={father.occupation || ''} />
          <TextInput style={styles.input} placeholder="Address *" value={father.address ? father.address.address_line : ''} />
          {!fatherAlive && (
            <>
              <TextInput style={styles.input} placeholder="Death Day *" value={father.death_date || ''} />
              <TextInput style={styles.input} placeholder="Reason *" value={father.cause_of_death || ''} />
              <TextInput style={styles.input} placeholder="Death Address *" value={father.place_of_death ? father.place_of_death.address_line : ''} />
            </>
          )}
        </View>

        <View style={styles.marriageDateSection}>
          <TextInput style={styles.input} placeholder="Marriage Date *" value={marriageDate || ''} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mother Info</Text>
          <View style={styles.row}>
            <Icon name="user-circle" size={50} color="#9E9E9E" />
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Còn sống</Text>
              <Checkbox
                status={motherAlive ? 'checked' : 'unchecked'}
                onPress={() => setMotherAlive(!motherAlive)}
              />
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
          <TextInput style={styles.input} placeholder="Full Name *" value={mother.full_name_vn || ''} />
          <TextInput style={styles.input} placeholder="Birthday *" value={mother.birth_date || ''} />
          <TextInput style={styles.input} placeholder="Hobbies" value={mother.hobbies_interests || ''} />
          <TextInput style={styles.input} placeholder="Occupation" value={mother.occupation || ''} />
          <TextInput style={styles.input} placeholder="Address *" value={mother.address ? mother.address.address_line : ''} />
          {!motherAlive && (
            <>
              <TextInput style={styles.input} placeholder="Death Day *" value={mother.death_date || ''} />
              <TextInput style={styles.input} placeholder="Reason *" value={mother.cause_of_death || ''} />
              <TextInput style={styles.input} placeholder="Death Address *" value={mother.place_of_death ? mother.place_of_death.address_line : ''} />
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
  marriageDateSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
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
    marginRight: 5,
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

export default AddFatherMotherScreen;
