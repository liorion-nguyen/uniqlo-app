import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Box, Icon, Text, Button, VStack, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ProductType } from "../../types/redux/product";
import RNPickerSelect from "react-native-picker-select";
import { dispatch } from "../../redux/store";
import { addCart } from "../../redux/slices/cart";
import toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function MenuBuy({ product }: { product: ProductType }) {
    const navigation = useNavigation<any>();
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [select, setSelect] = useState("");

    const handleOpenModal = (select: string) => {
        setSelect(select);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        if (quantity > 0 && size !== "" && color !== "") {
            if (select === 'cart') {
                handleAddToCart();
            } else if (select === 'buy') {
                handleBuy();
            }
            setShowModal(false);  
        } else {
            toast.show({
                text1: "Vui lòng chọn số lượng, kích cỡ và màu sắc",
                type: "error",
            });
        }
    };

    const handleAddToCart = async () => {
        await dispatch(addCart({
            productId: product._id,
            quantity: quantity,
            size: size,
            color: color,
        }));
    };

    const handleBuy = () => {
        navigation.navigate("Payment", { product: product, quantity: quantity, size: size, color: color });
        setShowModal(false); 
    };

    return (
        <Box style={styles.container}>
            {/* Nút "Chat ngay" */}
            <TouchableOpacity style={styles.item}>
                <Icon as={MaterialIcons} name="question-answer" size={6} color="red.500" />
                <Text style={styles.text}>Chat ngay</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>

            {/* Nút "Thêm vào giỏ hàng" */}
            <TouchableOpacity style={styles.item} onPress={() => handleOpenModal('cart')}>
                <Icon as={MaterialIcons} name="add-shopping-cart" size={6} color="red.500" />
                <Text style={styles.text}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>

            {/* Nút "Mua ngay" */}
            <TouchableOpacity style={styles.buy} onPress={() => handleOpenModal('buy')}>
                <Text style={styles.buyText}>Mua ngay</Text>
                <Text style={styles.buyPrice}>{(product.Product_price * quantity).toLocaleString()} $</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                    <Box style={styles.modalContent}>
                        <ScrollView>
                            <VStack space={4}>
                                <Text style={styles.modalTitle}>Chọn thông tin sản phẩm</Text>
                                <RNPickerSelect
                                    placeholder={{
                                        label: "Chọn size",
                                        value: null,
                                    }}
                                    onValueChange={(value) => setSize(value)}
                                    value={size}
                                    items={product.Product_size?.map((size: string) => ({
                                        label: size,
                                        value: size,
                                    }))}
                                    style={{
                                        inputIOS: styles.select,
                                        inputAndroid: styles.select,
                                    }}
                                />
                                
                                <RNPickerSelect
                                    placeholder={{
                                        label: "Chọn màu",
                                        value: null,
                                    }}
                                    onValueChange={(value) => setColor(value)}
                                    value={color}
                                    items={product.Product_color?.map((color: string) => ({
                                        label: color,
                                        value: color,
                                    }))}
                                    style={{
                                        inputIOS: styles.select,
                                        inputAndroid: styles.select,
                                    }}
                                />

                                {/* Chọn số lượng */}
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text>Số lượng:</Text>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <TouchableOpacity
                                            onPress={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                                            style={styles.quantityButton}
                                        >
                                            <Text style={styles.quantityText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{quantity}</Text>
                                        <TouchableOpacity
                                            onPress={() => setQuantity((prev) => prev + 1)}
                                            style={styles.quantityButton}
                                        >
                                            <Text style={styles.quantityText}>+</Text>
                                        </TouchableOpacity>
                                    </HStack>
                                </HStack>

                                {/* Nút xác nhận */}
                                <Button mt={4} colorScheme="red" onPress={handleConfirm}>
                                    Xác nhận
                                </Button>

                                {/* Nút hủy */}
                                <Button mt={2} variant="ghost" onPress={() => setShowModal(false)}>
                                    Hủy
                                </Button>
                            </VStack>
                        </ScrollView>
                    </Box>
                </View>
            </Modal>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 50,
        width: "100%",
    },
    buy: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 10,
    },
    buyText: {
        color: "white",
        fontSize: 12,
    },
    buyPrice: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
    line: {
        width: 1,
        backgroundColor: "grey",
        height: '80%'
    },
    quantityButton: {
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 4,
        marginHorizontal: 5,
    },
    quantityText: {
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        width: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        margin: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    select: {
        width: "100%",
        backgroundColor: "#f9f9f9",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
        color: "#333",
        marginTop: 8,
    },
    iconContainer: {
        top: 10,
        right: 10,
    },
});