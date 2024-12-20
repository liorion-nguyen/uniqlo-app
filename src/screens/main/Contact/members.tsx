import { Link } from 'native-base';
import { Box, Text } from 'native-base';
import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Members = ({ data }: { data: any }) => {
    const renderItem = ({ item }: { item: any }) => (
        <Box key={item.index} bg="white" shadow={2} borderRadius="lg" p={4} alignItems="center">
            <Link href={item.link} isExternal>
                <Image
                    source={item.image}
                    alt={item.name}
                    style={styles.image}
                />
            </Link>
            <Text fontWeight="bold" fontSize="lg">
                {item.name}
            </Text>
            <Text textAlign="center" color="gray.600">
                {item.description}
            </Text>
        </Box>
    );

    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width - 40}
            itemWidth={Dimensions.get('window').width - 40}
        />
    );
};

const styles = StyleSheet.create({
    image: { width: '100%', height: 200, borderRadius: 10 },
});
export default Members;
