import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Column, ScrollView } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "../../../navigations/config";
import Header from "../../../components/Main/Home/header";
import Slider from "../../../components/Common/slider";
import Category from "../../../components/Main/Home/category";
import { dispatch } from "../../../redux/store";
import { getCategories } from "../../../redux/slices/category";
import { getFavorite, getProducts } from "../../../redux/slices/product";
import ListCategories from "../../../components/Main/Home/listCategories";
import Product from "../../../components/Main/Home/product";
import SurfVideos from "../../../components/Main/Home/surfVideos";
import ProductFavorites from "../../../components/Main/Home/productFavorites";
type Props = {} & StackScreenProps<HomeStackParams, "Home">;

const Home = ({ navigation }: Props) => {
  const data = [
    { title: 'Slide 1', image: 'https://laginza.com/uploads/originals/2022/02/1363-uniqlo.jpg' },
    { title: 'Slide 2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAKf6ma5PvX1t0Wc3nZW2yJPJNVGY9JCtMz8I1uM87IxuRtO-buP12hNNbvJGdxSGa60&usqp=CAU' },
    { title: 'Slide 3', image: 'https://novelty.com.vn/public/uploads/images/570x733_12.jpg' },
  ];
  useEffect(() => {
    const fetchCategory = async () => {
      await dispatch(getCategories());
      await dispatch(getFavorite());
      await dispatch(getProducts());
    };
    fetchCategory();
  }, []);
  return (
    <Column flex="1" bg="coolGray.700" safeAreaTop style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Slider data={data} />
        <ListCategories navigation={navigation} />
        {/* <FlashSale /> */}
        <SurfVideos />
        <Category navigation={navigation} />
        <ProductFavorites />
        <Product />
      </ScrollView>
    </Column>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 20
  },
  scrollView: {
    flexDirection: "column",
    gap: 40
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
