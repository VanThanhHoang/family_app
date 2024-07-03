// /Users/macm1/Documents/mobile_app/family_app/screens/components/ProfileScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'gray',
    resizeMode: 'cover',
  },
  userEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 15,
  },
  settingItem: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
  },
  settingItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
