import { Box, Icon, Image, Progress, Text, Toast } from "native-base";
import { ScrollView, StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import HMSTimer from "../../Common/hsmTimer";
import { useEffect, useState } from "react";

export default function FlashSale() {
    const startDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const data = [
        {
            id: 1,
            name: "Áo thun",
            price: 100,
            discount: 22,
            image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/399/392/products/6-2.png",
            totalSold: 20
        },
        {
            id: 2,
            name: "Áo phông nam",
            price: 120,
            discount: 22,
            image: "https://product.hstatic.net/200000201725/product/11_85a0e76afbc147d589df77f866acd4d8_master.jpg",
            totalSold: 60
        },
        {
            id: 3,
            name: "Quần jean nam",
            price: 219,
            discount: 55,
            image: "https://vulcano.sgp1.digitaloceanspaces.com/media/18656/quan-jean-3008c-vulcano01.webp",
            totalSold: 30
        },
        {
            id: 4,
            name: "Giày nam",
            price: 199,
            discount: 10,
            image: "https://product.hstatic.net/1000357102/product/z3735124545145_2003fc45af6d9ea033e2a5fb7f275a7a_2a5ab74c6e7b4106a122cb863d76a783_master.jpg",
            totalSold: 25
        },
        {
            id: 5,
            name: "Áo thun",
            price: 123,
            discount: 25,
            image: "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/422992/item/usgoods_57_422992_3x4.jpg?width=400",
            totalSold: 90
        }
    ]

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
                {/* <Box style={styles.viewAll}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                    <Icon as={MaterialIcons} name="arrow-right" size={8} color="coolGray.500" />
                </Box> */}
            </Box>
            <ScrollView horizontal style={styles.scrollView}>
                {
                    data.map((item) => (
                        <Box key={item.id} style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price.toLocaleString()} $</Text>
                            <Progress
                                value={item.totalSold}
                                size="xs"
                                colorScheme={item.totalSold > 20 ? "green" : "red"}
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
    name: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
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
        // gap: 10,
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