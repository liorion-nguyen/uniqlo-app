import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParams } from "./config";
import Home from "../screens/main/Home/Home";
import ProductDetail from "../screens/main/Home/ProductDetail";
import Cart from "../screens/main/Home/Cart";
import Message from "../screens/main/Home/Message";
import MessageDetail from "../screens/main/Home/MessageDetail";
import Discount from "../screens/main/Home/Discount";
import Categories from "../screens/main/Home/Categories";
import CategoryDetail from "../screens/main/Home/CategoryDetail";
import Payment from "../screens/main/Home/Payment";

const Stack = createStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Discount" component={Discount} options={{ headerShown: false }} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
