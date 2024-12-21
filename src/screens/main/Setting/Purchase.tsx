import WaitingComfirm from "../../../components/Purchase/WaitingComfirm";
import Delivering from "../../../components/Purchase/Delivering";
import HorizontalScrollMenu, { RouteProps } from '@nyashanziramasanga/react-native-horizontal-scroll-menu/src';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../navigations/config";
import { useEffect, useState } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import { getOrders } from "../../../redux/slices/order";
import { dispatch } from "../../../redux/store";
import Delivered from "../../../components/Purchase/Delivered";
import Cancel from "../../../components/Purchase/Cancel";

export default function Purchase({ route }: { route: RouteProp<RootStackParams, "Purchase"> }) {
    const { purchase } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: purchase?.title || "Your Orders"
        });
    }, [navigation, purchase]);
    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(getOrders());
        };
        fetchOrders();
    }, []);
    const [selectedIndex, setSelectedIndex] = useState(purchase?.id);

    const NavigationTabs = [
        { id: 1, name: 'Waiting Confirm' },
        { id: 2, name: 'Delivering' },
        { id: 3, name: 'Delivered' },
        { id: 4, name: 'Cancelled' },
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
            case 3:
                return <Delivered />;
            case 4:
                return <Cancel />;
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
        padding: 10,
    },
    scrollArea: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});