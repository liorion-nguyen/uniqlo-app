import { Box } from "native-base";

import { Icon, Image, Input } from 'native-base';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const messages = [
    { id: '1', avatar: 'https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png', title: 'Liorion AI [Support 1]', date: '29/11', content: 'Sản phẩm có sẵn, bạn đặt hàng ủng hộ shop nhé' },
    { id: '2', avatar: 'https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png', title: 'UNIQLO', date: '25/11', content: 'natuso: main sẽ phản hồi bạn.' },
    { id: '3', avatar: 'https://academy-manager.vercel.app/Images/chat/logo-page/icon_logo.png', title: 'Liorion AI [Support 2]', date: '24/11', content: 'shop ở HN a' },
];

const Message = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMessages = messages.filter(message =>
        message.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const renderItem = ({ item }: { item: any }) => (
        <Pressable onPress={() => navigation.navigate('MessageDetail' as never, { id: item.id })}>
            <View style={styles.item}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Box style={styles.itemContent}>
                <Box style={styles.boxTitle}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </Box>
                <Text style={styles.content}>{item.content}</Text>
                </Box>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Input w="100%" h={50}
                InputLeftElement={
                    <Icon as={<MaterialIcons name="search" />} size={5} ml="3" color="muted.400" />
                }
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                // style={styles.searchInput}
            />
            <FlatList
                data={filteredMessages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemContent: {
        flex: 1,
        flexDirection: "column",
        gap: 5
    },
    boxTitle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    item: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 5,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    content: {
        fontSize: 14
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        width: "100%",
    },
});

export default Message; 