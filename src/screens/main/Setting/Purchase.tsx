import WaitingComfirm from "../../../components/Purchase/WaitingComfirm";
import Delivering from "../../../components/Purchase/Delivering";
import HorizontalScrollMenu, { RouteProps } from '@nyashanziramasanga/react-native-horizontal-scroll-menu/src';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../navigations/config";
import { useEffect, useState } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";

export default function Purchase({ route }: { route: RouteProp<RootStackParams, "Purchase"> }) {
    const { purchase } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: purchase?.title || "Đơn hàng của bạn"
        });
    }, [navigation, purchase]);
    const [selectedIndex, setSelectedIndex] = useState(purchase?.id);

    const NavigationTabs = [
        { id: 1, name: 'Chờ xác nhận' },
        { id: 2, name: 'Đang giao' },
        { id: 3, name: 'Chờ giao hàng' },
        { id: 4, name: 'Đã giao' },
        { id: 5, name: 'Đã hủy' },
    ];

    const onPress = (route: RouteProps) => {
        setSelectedIndex(route.id);
    };

    const renderContent = () => {
        switch (selectedIndex) {
            case 1:
                return <WaitingComfirm />;
            case 2:
                return <Delivering />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <HorizontalScrollMenu
                items={NavigationTabs}
                onPress={onPress}
                selected={selectedIndex}
                itemWidth={120}
                scrollAreaStyle={styles.scrollArea}
            />
            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    scrollArea: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});