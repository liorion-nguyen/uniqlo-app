import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "../../../redux/store";
import { Favorite, getProduct } from "../../../redux/slices/product";
import { Box, Icon, Badge, Spinner } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import MenuBuy from "../../../components/Common/menuBuy";
import toast from 'react-native-toast-message';
import RecommendedProducts from "../../../components/Common/recommendedProducts";
import CustomerReview from "../../../components/Common/review";
import Slider from "../../../components/Common/slider";
import RenderHTML from "react-native-render-html";

export default function ProductDetail({ route }: { route: any }) {
    const { productId } = route.params;
    const { product } = useSelector((state: RootState) => state.products);
    const { products } = useSelector((state: RootState) => state.products);
    const user = useSelector((state: RootState) => state.user.user);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        dispatch(getProduct(productId));
    }, []);

    useEffect(() => {
        if (user && product) {
            setIsFavorite(product?.favorite_users.includes(user?._id));
        }
    }, [product]);

    function shuffleArray(array: any) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
        }
        
        return shuffled;
      }

    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Spinner size="lg" color="red.500" />
            </View>
        );
    }

    const formatProductCount = (count: number): string => {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return (count / 1000).toFixed(1) + 'k';
        } else {
            return (count / 1000000).toFixed(1) + 'm';
        }
    };

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(Favorite('remove', productId));
            toast.show({
                text1: "Xóa khỏi danh sách yêu thích",
                type: "success",
            });
        } else {
            dispatch(Favorite('add', productId));
            toast.show({
                text1: "Thêm vào danh sách yêu thích",
                type: "success",
            });
        }
        setIsFavorite(!isFavorite);
    };

    const calculateAverageRating = (reviews: { rating: number }[]) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(2);
    };

    const averageRating = calculateAverageRating(product?.reviews);

    return (
        <Box style={styles.safeArea} safeAreaTop>
            <MenuBuy product={product} />
            <ScrollView style={styles.container}>
                <Slider data={
                    product.Product_images.map((image: string) => ({ image }))
                } />

                <Box style={styles.productInfo}>
                    <View style={styles.productNameContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>{product.Product_name}</Text>
                            <Text style={styles.productPrice}>{product.Product_price.toLocaleString()} $</Text>
                        </View>
                        <View style={styles.productSoldContainer}>
                            <Text style={styles.productSold}>Đã bán {formatProductCount(product.Product_count)} sản phẩm</Text>
                            <TouchableOpacity onPress={handleFavorite}>
                                {
                                    isFavorite ?
                                        <Icon as={<MaterialIcons name="favorite" />} size={4} color="red.500" />
                                        :
                                        <Icon as={<MaterialIcons name="favorite-outline" />} size={4} color="gray.500" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.badgesContainer}>
                        {product.Product_isNewArrival && <Badge style={styles.badgeNew}>New Arrival</Badge>}
                        {product.Product_isOnSale && <Badge style={styles.badgeSale}>On Sale</Badge>}
                        {product.Product_isBestSeller && <Badge style={styles.badgeBestSeller}>Best Seller</Badge>}
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{averageRating} </Text>
                        <Icon as={<MaterialIcons name="star" />} size={5} color="yellow.500" />
                        <Text style={styles.desRatingText}>Đánh giá sản phẩm ({product?.reviews?.length})</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <RenderHTML
                        contentWidth={Dimensions.get('window').width - 20}
                        source={{ html: product.Product_description }}
                    />

                    <Text style={styles.sectionTitle}>Specifications</Text>
                    <Text style={styles.productSpecifications}>{product.Product_specifications}</Text>
                </Box>

                <CustomerReview data={product?.reviews} id={product?.id} />
                <Box style={{ padding: 10, gap: 10 }}>
                    <Box style={styles.title}>
                        <View style={styles.line}></View>
                        <Text>Có thể bạn cũng thích</Text>
                        <View style={styles.line}></View>
                    </Box>
                    <RecommendedProducts productsProps={shuffleArray(products)} />
                </Box>
            </ScrollView>
        </Box>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    productNameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productSoldContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    productSold: {
        fontSize: 12,
        color: "#666",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageSlider: {
        marginTop: 16,
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: "cover",
        marginHorizontal: 10,
        borderRadius: 10,
    },
    productInfo: {
        padding: 16,
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF6347",
        marginVertical: 8,
    },
    badgesContainer: {
        flexDirection: "row",
        marginVertical: 8,
    },
    badgeNew: {
        backgroundColor: "#4caf50",
        color: "#fff",
        marginRight: 8,
        padding: 4,
    },
    badgeSale: {
        backgroundColor: "#FF6347",
        color: "#fff",
        marginRight: 8,
        padding: 4,
    },
    badgeBestSeller: {
        backgroundColor: "#2196f3",
        color: "#fff",
        padding: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 8,
    },
    desRatingText: {
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
    },
    productDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
    },
    productSpecifications: {
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
    },
    line: {
        width: 30,
        height: 1,
        backgroundColor: "#ccc",
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    boxChoose: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 4,
    },
});
