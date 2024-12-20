import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Box,
    Heading,
    VStack,
    HStack,
    Text,
    Image,
    Button,
    Spinner,
    Center,
} from 'native-base';
import { dispatch, useAppSelector } from '../../../redux/store';
import { getCategory } from '../../../redux/slices/category';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export default function Category({ route, navigation }: { route: any, navigation: any }) {
    const { categoryId } = route.params;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { category } = useAppSelector((state) => state.categories);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            await dispatch(getCategory(categoryId));
            setLoading(false);
        };
        fetchData();
    }, [categoryId]);

    useEffect(() => {
        if (category?.products) {
            setProducts(category.products);
        }
    }, [category]);

    const renderProduct = ({ item }: { item: Product }) => (
        <Box
            borderWidth={1}
            borderRadius="md"
            borderColor="coolGray.200"
            p={3}
            mb={3}
            bg="white"
        >
            <HStack space={3} alignItems="center">
                <Image
                    source={{ uri: item.image }}
                    alt={item.name}
                    size="lg"
                    borderRadius="md"
                />
                <VStack flex={1}>
                    <Heading size="sm">{item.name}</Heading>
                    <Text color="gray.500" mt={1}>
                        ${item.price.toFixed(2)}
                    </Text>
                </VStack>
                <Button
                    colorScheme="primary"
                    size="sm"
                    onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                >
                    View
                </Button>
            </HStack>
        </Box>
    );

    return (
        <Box safeArea flex={1} bg="coolGray.100" p={4}>
            <Heading mb={4}>Products in Category</Heading>
            {loading ? (
                <Center flex={1}>
                    <Spinner size="lg" />
                    <Text mt={2} color="gray.500">
                        Loading products...
                    </Text>
                </Center>
            ) : products.length > 0 ? (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProduct}
                />
            ) : (
                <Center flex={1}>
                    <Text color="gray.500">No products found</Text>
                </Center>
            )}
        </Box>
    );
}
