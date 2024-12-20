import { Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
export default function NoOrders() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/13539/13539700.png' }} alt="No Orders" style={styles.image} />
            <Text style={styles.text}>Bạn chưa có đơn hàng nào cả</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300,
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 13,
        color: 'black',
        height: 50,
        marginTop: 10,
    },
});