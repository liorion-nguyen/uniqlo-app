import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
// import { useAppDispatch } from "../../store";
// import { setUser } from "../../store/user.reducer";
import { Button, Center, Column, FormControl, Row, Text } from "native-base";
import FormInput from "../../components/Form/FormInput";
import AuthBg from "../../components/AuthBg";
import FormButton from "../../components/Form/FormButton";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/slices/authentication";
import { dispatch } from "../../redux/store";
type Props = {} & NativeStackScreenProps<AuthStackParams, "Login">;
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255, 'Email must be at most 255 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
});

const Login = ({ navigation }: Props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
    },
  });

  // const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onSignUp() {
    navigation.navigate("SignUp");
  }

  function onForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  async function onLoggedIn() {
    try {
      setLoading(true);
      await dispatch(login(formik.values));
    } catch (err) {
      console.error(err)
      setError("Lỗi hệ thống hoặc mạng");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingOverlay position="absolute" />}
      <AuthBg>
        <Column space="5">
          <FormControl>
            <FormInput
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              label="Email"
              keyboardType="email-address"
            />
          </FormControl>
          <FormControl>
            <FormInput
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
              type="password"
              label="Mật khẩu"
            />
          </FormControl>
          <Row justifyContent="space-between" alignItems="center">
            {error && <Text color="error.500">{error}</Text>}
            <Row flex={error ? 0 : 1} justifyContent="flex-end">
              <Button variant="link" _text={{ color: "black" }} onPress={onForgotPassword}>
                Quên mật khẩu
              </Button>
            </Row>
          </Row>
          <FormButton onPress={onLoggedIn}>Đăng nhập</FormButton>
        </Column>
        <Center flexDirection="row" w="100%" mb="8" safeAreaBottom>
          <Text color="primary.600">Bạn chưa có tài khoản?</Text>
          <Button variant="link" _text={{ color: "black" }} onPress={onSignUp}>
            Đăng ký
          </Button>
        </Center>
      </AuthBg>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
