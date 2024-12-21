import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Spinner } from "native-base";
import PostCard from "../../../components/Blog/postCard";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "../../../redux/store";
import { getBlogs } from "../../../redux/slices/blog";

const PostList = () => {
    const [loading, setLoading] = useState(true);
    const { blogs } = useSelector((state: RootState) => state.blog);
    useEffect(() => {
        async function fetchBlogs() {
            await dispatch(getBlogs());
            setLoading(false);
        }
        fetchBlogs();
    }, []);
    return (
        <>
            {
                loading ? <View style={styles.loadingContainer} >
                    <Spinner size="lg" color="red.500" />
                </View> :
                    <FlatList
                        data={blogs}
                        renderItem={({ item, index }) => <PostCard post={item} mt={index === 0 ? "0" : "2"} />}
                        bg="coolGray.800"
                        showsVerticalScrollIndicator={false}
                        px="2"
                        py="3"
                    />
            }
        </>


    );
};

export default PostList;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 