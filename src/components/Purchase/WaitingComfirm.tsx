import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NoOrders from "../Common/noOrders";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { OrderType } from "../../types/redux/order";
import ItemOrder from "./ItemOrder";
import { VStack } from "native-base";

export default function WaitingComfirm() {
    const [waitingConfirm, setWaitingConfirm] = useState<OrderType[]>([]);
    const orders = useSelector((state: RootState) => state.orders.orders);
    useEffect(() => {
        setWaitingConfirm(orders.filter((order: OrderType) => order.status == "Pending"));
    }, [orders]);

    return (
        <View>
            {
                waitingConfirm.length > 0 ? (
                    <VStack>
                        <Text style={styles.waitingComfirmText}>Waiting Confirm</Text>
                        <ItemOrder data={waitingConfirm} status="Pending" />
                    </VStack>
                ) : (
                    <NoOrders />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    waitingComfirmText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});