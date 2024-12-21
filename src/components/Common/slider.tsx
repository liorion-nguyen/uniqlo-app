import { Box } from 'native-base';
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const Slider = ({ data }: { data: { image: string }[] }) => {
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
          alignItems="center"
          style={styles.slide}
        >
          <Image
            source={{ uri: item.image }}
            alt="Liorion"
            style={styles.image}
          />
        </Box>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: 250, backgroundColor: "transparent" }, 
  slide: { justifyContent: 'center', alignItems: 'center', height: 250 },
  image: { width: Dimensions.get('window').width - 40, height: 250, borderRadius: 10 },
});

export default Slider;
