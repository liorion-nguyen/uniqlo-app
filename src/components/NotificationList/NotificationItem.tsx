import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Center, Column, Heading, Icon, Row, Text } from "native-base";
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
const NotificationItem = ({ data }: { data: any }) => {
  const fromUser = data.fromUser;
  return (
    <TouchableOpacity>
      <Row space="4" py="3">
        {fromUser.avatarUrl ? (
          <Avatar w="16" h="16" source={{ uri: fromUser.avatarUrl }} />
        ) : (
          <Center bg="white" rounded="full" w="16" h="16">
            <Icon as={MaterialIcons} name="person" color="gray" size={19} />
          </Center>
        )}
        <Column justifyContent="center" space="1" flex="1">
          <Column flex="1">
            <Row alignItems="center" space="2">
              <Heading fontSize="md" color="white">
                {fromUser.fullname}
              </Heading>
              {fromUser.role === "System" && (
                <Icon as={MaterialIcons} name="check-circle" color="primary.600" size="md" />
              )}
            </Row>
            <Text color="white" style={styles.content}>{data.content}</Text>
          </Column>
          <Row alignItems="center" space="1">
            <Icon color="coolGray.500" as={MaterialIcons} name="access-time" />
            <Text color="coolGray.500">{String(data.createdAt)}</Text>
          </Row>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  content: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1
  },
});
