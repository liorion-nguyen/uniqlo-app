import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthBg from "../../components/AuthBg";
import { Button, Center, Column, Heading, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { OtpInput } from "react-native-otp-entry";
import FormButton from "../../components/Form/FormButton";
import { verifyCode } from "../../redux/slices/authentication";
import { dispatch } from "../../redux/store";

type Props = {} & NativeStackScreenProps<AuthStackParams, "OTPInput">;

const OTPInput = ({ navigation, route }: Props) => {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const handleVerifyCode = async () => {
    const isSuccess = await dispatch(verifyCode({ email, code }));
    if (isSuccess) {
      navigation.navigate("Login");
    }
  };

  return (
    <AuthBg>
      <Column flex="1" style={styles.row}>
        <Center>
          <Heading color="primary.600" fontSize="lg" mb="2">
            Mã xác thực OTP đã được gửi tới
          </Heading>
          <Heading color="primary.600" fontSize="lg">
            Email: {email}
          </Heading>
        </Center>
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setCode(text)}
          onFilled={(text) => setCode(text)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
        <FormButton onPress={handleVerifyCode}>Tiếp tục</FormButton>
        <FormButton variant="outline" color="primary.600" onPress={() => navigation.goBack()}>
          Quay lại
        </FormButton>
      </Column>
    </AuthBg>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    flex: 1
  },
  container: {
    height: 100,
  },
  pinCodeContainer: {
    flex: 1,
  },
  pinCodeText: {
    fontSize: 20,
  },
  focusStick: {
    backgroundColor: "green",
  },
  activePinCodeContainer: {
    backgroundColor: "green",
  },
});
