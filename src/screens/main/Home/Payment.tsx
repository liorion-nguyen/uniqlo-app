import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
    Box,
    VStack,
    HStack,
    Text,
    Divider,
    Button,
    Icon,
    Image,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import toast from 'react-native-toast-message';
import ListVoucher from '../../../components/Blog/listVoucher';
import { getDistance } from 'geolib';

interface Location {
    id: string;
    name: string;
    latitude?: number;
    longitude?  : number;
}
const Payment = ({ route }: any) => {
    const { product, quantity, size, color } = route.params;
    const userDetail = useSelector((state: RootState) => state.user.user);
    const [address, setAddress] = useState(userDetail?.address);
    const [phone, setPhone] = useState(`${userDetail?.phone.country} ${userDetail?.phone.number}`);
    const selectedDiscount = useSelector((state: RootState) => state.discounts.selectedDiscount);
    const shopLocation = { latitude: 21.0285, longitude: 105.8542 };
    const [userLocation, setUserLocation] = useState<any>(null);
    const [shippingCost, setShippingCost] = useState(0);

    useEffect(() => {
        if (userDetail?.address?.province) {
            const fetchProvinces = async (): Promise<void> => {
                try {
                    let response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
                    let provinces: { data: Location[] } = await response.json() as { data: Location[] };
                    setUserLocation({
                        latitude: provinces.data.find(p => p.id === userDetail.address.province)?.latitude,
                        longitude: provinces.data.find(p => p.id === userDetail.address.province)?.longitude
                    });
                    response = await fetch(`https://esgoo.net/api-tinhthanh/2/${userDetail.address.province}.htm`);
                    let districts: { data: Location[] } = await response.json() as { data: Location[] };
                    response = await fetch(`https://esgoo.net/api-tinhthanh/3/${userDetail.address.district}.htm`);
                    let wards: { data: Location[] } = await response.json() as { data: Location[] };
                    setAddress({
                        ward: wards.data.find(p => p.id === userDetail.address.ward)?.name || '',
                        district: districts.data.find(p => p.id === userDetail.address.district)?.name || '',
                        province: provinces.data.find(p => p.id === userDetail.address.province)?.name || '',
                    });
                } catch (error: unknown) {
                    toast.show({
                        text1: `Error fetching provinces: ${String(error)}`,
                        type: 'error',
                    });
                }
            };
            fetchProvinces();
        }
    }, []);

    useEffect(() => {
        if (userLocation) {
            const distanceInMeters = getDistance(shopLocation, userLocation);
            const cost = calculateShippingCost(distanceInMeters);
            setShippingCost(cost);
        }
    }, [userLocation]);
    const calculateShippingCost = (distanceInMeters: number) => {
        const distanceInKm = distanceInMeters / 1000; 
        let cost = 0;
        
        if (distanceInKm <= 5) {
            cost = 13000; 
        } else {
            cost = 13000 + (distanceInKm - 5) * 100; 
        }
        return Math.floor(cost * 0.001);
    };
    return (
        <Box flex={1} bg="gray.100" safeAreaTop>
            <ScrollView>
                {/* Địa chỉ */}
                <Box bg="white" p={4} mb={3}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text bold fontSize="md">
                                Địa chỉ nhận hàng
                            </Text>
                            {address && (
                                <Text color="gray.500">{address?.ward}, {address?.district}, {address?.province}</Text>
                            )}
                            <Text color="gray.500">{phone}</Text>
                        </VStack>
                        <Icon as={MaterialIcons} name="chevron-right" size={6} />
                    </HStack>
                </Box>

                {/* Thông tin sản phẩm */}
                <Box bg="white" p={4} mb={3}>
                    <Text bold fontSize="md" mb={2}>
                        Thông tin sản phẩm
                    </Text>
                    <HStack space={4} alignItems="center">
                        <Image
                            source={{ uri: product.Product_images[0] }}
                            alt={product.Product_name}
                            size="lg"
                            borderRadius="md"
                        />
                        <VStack flex={1}>
                            <Text bold>{product.Product_name}</Text>
                            <Text color="gray.500" fontSize="sm">
                                Số lượng: {quantity}
                            </Text>
                            <HStack space={2}>
                                <Text color="gray.500" fontSize="sm">
                                    Kích cỡ: {size}
                                </Text>
                                <Divider orientation="vertical" />
                                <Text color="gray.500" fontSize="sm">
                                    Màu sắc: {color}
                                </Text>
                            </HStack>
                            <Text color="red.500" bold>
                                {product.Product_price.toLocaleString()} $ x {quantity}
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Phương thức vận chuyển */}
                <Box bg="white" p={4} mb={3}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text bold fontSize="md">
                                Phương thức vận chuyển
                            </Text>
                            <Text color="gray.500">Giao hàng tiêu chuẩn ({shippingCost.toLocaleString()} $)</Text>
                        </VStack>
                        <Icon as={MaterialIcons} name="chevron-right" size={6} />
                    </HStack>
                </Box>

                {/* Voucher */}
                <Box bg="white" p={4} mb={3}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text bold fontSize="md">Voucher</Text>
                            <Text color="gray.500">{selectedDiscount?.description}</Text>
                        </VStack>
                        <ListVoucher />
                    </HStack>
                </Box>

                {/* Phương thức thanh toán */}
                <Box bg="white" p={4} mb={3}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text bold fontSize="md">Phương thức thanh toán</Text>
                            <Text color="gray.500">Thanh toán khi nhận hàng</Text>
                        </VStack>
                        <Icon as={MaterialIcons} name="chevron-right" size={6} />
                    </HStack>
                </Box>

                {/* Chi tiết thanh toán */}
                <Box bg="white" p={4} mb={3}>
                    <Text bold fontSize="md" mb={3}>
                        Chi tiết thanh toán
                    </Text>
                    <VStack space={2}>
                        <HStack justifyContent="space-between">
                            <Text>Tạm tính</Text>
                            <Text bold>{(product.Product_price * quantity).toLocaleString()} $</Text>
                        </HStack>
                        {selectedDiscount && (
                            <HStack justifyContent="space-between">
                                <Text>Voucher {selectedDiscount.description}</Text>
                                <Text bold>- {selectedDiscount.value.toLocaleString()} $</Text>
                            </HStack>
                        )}
                        <HStack justifyContent="space-between">
                            <Text>Phí vận chuyển</Text>
                            <Text bold>{shippingCost.toLocaleString()} $</Text>
                        </HStack>
                        <Divider my={2} />
                        <HStack justifyContent="space-between">
                            <Text bold fontSize="lg">Tổng thanh toán</Text>
                            <Text bold fontSize="lg" color="red.500">
                                {(product.Product_price * quantity + shippingCost - (selectedDiscount?.value || 0)).toLocaleString()} $
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
            </ScrollView>

            {/* Nút đặt hàng */}
            <Box bg="white" p={4}>
                <Button
                    bg="red.500"
                    size="lg"
                    borderRadius="md"
                    _text={{ fontWeight: 'bold', fontSize: 'lg' }}
                >
                    Đặt hàng
                </Button>
            </Box>
        </Box>
    );
};

export default Payment;
