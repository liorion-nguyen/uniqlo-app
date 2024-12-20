import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParams } from "../../../navigations/config";
import { Center, Column, Icon, Text } from "native-base";
import NotificationList from "../../../components/NotificationList/NotificationList";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { MaterialIcons } from '@expo/vector-icons';
type Props = BottomTabScreenProps<BottomTabsParams, "Notification">;

const Notification = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState<any[] | null>([
    {
      id: "1",
      fromUser: {
        avatarUrl: "https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png",
        fullname: "Uniqlo",
        role: "System",
      },
      content: "Bạn đã đăng ký thành công tài khoản.",
      createdAt: new Date(),
    },
    {
      id: "2",
      fromUser: {
        avatarUrl: "",
        fullname: "Uniqlo",
        role: "System",
      },
      content: "Bạn đã đăng ký thành công tài khoản.",
      createdAt: new Date(),
    },
    {
      id: "3",
      fromUser: {
        avatarUrl: "https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png",
        fullname: "Support Uniqlo",
        role: "Admin",
      },
      content: "Chào bạn, chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại sớm nhất.",
      createdAt: new Date(),
    },
  ]);
  return (
    <Column bg="coolGray.700" flex="1">
      {notifications === null ? <LoadingOverlay /> : (notifications.length === 0 ? <Center flex="1">
        <Icon as={MaterialIcons} color="coolGray.500" name="notifications-active" size={24} />
        <Text color="coolGray.300" mt="2">
          Không có thông báo nào
        </Text>
      </Center> : <NotificationList data={notifications} />)}
    </Column>
  );
};

export default Notification;

const styles = StyleSheet.create({});
