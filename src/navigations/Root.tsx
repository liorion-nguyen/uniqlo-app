import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import TabNav from './TabNav';
import FillProfile from '../screens/auth/FillProfile';
import { useTheme } from 'native-base';
import { createStackNavigator } from "@react-navigation/stack";
import ChangePassword from "../screens/main/Setting/ChangePassword";
import { RootStackParams } from "./config";
import ResponseForUs from "../screens/main/Setting/ResponseForUs";
import { dispatch, RootState, useSelector } from "../redux/store";
import { getUser } from "../redux/slices/user";
import Purchase from "../screens/main/Setting/Purchase";

const Stack = createStackNavigator<RootStackParams>();

const Root = () => {
  const { colors } = useTheme();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.coolGray[700],
          },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 20 },
          headerBackTitleVisible: false,
        }}
      >
        {!user && <Stack.Screen name="Auth" component={AuthStack} />}
        {user && <Stack.Screen name="TabNav" component={TabNav} />}

        <Stack.Screen
          name="FillProfile"
          component={FillProfile}
          options={{
            title: "Your information",
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title: "Change password",
          }}
        />
        <Stack.Screen name="ResponseForUs" component={ResponseForUs} />
        <Stack.Screen name="Purchase" component={Purchase} 
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
