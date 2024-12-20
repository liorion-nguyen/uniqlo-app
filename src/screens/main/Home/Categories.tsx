import React from 'react';
import { FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Pressable, Icon, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Categories = ({ navigation }: { navigation: any }) => {
    const { categories } = useSelector((state: RootState) => state.categories);
    const renderItem = ({ item }: { item: any }) => (
        <Pressable
            onPress={() => navigation.navigate('CategoryDetail', { categoryId: item.id })}
        >
            <HStack
                alignItems="center"
                bg="coolGray.100"
                p="4"
                mb="3"
                borderRadius="md"
                shadow="2"
            >
                <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    size="md"
                    borderRadius="full"
                    mr="4"
                />
                <VStack>
                    <Text fontSize="lg" fontWeight="bold">
                        {item.name}
                    </Text>
                    <Text color="coolGray.500">Explore topics in {item.name}</Text>
                </VStack>
                <Icon
                    as={<Ionicons name="chevron-forward" />}
                    size="lg"
                    color="coolGray.400"
                    ml="auto"
                />
            </HStack>
        </Pressable>
    );

    return (
        <Box flex="1" bg="white" safeArea>
            <Box bg="primary.500" p="4" mb="4" shadow="3">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    Categories
                </Text>
            </Box>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </Box>
    );
};

export default Categories;