import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BlogStackParams } from "./config";
import PostDetail from "../screens/main/Blog/postDetail";
import PostList from "../screens/main/Blog/postList";

const Stack = createStackNavigator<BlogStackParams>();

const BlogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default BlogStack;

const styles = StyleSheet.create({});
