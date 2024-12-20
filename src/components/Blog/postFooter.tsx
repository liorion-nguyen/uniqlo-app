import React from "react";
import { Row, Text } from "native-base";

type Props = {
    nTitle?: string;
    nComment?: number;
};

const PostFooter = ({ nTitle = "", nComment = 0 }: Props) => {
    return (
        <Row alignItems="center" mt="3">
            <Row alignItems="center" flex="1" space="1">
                <Text color="coolGray.300" fontSize="md" numberOfLines={1} fontWeight="bold">
                    {nTitle}
                </Text>
            </Row>
            <Text color="coolGray.300" fontSize="md">
                {nComment} bình luận
            </Text>
        </Row>
    );
};

export default PostFooter;