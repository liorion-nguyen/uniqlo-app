import { Box, Icon, Text } from "native-base";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { ProductType } from "../../types/redux/product";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type CardProps = {
    product: ProductType;
    navigation: any;
};

export default function Card({ product, navigation }: CardProps) {
    const user = useSelector((state: RootState) => state.user.user);

    const handleOpenDetail = () => {
        navigation.navigate('ProductDetail', { productId: product.id });
    };
    return (
        <TouchableOpacity onPress={handleOpenDetail} style={styles.cardContainer}>
            <Box style={styles.imageContainer}>
                <Image source={{ uri: product.Product_images[0] }} style={styles.image} />
                <Box style={styles.favoriteIcon}>
                    <Icon
                        as={<MaterialIcons name="favorite" />}
                        size={5}
                        color={Array.isArray(product.favorite_users) && product.favorite_users.includes(user?._id || '') ? "red" : "muted.400"}
                    />
                </Box>
            </Box>
            <Box style={styles.contentContainer}>
                <Box style={styles.header}>
                    <Text style={styles.productName} numberOfLines={1}>
                        {product.Product_name}
                    </Text>
                    <Box style={styles.rating}>
                        <Icon as={<MaterialIcons name="star" />} size={4} color="yellow.500" />
                        <Text style={styles.ratingText}>{product.Product_rating}</Text>
                    </Box>
                </Box>
                <Text style={styles.price}>{product.Product_price.toLocaleString()} $</Text>
            </Box>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    contentContainer: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginLeft: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
        marginTop: 8,
    },
});
