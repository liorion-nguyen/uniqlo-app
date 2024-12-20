import { Box, Button, Image, ScrollView, Spinner, Text } from "native-base";
import { useEffect, useState } from "react";
import { Clipboard, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import { dispatch, RootState } from "../../../redux/store";
import { getDiscount } from "../../../redux/slices/discount";

export default function Discount() {
    const [loading, setLoading] = useState(true);
    const { discounts } = useSelector((state: RootState) => state.discounts);
    const [types, setTypes] = useState([
        {
            id: 1,
            title: "Voucher Free Ship",
            image: require("../../../../assets/discount/icon_freeship.png")
        },
        {
            id: 2,
            title: "Voucher Uniqlo",
            image: require("../../../../assets/discount/icon_shop.png")
        },
        {
            id: 3,
            title: "Voucher Lần Đầu",
            image: require("../../../../assets/discount/icon_first.png")
        },
        {
            id: 4,
            title: "Voucher Khác",
            image: require("../../../../assets/discount/icon_other.png")
        }
    ]);
    const [vouchers, setVouchers] = useState<any[]>([]);
    useEffect(() => {
        dispatch(getDiscount());
    }, []);
    useEffect(() => {
        if (discounts.length > 0) {
            let newVouchers: any[] = [];

            discounts.forEach((discount) => {
                const existingGroup = newVouchers.find((voucher) => voucher.title === discount.type);

                if (existingGroup) {
                    existingGroup.data.push({
                        id: discount.id,
                        description: discount.description,
                        value: discount.value,
                        code: discount.code
                    });
                } else {
                    newVouchers.push({
                        title: discount.type,
                        data: [
                            {
                                id: discount.id,
                                description: discount.description,
                                value: discount.value,
                                code: discount.code
                            }
                        ]
                    });
                }
            });
            setVouchers(newVouchers);
            setLoading(false);
        }
    }, [discounts]);
    const handleGetVoucher = (code: string) => {
        // Sao chép nội dung code vào clipboard
        Clipboard.setString(code);
        // Thông báo cho người dùng rằng voucher đã được sao chép
        toast.show({
            text1: "Voucher đã được sao chép",
            type: "success",
        });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box style={styles.containerType}>
                {
                    types.map((type) => (
                        <Box key={type.id}>
                            <Image source={type.image} alt={type.title} style={{ width: 80, height: 80 }} />
                            <Text style={styles.titleType}>{type.title}</Text>
                        </Box>
                    ))
                }
            </Box>
            <ScrollView style={{ flex: 1 }}>
                <Image source={require("../../../../assets/discount/nav.png")} alt="discount" style={{ width: "100%", height: 200, marginBottom: 10 }} />
                {
                    loading ? <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Spinner color="#1662dd" size="lg" />
                    </Box> :
                        vouchers.map((voucher) => (
                            <Box key={voucher.title} style={{ marginBottom: 20 }}>
                                <Box style={styles.containerTitleVoucher}>
                                    <Text style={styles.titleVoucher}>{voucher.title}</Text>
                                </Box>
                                {
                                    voucher.data.map((item: any) => (
                                        <Box key={item.id} style={styles.containerVoucher}>
                                            <Box style={styles.containerImageVoucher}>
                                                <Image source={require("../../../../assets/logo.png")} alt="discount" style={{ width: 60, height: 60 }} />
                                                <Text style={styles.titleType}>{item.type}</Text>
                                            </Box>
                                            <Box style={styles.containerContentVoucher}>
                                                <Text style={styles.titleDescription}>{item.description}</Text>
                                                <Text style={styles.titleValue}>{item.value.toLocaleString()} $</Text>
                                                <Button style={styles.buttonVoucher} onPress={() => { handleGetVoucher(item.code) }}>
                                                    <Text style={styles.textButtonVoucher}>Lấy Voucher</Text>
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        ))
                }
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerType: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        flexWrap: "wrap",
    },
    titleType: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
        color: "#000",
        width: 80,
        textAlign: "center",
        lineHeight: 15
    },
    titleVoucher: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    containerTitleVoucher: {
        backgroundColor: "#1662dd",
        width: "60%",
        padding: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    containerVoucher: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    containerImageVoucher: {
        backgroundColor: "#1662dd",
        padding: 10,
        borderRadius: 10,
        alignItems: "center"
    },
    containerContentVoucher: {
        flex: 1,
        padding: 10,
    },
    titleDescription: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    titleValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    buttonVoucher: {
        backgroundColor: "#1662dd",
        borderRadius: 5,
        padding: 10,
    },
    textButtonVoucher: {
        color: "white",
    }
})