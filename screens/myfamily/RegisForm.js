// RegisterMemberForm.jsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import AppFormInput from "../../components/FormInput";
import ItemToggle from "../friend/ItemToogle";
import Button from "../../components/Button";
const RegisterMemberForm = ({}) => {
  const [registerMember, setRegisterMember] = useState(false);
  return (
    <View style={styles.section}>
      <ItemToggle
        row
        title="Đăng ký tài khoản"
        onPress={() => setRegisterMember(!registerMember)}
        icon={registerMember ? "checkmark-circle" : "close-circle"}
        color="#9E9E9E"
        colorChecked="#4CAF50"
        isChecked={registerMember}
        textChecked="Có"
        textUnchecked="Không"
      />
      <Text style={styles.registerText}>
        Bạn muốn tạo tài khoản đăng nhập cho ba mẹ bạn không? Để Ba Mẹ có thể
        xem được Gia Phả gia đình mình
      </Text>
      {registerMember && (
        <>
          <AppFormInput
            title="Email"
            onTextChange={() => {}}
            value=""
            keyboardType="email-address"
          />
          <AppFormInput
            title="Số điện thoại"
            onTextChange={() => {}}
            value=""
            keyboardType="phone-pad"
          />
          <AppFormInput
            title="Mật khẩu"
            onTextChange={() => {}}
            value=""
            secureTextEntry
          />
          <AppFormInput
            title="Nhập lại mật khẩu"
            onTextChange={() => {}}
            value=""
            secureTextEntry
          />
          <Button textColor={"white"} title={"Đăng kí"} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  registerText: {
    marginBottom: 10,
  },
});

export default RegisterMemberForm;
