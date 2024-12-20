import { Box, Text } from "native-base";
import { View } from "react-native";
import { RootState, useSelector } from "../../../redux/store";
import RecommendedProducts from "../../Common/recommendedProducts";
import LoadingOverlay from "../../LoadingOverlay";
export default function Product() {
    const { products } = useSelector((state: RootState) => state.products);
    return (
        products.length > 0 ? (
            <View style={{ gap: 4 }}>
                <Box>
                    <Text fontSize="lg" fontWeight="bold">Gợi ý cho bạn</Text>
                </Box>
                <RecommendedProducts productsProps={products} />
            </View>
        ) : <LoadingOverlay />
    );
}