import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  infoColumn: {
    marginLeft: 20,
    flex: 1,
  },
  memberDetailContainer: {
    padding: 0,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  detailIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  detailText: {
    fontSize: 13,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexItemRight: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
  },
  flexItemLeft: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 10,
  },
  flexItemCenter: {
    flex: 0,
    textAlign: 'center',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
    alignSelf: 'center',
    position: 'absolute',
    left: '49%',
    transform: [{ translateX: -10 }],
  },
  titleText: {
    fontSize: 16,
    fontWeight: '450',
    fontFamily: 'System',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: '450',
    fontFamily: 'System',
  },
  categoryTitle: {
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: '450',
    fontFamily: 'System',
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
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
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
    fontWeight: "450",
    marginBottom: 10,
    fontFamily: 'System',
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
    fontWeight: '450',
    fontFamily: 'System',
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
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '450',
    fontFamily: 'System',
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
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginVertical: 5,
  },
  parentAvatarsContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
  },
  spouseContainer: {
    paddingLeft: 20,
  },
  divider: {
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: 'center',
  },
  userParentsTitle: {
    fontSize: 16,
    fontWeight: '450',
    fontFamily: 'System',
    color: '#000000',
  },
  userSpouseTitle: {
    fontSize: 16,
    fontWeight: '450',
    fontFamily: 'System',
    color: '#000000',
  },
  darkModeTitle: {
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  }
});

export default styles;
