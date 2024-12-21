import { HStack, Image, Text, ScrollView, Button } from "native-base";
import { VStack } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { updateStatusOrder } from "../../redux/slices/order";
import { dispatch } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";

export default function ItemOrder({ data, status }: any) {
    const navigation = useNavigation<any>();
    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    const handleButtonOrder = (id: string, productId: string) => {
        if (status == "Cancelled") {
            navigation.navigate("TabNav", {
                screen: "HomeStack",
                params: {
                  screen: "ProductDetail",
                  params: {
                    productId,
                  },
                },
              });
        }
        if (status == "Completed") {
            navigation.navigate("TabNav", {
                screen: "HomeStack",
                params: {
                  screen: "ProductDetail",
                  params: {
                    productId,
                  },
                },
              });
        }
        if (status == "Pending") {
            Alert.alert(
                "Xác nhận huỷ đơn hàng",
                "Bạn có chắc chắn muốn huỷ đơn hàng này?",
                [
                    {
                        text: "Không",
                        onPress: () => console.log("Huỷ bỏ huỷ đơn hàng"),
                        style: "cancel",
                    },
                    {
                        text: "Có",
                        onPress: () => {
                            dispatch(updateStatusOrder(id, "Cancelled"));
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };
    return (
        <ScrollView>
            {
                data.map((item: any) => (
                    <VStack key={item.id} style={styles.orderContainer}>
                        <Text style={styles.orderDate}>Date Buy: {formatDate(item.updatedAt)}</Text>
                        {
                            item.orderItems.map((orderItem: any) => (
                                <HStack key={orderItem.id} style={styles.itemContainer} space={3}>
                                    <Image
                                        source={{
                                            uri: orderItem.Product_images[0] || "https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common/img/product/relatedProduct/relatedProduct_26_01.jpg?240112"
                                        }}
                                        alt="product"
                                        style={styles.productImage}
                                    />
                                    <VStack style={styles.itemDetailsContainer}>
                                        <HStack>
                                            <Text style={styles.itemOrderText}>Product Name: </Text>
                                            <Text
                                                style={styles.itemOrderValue}
                                                numberOfLines={1}
                                            >
                                                {orderItem.Product_name || "Không xác định"}
                                            </Text>
                                        </HStack>
                                        <HStack>
                                            <Text style={styles.itemOrderText}>Quantity: </Text>
                                            <Text style={styles.itemOrderValue}>{orderItem.count}</Text>
                                        </HStack>
                                        <HStack>
                                            <Text style={styles.itemOrderText}>Price: </Text>
                                            <Text style={styles.itemOrderValue}>{orderItem.Product_price} $</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            ))
                        }
                        <HStack justifyContent="space-between">
                            {
                                status !== "Processing" && (
                                    <Button onPress={() => handleButtonOrder(item.id, item.orderItems[0].id)}>
                                        {status == "Cancelled" ? "Buy Again" : (status === "Completed" ? "Review Product" : (status === "Processing" ? "Cancel Order" : "Cancel"))}
                                    </Button>
                                )
                            }
                            <Text style={styles.totalAmount}>Total: {item.finalAmount} $</Text>
                        </HStack>
                    </VStack>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: "#f9f9f9",
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    orderDate: {
        fontSize: 14,
        color: "#888",
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    itemOrderText: {
        fontSize: 14,
        color: "#555",
        width: 100, // Giới hạn chiều rộng
        flexWrap: 'nowrap', // Không xuống dòng
    },
    itemOrderValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
        width: 150, // Giới hạn chiều rộng
        overflow: "hidden",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        color: "#333",
        marginTop: 10,
    },
});
