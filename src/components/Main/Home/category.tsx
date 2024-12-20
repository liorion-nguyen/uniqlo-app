import { Box, Button, Image, Stack, Text } from "native-base";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Category({navigation}: any) {
    const { categories } = useSelector((state: RootState) => state.categories);
    return (
        <View style={styles.container}>
            <Box style={styles.header}>
                <Text fontSize="lg" fontWeight="bold">Category</Text>
                <Button onPress={() => navigation.navigate('Categories')} variant="link">
                    <Text fontSize="sm" color="#816551">See All</Text>
                </Button>
            </Box>
            <ScrollView horizontal style={styles.category}>
                {
                    categories.map((category) => (
                        <TouchableOpacity key={category.id} onPress={() => navigation.navigate('CategoryDetail', { categoryId: category.id })}>
                            <Box>
                                <Box style={styles.imageContainer}>
                                    <Image
                                    source={{ uri: category.image }}
                                    alt={category.name}
                                    style={styles.image}
                                />
                            </Box>
                            <Text fontSize="sm" color="white" textAlign="center">{category.name}</Text>
                        </Box>  
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    category: {
        width: "100%"
    },
    imageContainer: {
        width: 150,
        height: 150,
        backgroundColor: "#f7f2ec",
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10
    },
    image: {
        width: 100,
        height: 100
    }
});
