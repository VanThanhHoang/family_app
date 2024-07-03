import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Circle } from "react-native-animated-spinkit";
const LoadingDialog = ({ open }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.dialogStyle}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "white",
                height: 150,
                borderRadius: 15,
                justifyContent: "center",
              }}
            >
              <Circle size={45} color={"white"} />
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Vui lòng chờ trong giây lát...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default LoadingDialog;
const styles = StyleSheet.create({
  dialogStyle: {
    overflow: "hidden",
    width: "85%",
    borderRadius: 25,
    backgroundColor: "white",
    alignSelf: "center",
    padding: 25,
  },
  textFieldStyle: {
    borderRadius: 25,
    backgroundColor: "black",
    borderWidth: 0,
    width: "100%",
    height: "auto",
  },
});
