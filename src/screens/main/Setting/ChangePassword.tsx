import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Column } from "native-base";
import FormInput from "../../../components/Form/FormInput";
import FormButton from "../../../components/Form/FormButton";
import { Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../../navigations/config";
import { changePasswordSchema, onInputChange } from "../../../utils/form";
import { ValidationError } from "yup";
import { dispatch, useAppSelector } from "../../../redux/store";
import { changePassword } from "../../../redux/slices/user";

type Props = StackScreenProps<RootStackParams, "ChangePassword">;

type ChangePasswordForm = {
  password: string;
  newPassword: string;
  reNewPassword: string;
};

const ChangePassword = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<ChangePasswordForm>({
    password: "",
    newPassword: "",
    reNewPassword: "",
  });

  async function onUpdatePassword() {
    const result = await dispatch(changePassword(formData.password, formData.newPassword));
    if (result) {
      navigation.goBack();
    }
  }

  function onSave() {
    Alert.alert("Thông báo", "Bạn chắc chắn muốn đổi sang mật khẩu mới", [
      {
        text: "Xác nhận",
        onPress: onUpdatePassword,
      },
      {
        text: "Hủy",
        isPreferred: true,
      },
    ]);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Column flex="1" px="5" bg="coolGray.700" pb="6" safeAreaBottom>
        <Column mt="16" space="5" flex="1">
          <FormInput
            type="password"
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            value={formData.password}
            onChangeText={onInputChange<ChangePasswordForm>("password", setFormData, formData)}
          />
          <FormInput
            type="password"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={formData.newPassword}
            onChangeText={onInputChange<ChangePasswordForm>("newPassword", setFormData, formData)}
          />
          <FormInput
            type="password"
            label="Nhập lại"
            placeholder="Nhập lại mật khẩu mới"
            value={formData.reNewPassword}
            onChangeText={onInputChange<ChangePasswordForm>("reNewPassword", setFormData, formData)}
          />
        </Column>
        <FormButton onPress={onSave}>Xong</FormButton>
      </Column>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
