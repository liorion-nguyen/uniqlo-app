import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Box, Link, Text } from 'native-base';
import Swiper from 'react-native-swiper';

const Members = ({ data }: { data: any }) => {
    return (
        <Swiper
            style={styles.wrapper}
            showsPagination
            autoplay
            autoplayTimeout={3}
        >
            {data.map((item: any, index: number) => (
                <Box
                    key={index}
                    bg="white"
                    shadow={2}
                    borderRadius="lg"
                    p={4}
                    alignItems="center"
                    style={styles.slide}
                >
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
            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: { height: 250 }, // Chiều cao của slider
    slide: { justifyContent: 'center', alignItems: 'center', height: 250 },
    image: { width: Dimensions.get('window').width - 40, height: 200, borderRadius: 10 },
});

export default Members;