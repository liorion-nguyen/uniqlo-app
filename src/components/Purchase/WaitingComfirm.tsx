import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NoOrders from "../Common/noOrders";

export default function WaitingComfirm() {
    const [waitingConfirm, setWaitingConfirm] = useState([]);
    return (
        <View>
            {
                waitingConfirm.length > 0 ? (
                    <View>
                        <Text style={styles.waitingComfirmText}>WaitingComfirm</Text>
                    </View>
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
