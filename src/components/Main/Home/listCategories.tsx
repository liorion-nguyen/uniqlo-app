import { Box, FlatList, Image, ScrollView, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import toast from 'react-native-toast-message';

export default function ListCategories({ navigation }: { navigation: any }) {
    const handlePress = () => {
        toast.show({
            type: "info",
            text1: "Coming Soon",
            text2: "This feature is under development",
        })
    }
    const dataOld = [
        {
            id: 1,
            title: "Super Deal 0Đ",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnOfyHg2NCmlB5L6MiTT3Fiq7SaeGXej9BQ&s",
            handlePress: handlePress
        },
        {
            id: 2,
            title: "Goods at bargain prices",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsHxs-7hWG_IFFWxmcuNgq-TDGtHr22YrCw&s",
            handlePress: handlePress
        },
        {
            id: 3,
            title: "New Arrivals",
            image: "https://png.pngtree.com/png-clipart/20230502/original/pngtree-new-labels-vector-simple-icon-png-image_9133939.png",
            handlePress: handlePress
        },
        {
            id: 4,
            title: "Sale",
            image: "https://png.pngtree.com/png-clipart/20240310/original/pngtree-big-sale-sales-tag-icon-png-image_14555357.png",
            handlePress: handlePress
        },
        {
            id: 5,
            title: "Discount",
            image: "https://png.pngtree.com/png-vector/20220514/ourmid/pngtree-voucher-discount-vector-png-image_4609862.png",
            handlePress: () => {
                navigation.navigate("Discount");
            }
        },
        {
            id: 6,
            title: "Voucher Discount Up To 1 Million",
            image: "https://cdn-www.vinid.net/5ab07290-artboard-1-copy@3x-2-1.png",
            handlePress: handlePress
        },
        {
            id: 7,
            title: "Flash Sale",
            image: "https://png.pngtree.com/png-clipart/20201015/ourmid/pngtree-flash-sale-yellow-red-3d-png-image_2366444.jpg",
            handlePress: handlePress
        },
        {
            id: 8,
            title: "Member Discount Up To 50%",
            image: "https://png.pngtree.com/png-vector/20190226/ourlarge/pngtree-discount-up-to-50-off-label-vector-template-design-illustration-png-image_705171.jpg",
            handlePress: handlePress
        },
        {
            id: 9,
            title: "Installment 0% with Uniqlo",
            image: "https://png.pngtree.com/png-clipart/20210418/original/pngtree-vector-gold-free-installment-payment-program-png-image_6242360.jpg",
            handlePress: handlePress
        },
        {
            id: 10,
            title: "Uniqlo Mall",
            image: "https://play-lh.googleusercontent.com/8Z1ze4ruK38x5rRZaXGwuGi_wVaswyRDWZxJNTcw2t9QUZYlcQchzRxQL2DrH57nn2U=w240-h480-rw",
            handlePress: handlePress
        }
    ]
    const newData = [];
    for (let i = 0; i < dataOld.length; i += 2) {
        newData.push(dataOld.slice(i, i + 2));
    }
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {
                newData.map((item) => (
                    <Box key={item[0].id} style={styles.column}>
                        <TouchableOpacity onPress={item[0].handlePress}>
                            <Box width="50%" padding={2} key={item[0].id} style={styles.item}>
                                <Image source={{ uri: item[0].image }} alt={item[0].title} style={styles.image} />
                                <Text style={styles.title}>{item[0].title}</Text>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={item[1].handlePress}>
                            <Box width="50%" padding={2} key={item[1].id} style={styles.item}>
                                <Image source={{ uri: item[1].image }} alt={item[1].title} style={styles.image} />
                                <Text style={styles.title}>{item[1].title}</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                ))
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row"
    },
    column: {
        flexDirection: "column",
        gap: 10
    },
    item: {
        width: 100,
        height: 90,
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },
    title: {
        fontSize: 11,
        color: "white",
        textAlign: "center",
        lineHeight: 13
    }
})