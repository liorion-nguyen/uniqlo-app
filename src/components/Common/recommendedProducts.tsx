import { Box } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ProductType } from "../../types/redux/product";
import Card from "./card";
import { useNavigation } from "@react-navigation/native";

export default function RecommendedProducts({ productsProps }: { productsProps: ProductType[] }) {
    const [products, setProducts] = useState<ProductType[][]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        const newData = [];
        for (let i = 0; i < productsProps.length; i += 2) {
            newData.push(productsProps.slice(i, i + 2));
        }
        setProducts(newData);
    }, [productsProps]);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {
                products.map((product) => (
                    <Box key={product[0].id} style={[styles.row, product.length === 1 ? styles.singleCard : {}]}>
                        <Card product={product[0]} navigation={navigation} />
                        {product[1] ? (
                            <Card product={product[1]} navigation={navigation} />
                        ) : null}
                    </Box>
                ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        gap: 4,
    },
    scrollView: {
        flex: 1,
    },
    singleCard: {
        width: "50%",
    },
});