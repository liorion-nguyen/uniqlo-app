import { Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import NoOrders from "../Common/noOrders";
import { OrderType } from "../../types/redux/order";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ItemOrder from "./ItemOrder";

export default function Delivering() {
    const [delivering, setDelivering] = useState<OrderType[]>([]);
    const orders = useSelector((state: RootState) => state.orders.orders);
    useEffect(() => {
        setDelivering(orders.filter((order: OrderType) => order.status == "Processing"));
    }, [orders]);
    return (
        <View>
            {
                delivering.length > 0 ? (
                    <VStack>
                        <Text style={styles.deliveringText}>Delivering</Text>
                        <ItemOrder data={delivering} status="Processing" />
                    </VStack>
                ) : (
                    <NoOrders />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    deliveringText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});