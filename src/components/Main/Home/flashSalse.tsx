import { Box, Icon, Image, Progress, Text, Toast } from "native-base";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import HMSTimer from "../../Common/hsmTimer";
import { useEffect, useState } from "react";

export default function FlashSale() {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const [total, setTotal] = useState(0);
    const data = [
        {
            id: 1,
            name: "Áo thun",
            price: 100000,
            discount: 22,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 100
        },
        {
            id: 2,
            name: "Áo thun",
            price: 120000,
            discount: 22,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 60
        },
        {
            id: 3,
            name: "Áo thun",
            price: 219000,
            discount: 55,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 130
        },
        {
            id: 4,
            name: "Áo thun",
            price: 199000,
            discount: 10,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 200
        },
        {
            id: 5,
            name: "Áo thun",
            price: 123999,
            discount: 25,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 189
        }
    ]
    useEffect(() => {
        setTotal(data.reduce((acc, item) => acc + item.totalSold, 0));
    }, [data]);
    return (
        <View style={{ gap: 4 }}>
            <Box style={styles.titleBox}>
                <Box style={styles.title}>
                    <Text style={styles.titleText}>Flash Sale</Text>
                    <HMSTimer
                        startDate={startDate}
                        onTimerFinished={() => {
                            Toast.show({
                                title: "Flash Sale đã kết thúc",
                            });
                        }}
                    />
                </Box>
                <Box style={styles.viewAll}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                    <Icon as={MaterialIcons} name="arrow-right" size={8} color="coolGray.500" />
                </Box>
            </Box>
            <ScrollView horizontal style={styles.scrollView}>
                {
                    data.map((item) => (
                        <Box key={item.id} style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.price}>{item.price.toLocaleString()} $</Text>
                            <Progress
                                value={Math.round((item.totalSold / total) * 100)} // Làm tròn tỷ lệ phần trăm
                                size="xs"
                                colorScheme={item.totalSold / total * 100 > 20 ? "green" : "red"}
                                borderRadius={8}
                                style={{ width: "100%" }}
                            />

                        </Box>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    image: {
        width: 100,
        height: 100
    },
    price: {
        fontSize: 14,
        fontWeight: "500",
        color: "red",
        textAlign: "center"
    },
    scrollView: {
        gap: 20
    },
    item: {
        gap: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    viewAll: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    viewAllText: {
        fontSize: 12
    }
});