import { StyleSheet } from "react-native";
import React from "react";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import { AuthStackParams } from "./config";
import ForgotPassword from "../screens/auth/ForgotPassword";
import OTPInput from "../screens/auth/OTPInput";
import { useTheme } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator<AuthStackParams>();

const AuthStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.coolGray[700],
          borderBottomColor: "rgba(255,255,255,0.2)",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPInput" component={OTPInput} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
