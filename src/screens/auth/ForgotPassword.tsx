import { StyleSheet } from "react-native";
import React, { useState } from "react";
import AuthBg from "../../components/AuthBg";
import { Center, Column, FormControl, Heading, Stack, Text } from "native-base";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { forgotPassword } from "../../redux/slices/authentication";
import { dispatch } from "../../redux/store";

type Props = {} & NativeStackScreenProps<AuthStackParams, "ForgotPassword">;

const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const handleForgotPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (emailRegex.test(email)) {
      await dispatch(forgotPassword(email));
      navigation.navigate("OTPInput", { email });
    } else {
      alert("Vui lòng nhập địa chỉ email hợp lệ.");
    }
  };
  return (
    <AuthBg>
      <Stack space="6">
        <Center>
          <Heading color="primary.600" fontSize="xl" mb="2">
            Quên mật khẩu
          </Heading>
          <Text color="coolGray.300">Nhập email để đặt lại mật khẩu</Text>
        </Center>
        <Column space="6">
          <FormControl>
            <FormInput label="Email" value={email} onChangeText={setEmail} />
          </FormControl>
          <FormButton onPress={handleForgotPassword}>
            Tiếp tục
          </FormButton>
          <FormButton onPress={() => navigation.goBack()}>
            Quay lại
          </FormButton>
        </Column>
      </Stack>
    </AuthBg>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
