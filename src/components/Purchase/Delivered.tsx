import { Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import NoOrders from "../Common/noOrders";
import { OrderType } from "../../types/redux/order";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ItemOrder from "./ItemOrder";

export default function Delivered() {
    const [delivered, setDelivered] = useState<OrderType[]>([]);
    const orders = useSelector((state: RootState) => state.orders.orders);
    useEffect(() => {
        setDelivered(orders.filter((order: OrderType) => order.status == "Completed"));
    }, [orders]);
    return (
        <View>
            {
                delivered.length > 0 ? (
                    <VStack>
                        <Text style={styles.deliveredText}>Delivered</Text>
                        <ItemOrder data={delivered} status="Completed" />
                    </VStack>
                ) : (
                    <NoOrders />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    deliveredText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});