import { Button, Text, VStack } from "native-base";

import { Box } from "native-base";

import { HStack } from "native-base";
import RecommendedProducts from "../../Common/recommendedProducts";
import { ProductType } from "../../../types/redux/product";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "../../../redux/store";
import { RootState } from "../../../redux/store";

const ProductFavorites = () => {
    const { favorites } = useSelector((state: RootState) => state.products);
    const navigation = useNavigation<any>();
    return (
        <Box style={{ gap: 4 }}>
            <Box style={styles.header}>
                <Text fontSize="lg" fontWeight="bold">Sản phẩm yêu thích</Text>
                <Button onPress={() => {}} variant="link">
                    <Text fontSize="sm" color="#816551">View all</Text>
                </Button>
            </Box>
            <RecommendedProducts productsProps={favorites} />
        </Box>
    )
}

export default ProductFavorites;
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})  