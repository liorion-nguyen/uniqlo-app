import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const Slider = ({ data }: { data: { image: string }[] }) => {
  return (
    <Swiper
      style={styles.wrapper}
      autoplay
      loop
      showsPagination={true} // Hiển thị dấu chấm phân trang
      dotColor="rgba(255, 255, 255, 0.5)" // Màu chấm phân trang
      activeDotColor="#fff" // Màu chấm phân trang khi active
    >
      {data.map((item, index) => (
        <View style={styles.slide} key={index}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: 10,
    height: 200,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginHorizontal: 5, // Thêm khoảng cách giữa các slide
  },
  image: {
    width: Math.round(Dimensions.get('window').width),
    height: 200,
    borderRadius: 10,
  },
});

export default Slider;
