import { Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import NoOrders from "../Common/noOrders";
import { OrderType } from "../../types/redux/order";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ItemOrder from "./ItemOrder";

export default function Cancel() {
    const [cancel, setCancel] = useState<OrderType[]>([]);
    const orders = useSelector((state: RootState) => state.orders.orders);
    useEffect(() => {
        setCancel(orders.filter((order: OrderType) => order.status == "Cancelled"));
    }, [orders]);
    return (
        <View>
            {
                cancel.length > 0 ? (
                    <VStack>
                        <Text style={styles.cancelText}>Cancelled</Text>
                        <ItemOrder data={cancel} status="Cancelled" />
                    </VStack>
                ) : (
                    <NoOrders />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    cancelText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});