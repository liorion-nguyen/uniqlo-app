import { Button, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Column, Divider, Icon, IconButton, Image, Row, Text, ScrollView, Heading, Avatar, Center } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostFooter from "../../../components/Blog/postFooter";
import PostOwner from "../../../components/Blog/postOwner";
import FormInput from "../../../components/Form/FormInput";
import { CommentType } from "../../../types/redux/blog";
import moment from "moment";
import { dispatch, RootState, useSelector } from "../../../redux/store";
import { sendComment } from "../../../redux/slices/blog";

const IMG_W = Dimensions.get("window").width;

const PostDetail = ({ navigation, route }: any) => {
  const { post } = route.params;
  const { user } = useSelector((state: RootState) => state.user);
  const [userComment, setUserComment] = useState("");

  async function onReactPost() {
  }

  async function onSendComment() {
    const result = await dispatch(sendComment(post.id, {
      name: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone ? `${user?.phone.country} ${user?.phone.number}` : "",
      comment: userComment,
    }))
    if (result) {
      post.comments.push({
        name: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone ? `${user?.phone.country} ${user?.phone.number}` : "",
        comment: userComment,
        createdAt: new Date(),
        avatar: user?.avatar || "",
      });
      setUserComment("");
    }
  }

  return (
    <Column bg="coolGray.700" flex="1" pt="2">
      <Row w="100%" px="2" pr="3" mb="4" space="2">
        <IconButton
          onPress={() => navigation.goBack()}
          variant="variant"
          p="0"
          icon={<Icon size="xl" as={Ionicons} name="chevron-back" color="white" />}
        />
         <PostOwner user={{avatar: "", fullname: post.author}} createdAt={post.createdAt} _stack={{ flex: "1" }}/>
      </Row>
      <Divider bg="coolGray.300" style={{ height: 0.3 }} />
      <ScrollView flex="1" px="4">
        <Column mt="4">
        <Text color="white" mb="4" fontSize="lg" fontWeight="bold">
            {post.title}
          </Text>
          <Text color="white" mb="4">
            {post.content}
          </Text>
          {post.image && (
            <Image
              source={{ uri: post.image }}
              alt="post-image"
              rounded="2xl"
              w={IMG_W}
              h={IMG_W}
            />
          )}
          <PostFooter
            nTitle={post.title}
            nComment={post.commentcount || 0}
          />
        </Column>
        <Divider my="4" bg="coolGray.300" />
        <Column>
          {post.comments.map((comment: CommentType) => (
           <Row w="100%" space="3" mb="4">
           {comment.avatar ? (
             <Avatar size="md" source={{ uri: comment.avatar }} />
           ) : (
             <Center bg="white" rounded="full" w="12" h="12">
               <Ionicons name="person-outline" color="gray" size={30} />
             </Center>
           )}
           <Column flex="1">
             <Column p="3" bg="coolGray.500" rounded="2xl" space="1">
               <Row justifyContent="space-between">
                 <Heading fontSize="md" color="white">
                   {comment.name}
                 </Heading>
                 <Text color="coolGray.300">{moment(comment.createdAt).format("DD-MM-YYYY")}</Text>
               </Row>
               <Text color="white">{comment.comment}</Text>
             </Column>
           </Column>
         </Row>
          ))}
        </Column>
      </ScrollView>
      <Divider bg="coolGray.500" />
      <Row p="2" space="4">
        <FormInput
          shadow="0"
          _stack={{ flex: 1 }}
          placeholder="Bình luận"
          value={userComment}
          onChangeText={setUserComment}
        />
        <IconButton
          variant="unstyled"
          icon={
            <Icon
              size="xl"
              as={Ionicons}
              name="send"
              color={userComment.length === 0 ? "muted.500" : "primary.600"}
            />
          }
          onPress={onSendComment}
          disabled={userComment.length === 0}
        />
      </Row>
    </Column>
  );
};

export default PostDetail;

const styles = StyleSheet.create({});