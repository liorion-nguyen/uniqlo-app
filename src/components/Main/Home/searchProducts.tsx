import { ScrollView, Text } from "native-base";
import RecommendedProducts from "../../Common/recommendedProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function SearchProducts({ search }: { search: string }) {
    const removeVietnameseTones = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    
    const { products } = useSelector((state: RootState) => state.products);
    const productsSearch = products.filter((product: any) => {
        const normalizedSearch = removeVietnameseTones(search.toLowerCase());
    
        return (
            removeVietnameseTones(product.Product_name.toLowerCase()).includes(normalizedSearch) ||
            removeVietnameseTones(product.Product_tag.toLowerCase()).includes(normalizedSearch) ||
            removeVietnameseTones(product.Product_brand.toLowerCase()).includes(normalizedSearch)
        );
    });
    return (
        <ScrollView>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>Products found</Text>
            <RecommendedProducts productsProps={productsSearch} />
        </ScrollView>
    );
}