import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Ensure the content is centered horizontally
  },
  flexItemRight: {
    flex: 1, // Take equal space
    textAlign: 'right', // Align text to the right
    paddingRight: 10, // Add padding to the right
  },
  flexItemLeft: {
    flex: 1, // Take equal space
    textAlign: 'left', // Align text to the left
    paddingLeft: 10, // Add padding to the left to increase space
  },
  flexItemCenter: {
    flex: 0, // Do not take extra space
    textAlign: 'center', // Center the text within each flex item
  },
  icon: {
    fontSize: 20, // Adjust the icon size here
    marginHorizontal: 5,
    alignSelf: 'center', // Ensure the icon is centered vertically
    position: 'absolute',
    left: '49%',
    transform: [{ translateX: -10 }], // Half of the icon size to perfectly center
  },
  titleText: {
    fontSize: 16, // Adjust the title text size here
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  categoryTitle: {
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  pairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  singleMemberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  memberContainer: {
    width: '48%',
    backgroundColor: '#fafafa', // Light background for items
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  memberDetailContainer: {
    alignItems: "center",
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profilePictureSingle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 10,
  },
  textContainer: {
    alignItems: "center",
  },
  textContainerSingle: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  memberName: {
    fontSize: 16,
    textAlign: "center",
    flexShrink: 1,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  memberNameSingle: {
    fontSize: 16,
    flexShrink: 1,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  birthDate: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  birthDateSingle: {
    fontSize: 16,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  relationship: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  relationshipSingle: {
    fontSize: 18,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  addButtonGradient: {
    borderRadius: 50,
    padding: 10,
    bottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "450", // Adjust the font weight to be 450
    marginBottom: 10,
    fontFamily: 'System', // Use the default system font
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  noResultsContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  noResultsText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  resultsList: {
    width: "100%",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  closeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  parentHighlightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingBottom: 10,
  },
  parentTitle: {
    fontSize: 16, // Adjust the font size
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
  },
  parentAvatarsContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  // parentAvatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   marginHorizontal: 2,
  // },
  divider: {
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: 'center', // Align the divider to the center
  },
  userParentsTitle: {
    fontSize: 16,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
    color: '#000000', // Light mode text color
  },
  userSpouseTitle: {
    fontSize: 16,
    fontWeight: '450', // Adjust the font weight to be 450
    fontFamily: 'System', // Use the default system font
    color: '#000000', // Light mode text color
  },
  // Dark mode specific styles
  darkModeTitle: {
    color: '#ffffff', // Dark mode text color
  },
});

export default styles;
