import { useState } from "react";
import { Box, HStack, Icon, Image, Input, Text } from "native-base";
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function MessageDetail({ route }: { route: any }) {
    // const { id } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({
        id: '1',
        avatar: 'https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png',
        title: 'Liorion AI [Support 1]',
        date: '29/11',
        content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé',
        messages: [
            {
                id: '1',
                content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé',
                isUser: true,
                createdAt: '2023-10-01T12:34:56.789Z'
            },
            {
                id: '2',
                content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé',
                isUser: false,
                createdAt: '2023-10-01T12:34:56.789Z'
            },
            {
                id: '3',
                content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé',
                isUser: true,
                createdAt: '2023-10-01T12:34:56.789Z'
            },
            {
                id: '4',
                content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé',
                isUser: false,
                createdAt: '2023-10-01T12:34:56.789Z'
            },
        ]
    });

    const handleSendMessage = () => {
        setMessages({
            ...messages,
            messages: [...messages.messages, { id: (messages.messages.length + 1).toString(), content: message, isUser: true, createdAt: new Date().toISOString() }]
        });
        setMessage('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Box style={styles.header}>
                <Box style={styles.headerContent}>
                    <Image source={{ uri: messages.avatar }} style={styles.avatar} />
                    <Box style={styles.headerText}>
                        <Text style={styles.headerTitle}>{messages.title}</Text>
                        <Text style={styles.headerStatus}>Online ngay lúc này</Text>
                    </Box>
                </Box>
                <Icon as={<MaterialIcons name="more-vert" />} size={5} color="muted.400" />
            </Box>
            <ScrollView style={styles.messageList}>
                {
                    messages.messages.map((item) => (
                        <MessageItem item={item} />
                    ))
                }
            </ScrollView>
            <HStack alignItems="center" space={2} padding={2}>
                <Icon as={<MaterialIcons name="add-circle" />} size={6} color="muted.400" />
                <Input
                    placeholder="Nhập tin nhắn..."
                    flex={1}
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                />
                <Icon as={<MaterialIcons name="send" />} size={6} color={message ? 'blue.500' : 'muted.400'} onPress={handleSendMessage}/>
            </HStack>
        </SafeAreaView>
    )
}

const MessageItem = ({ item }: { item: any }) => {
    return (
        <Box style={[styles.messageItem, item.isUser ? styles.userMessage : styles.otherMessage]} key={item.id}>
            <Text style={styles.messageContent}>{item.content}</Text>
            <Text style={styles.messageTime}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </Box>
    )
}

const styles = StyleSheet.create({
    messageList: {
        gap: 10,
        padding: 10,
        backgroundColor: 'grey',
    },
    container: {
        flex: 1,
        gap: 10,
        padding: 10,
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerStatus: {
        fontSize: 12,
        color: 'gray',
    },
    avatar: {
        width: 50,
        height: 50,
    },
    inputBox: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    messageItem: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    messageContent: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
    },
    userMessage: {
        backgroundColor: 'lightgreen',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    otherMessage: {
        backgroundColor: 'lightgray',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    input: {
        fontSize: 16,             
        paddingHorizontal: 10,     
    },

})