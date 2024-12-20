import { Text } from "native-base";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import NoOrders from "../Common/noOrders";

export default function Delivering() {
    const [waitingConfirm, setWaitingConfirm] = useState([]);
    return (
        <View>
            {
                waitingConfirm.length > 0 ? (
                    <View>
                        <Text style={styles.deliveringText}>Delivering</Text>
                    </View>
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