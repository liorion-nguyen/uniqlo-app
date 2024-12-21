import { StyleSheet, TouchableOpacity, SafeAreaView, View, ScrollView, Alert } from "react-native";
import { Box, Text, Image, HStack, VStack, Checkbox, CheckIcon, Select, Spinner } from "native-base";
import { useEffect, useState } from "react";
import { deleteCart, getCart, updateCart } from "../../../redux/slices/cart";
import { dispatch, RootState, useSelector } from "../../../redux/store";
import { CartType } from "../../../types/redux/cart";
import { useNavigation } from "@react-navigation/native";
import { getProduct } from "../../../redux/slices/product";

export default function Cart() {
    const { carts } = useSelector((state: RootState) => state.cart);
    const [products, setProducts] = useState<CartType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const fetchCart = async () => {
            await dispatch(getCart());
        }
        fetchCart();
    }, []);

    useEffect(() => {
        if (carts.length > 0) {
            const newCarts = carts.map((cart: any) => ({
                ...cart,
                isChecked: false,
            }));
            setProducts(newCarts);
            setLoading(false);
        }
    }, [carts]);

    // Giảm số lượng sản phẩm
    const handleDecreaseQuantity = async (productId: string) => {
        const product = products.find(product => product._id === productId);
        if (product?.quantity === 1) {
            Alert.alert(
                "Xác nhận xóa",
                "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng không?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        onPress: () => {
                            setProducts(products.filter(product => product._id !== productId));
                            dispatch(deleteCart(productId));
                        }
                    }
                ]
            );
        } else {
            const productsFind = products.map(product =>
                product._id === productId ? { ...product, quantity: product.quantity - 1 } : product
            );

            const product = productsFind.find(product => product._id === productId);

            if (product) {
                setProducts(productsFind);
                handleProductChange(product);
            }
        }
    };

    // Tăng số lượng sản phẩm
    const handleIncreaseQuantity = async (productId: string) => {
        const productsFind = products.map(product =>
            product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
        )
        const product = productsFind.find(product => product._id === productId);
        if (product) {
            setProducts(productsFind);
            handleProductChange(product);
        }
    };

    // Chuyển trạng thái checkbox (isChecked)
    const handleToggleCheck = (productId: string) => {
        setProducts(products.map(product =>
            product._id === productId ? { ...product, isChecked: !product.isChecked } : product
        ));
    };

    // Tính tổng tiền dựa trên checkbox (isChecked)
    const totalAmount = products.reduce((total, product) =>
        product.isChecked ? total + product.price! * product.quantity : total, 0
    ).toLocaleString();

    const handleProductChange = async (product: CartType) => {
        if (product) {
            await dispatch(updateCart(product));
        }
    };

    const handleBuy = async () => {
        if (products.length > 0) {
            const product = await dispatch(getProduct(products[0].productId));
            if (product) {
                navigation.navigate("Payment", { product: product, quantity: products[0].quantity, size: products[0].size, color: products[0].color });
            }
        }
    };
    return (
        <Box style={styles.container} safeAreaTop>
            <Box style={styles.boxHeader}>
                <Text style={styles.textTitle}>Giỏ hàng</Text>
                <Box style={styles.boxTotal}>
                    <Text style={styles.textDesTotal}>Tổng tiền: </Text>
                    <Text style={styles.textTotal}>{totalAmount}đ</Text>
                    <TouchableOpacity style={styles.button} onPress={handleBuy}>
                        <Text style={styles.textBtn}>Thanh toán</Text>
                    </TouchableOpacity>
                </Box>
            </Box>
            <View style={styles.line}></View>
            {
                loading ? <View style={styles.loading}>
                    <Spinner size="lg" />
                </View> : (
                    <ScrollView style={styles.container}>
                        {products.length > 0 && products.map((product) => (
                            <Box key={product._id} style={styles.productContainer}>
                                <HStack space={3} alignItems="center">
                                    <Checkbox
                                        value={product._id!}
                                        isChecked={product.isChecked}
                                        onChange={() => handleToggleCheck(product._id!)}
                                    />
                                    <Image source={{ uri: product.image! }} alt={product.name!} style={styles.image} />
                                    <VStack flex={1} space={2}>
                                        <Text style={styles.productName}>{product.name}</Text>
                                        <HStack style={styles.boxChoose}>
                                            <Select
                                                selectedValue={product.size}
                                                accessibilityLabel="Choose Size"
                                                placeholder="Choose Size"
                                                minWidth="100"
                                                _selectedItem={{
                                                    bg: "red.600",
                                                    endIcon: <CheckIcon size="5" />
                                                }}
                                                onValueChange={itemValue => {
                                                    const productsFind = products.map(product =>
                                                        product._id === product._id ? { ...product, size: itemValue } : product
                                                    )
                                                    const product = productsFind.find(product => product._id === product._id);
                                                    if (product) {
                                                        setProducts(productsFind);
                                                        handleProductChange(product);
                                                    }
                                                }}
                                            >
                                                {product.sizes?.map((size: string) => (
                                                    <Select.Item label={size} value={size} key={size} />
                                                ))}
                                            </Select>
                                            <Select
                                                selectedValue={product.color}
                                                accessibilityLabel="Choose Color"
                                                placeholder="Choose Color"
                                                minWidth="100"
                                                _selectedItem={{
                                                    bg: "red.600",
                                                    endIcon: <CheckIcon size="5" />
                                                }}
                                                onValueChange={itemValue => {
                                                    const productsFind = products.map(product =>
                                                        product._id === product._id ? { ...product, color: itemValue } : product
                                                    )
                                                    const product = productsFind.find(product => product._id === product._id);
                                                    if (product) {
                                                        setProducts(productsFind);
                                                        handleProductChange(product);
                                                    }
                                                }}
                                            >
                                                {product.colors?.map((color: string) => (
                                                    <Select.Item label={color} value={color} key={color} />
                                                ))}
                                            </Select>
                                        </HStack>
                                        <Box style={styles.boxPrice}>
                                            <Box style={styles.boxPriceSale}>
                                                <Text style={styles.salePrice}>{String(product.price).toLocaleString()} $</Text>
                                                {/* <Text style={styles.originalPrice}>₫{String(product.price).toLocaleString()}</Text> */}
                                            </Box>
                                            <HStack space={2} alignItems="center">
                                                <TouchableOpacity style={styles.buttonCart} onPress={() => handleDecreaseQuantity(product._id!)}>
                                                    <Text>-</Text>
                                                </TouchableOpacity>
                                                <Text>{product.quantity}</Text>
                                                <TouchableOpacity style={styles.buttonCart} onPress={() => handleIncreaseQuantity(product._id!)}>
                                                    <Text>+</Text>
                                                </TouchableOpacity>
                                            </HStack>
                                        </Box>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                    </ScrollView>
                )
            }
        </Box>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    textBtn: {
        color: "white",
        fontSize: 14,
    },
    textTotal: {
        fontSize: 14,
        color: "red",
        fontWeight: "bold",
        marginRight: 10,
    },
    textDesTotal: {
        fontSize: 14,
    },
    boxTotal: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
    },
    container: {
        padding: 10,
        flex: 1,
    },
    boxHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    line: {
        borderWidth: 0.5,
        borderColor: "grey",
        marginVertical: 10,
    },
    productContainer: {
        paddingVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    productName: {
        fontWeight: "bold",
        flex: 1
    },
    category: {
        color: "grey",
    },
    originalPrice: {
        textDecorationLine: "line-through",
        color: "grey",
        fontSize: 10,
    },
    salePrice: {
        color: "red",
        fontWeight: "bold",
        fontSize: 12,
    },
    flashSale: {
        color: "orange",
    },
    boxPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonCart: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    boxPriceSale: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    boxChoose: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    select: {
        width: 100,
    }
})