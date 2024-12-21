import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Column, Pressable, Text, Image } from "native-base";
import PostOwner from "./postOwner";
import { useNavigation } from "@react-navigation/native";
import PostFooter from "./postFooter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const IMG_W = Dimensions.get("window").width;

const PostCard = ({ mt, post }: any) => {
    const navigation = useNavigation<any>();
    function goPostDetail() {
        navigation.navigate("PostDetail", { post });
    }
    async function onReactPost() {

    }

    return (
        <Pressable onPress={goPostDetail}>
            <Column p="4" space="4" mt={mt} bg="coolGray.700" rounded="lg">
                <PostOwner user={{ avatar: "", fullname: post.author }} createdAt={post.createdAt} />
                <Text color="white" fontSize="sm" numberOfLines={4}>
                    {post.content}
                </Text>
                <Column>
                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
                            alt="post-image"
                            rounded="lg"
                            w={IMG_W}
                            h={(IMG_W * 3) / 4}
                        />
                    )}
                    <PostFooter
                        nTitle={post.title}
                        nComment={post.comments.length}
                    />
                </Column>
            </Column>
        </Pressable>
    );
};

export default PostCard;

const styles = StyleSheet.create({});