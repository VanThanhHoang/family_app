import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: 230,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: 'left',
    textTransform: 'uppercase', // Convert text to uppercase
  },
  memberContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradientLine: {
    width: 5,
    height: '100%',
    marginRight: 10,
    borderRadius: 10,
  },
  profileColumn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, // Space between profile and details
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50, // Make it a perfect circle
    marginRight: 10,
  },
  detailsColumn: {
    flexDirection: "column",
    justifyContent: "flex-start", // Align items to the top
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberBirthDate: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2, // Space between name and birthdate
  },
  memberRelationship: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2, // Space between birthdate and relationship
  },
});

export default styles;
