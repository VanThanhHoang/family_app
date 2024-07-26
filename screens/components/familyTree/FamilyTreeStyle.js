import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    padding: 10,
  },
  nodeContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0,
    minWidth: 250,
    position: "relative",
  },
  gradientLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
  },
  nodeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
  },
  textInfo: {
    flex: 1,
  },
  personName: {
    maxWidth: 150,
    fontSize: 16,
    fontWeight: "bold",
  },
  dateInfo: {
    fontSize: 12,
    marginTop: 5,
  },
  detailButton: {
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default styles;
