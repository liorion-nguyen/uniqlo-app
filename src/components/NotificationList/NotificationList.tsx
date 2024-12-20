import { StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "native-base";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ data }: { data: any[] }) => {
  return (
    <FlatList
      px="6"
      data={data}
      renderItem={({ item }) => <NotificationItem data={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({});
