import { Button, HStack, Icon, ScrollView, Text, VStack, Checkbox, Box } from "native-base";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getDiscount, selectDiscount } from "../../redux/slices/discount";
import { dispatch, RootState, useSelector } from "../../redux/store";
import { DiscountType } from "../../types/redux/discount";
import toast from "react-native-toast-message";

export default function ListVoucher() {
    const [showModal, setShowModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<DiscountType | null>(null); 
    const { discounts } = useSelector((state: RootState) => state.discounts);
    const selectedDiscount = useSelector((state: RootState) => state.discounts.selectedDiscount);

    useEffect(() => {
        const fetchDiscounts = async () => {
            await dispatch(getDiscount());
        };
        fetchDiscounts();
        if (selectedDiscount) {
            setSelectedVoucher(selectedDiscount);
        }
    }, []);

    const handleSelectVoucher = (voucher: DiscountType) => {
        setSelectedVoucher(voucher);
    };

    const handleConfirm = () => {
        if (selectedVoucher) {
            dispatch(selectDiscount(selectedVoucher as DiscountType));
            setShowModal(false);
        } else {
            toast.show({
                text1: "Vui lòng chọn voucher",
                type: "error",
            });
        }
    };

    return (
        <View>
            <Pressable onPress={() => setShowModal(true)}>
                <HStack alignItems="center">
                    <Text color="gray.500">Chọn Voucher</Text>
                    <Icon as={MaterialIcons} name="chevron-right" size={6} />
                </HStack>
            </Pressable>
            <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                    <Box style={styles.modalContent}>
                        <ScrollView>
                            <VStack space={4}>
                                {discounts?.map((voucher) => (
                                    <Box key={voucher._id} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" bg={selectedVoucher?._id === voucher._id ? "green.100" : "white"}>
                                        <Pressable onPress={() => {
                                            if (selectedVoucher?._id === voucher._id) {
                                                setSelectedVoucher(null);
                                            } else {
                                                setSelectedVoucher(voucher);
                                            }
                                        }}>
                                            <HStack justifyContent="space-between">
                                                <VStack>
                                                    <Text bold>{voucher.code}</Text>
                                                    <Text>{voucher.description}</Text>
                                                    <Text color="green.500">Giảm {voucher.value}%</Text>
                                                </VStack>
                                            </HStack>
                                        </Pressable>
                                    </Box>
                                ))}

                                <Button mt={4} colorScheme="red" onPress={handleConfirm} isDisabled={!selectedVoucher}>
                                    Xác nhận
                                </Button>
                                <Button mt={2} variant="ghost" onPress={() => setShowModal(false)}>
                                    Hủy
                                </Button>
                            </VStack>
                        </ScrollView>
                    </Box>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",  // Làm mờ background khi modal hiển thị
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
    },
});
