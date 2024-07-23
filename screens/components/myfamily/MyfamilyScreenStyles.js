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
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    color: '#333',
  },
  categoryTitle: {
    fontSize: 15,
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
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
    fontWeight: "bold",
    textAlign: "center",
    color: '#333',
    flexShrink: 1,
  },
  memberNameSingle: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#333',
    flexShrink: 1,
  },
  birthDate: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    fontWeight: "600",
  },
  birthDateSingle: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  relationship: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
    fontWeight: "600",
  },
  relationshipSingle: {
    fontSize: 18,
    color: "#777",
    fontWeight: "600",
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
    fontWeight: "bold",
    marginBottom: 10,
    color: '#333',
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
    color: '#888',
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
    color: '#333',
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
    fontSize: 16, // Giảm kích thước phông chữ
    fontWeight: 'bold',
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
    alignSelf: 'center', // Đường chỉ mỏng ở giữa
  },
  // New styles for icon and title
  icon: {
    fontSize: 20, // Adjust the icon size here
    marginHorizontal: 5,
  },
  titleText: {
    fontSize: 16, // Adjust the title text size here
    color: '#333', // Customize the title text color
    fontWeight: '300', // Adjust the font weight to be lighter
    fontFamily: 'System', // Use the default system font
  },
});

export default styles;
