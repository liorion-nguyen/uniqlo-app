import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Avatar, Divider, Button, Input, Select, CheckIcon, Menu, Pressable, ThreeDotsIcon } from 'native-base';
import { Rating } from 'react-native-ratings';
import { ReviewType } from '../../types/redux/product';
import { createReviewProduct, deleteReviewProduct } from '../../redux/slices/product';
import { dispatch } from '../../redux/store';

const CustomerReview = ({ data, id }: { data: ReviewType[]; id: string }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const calculateAverageRating = (reviews: { rating: number }[]) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(2);
    };

    const averageRating = calculateAverageRating(data);

    const handleRatingLabel = (value: number) => {
        if (value > 4) {
            return 'Great';
        }
        if (value > 3) {
            return 'Quite Good';
        }
        return 'Bad';
    };

    const handleSubmit = async () => {
        await dispatch(createReviewProduct(review, rating, id));
        setReview('');
        setRating(0);
    };

    return (
        <Box flex={1} p={4} bg="white">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                {'Customer Reviews'}
            </Text>

            {/* Average Rating Section */}
            <HStack alignItems="center" mb={4}>
                <Text fontSize="4xl" fontWeight="bold" mr={2}>
                    {averageRating}
                </Text>
                <Text fontSize="md">
                    {data.length} {'reviews'}
                </Text>
            </HStack>
            <Rating
                readonly
                startingValue={Number(averageRating)}
                imageSize={30}
                fractions={1}
                style={{ alignSelf: 'flex-start' }}
            />

            {/* Filters Section */}
            {/* <VStack space={3} my={4}>
                <Select
                    selectedValue=""
                    placeholder={'Filtering'}
                    _selectedItem={{
                        bg: 'gray.200',
                        endIcon: <CheckIcon size={5} />,
                    }}
                >
                    <Select.Item label={'Recommended'} value="recommended" />
                </Select>
                <Select
                    selectedValue=""
                    placeholder={'Uniqlo Type'}
                    _selectedItem={{
                        bg: 'gray.200',
                        endIcon: <CheckIcon size={5} />,
                    }}
                >
                    <Select.Item label={'All'} value="all" />
                </Select>
                <Select
                    selectedValue=""
                    placeholder={'Rating'}
                    _selectedItem={{
                        bg: 'gray.200',
                        endIcon: <CheckIcon size={5} />,
                    }}
                >
                    <Select.Item label={'All'} value="all" />
                </Select>
                <Input placeholder={'Search Here'} />
            </VStack> */}

            {/* Reviews List */}
            {data.map((review, index) => (
                <HStack key={index} w="100%" mt={2} style={{ position: 'relative' }}>
                    <VStack mb={4} space={2} w="100%">
                        <HStack alignItems="center">
                            <Avatar source={{ uri: review.avatar }} mr={3} />
                            <VStack>
                                <Text fontWeight="bold">{review.fullName}</Text>
                                <Text color="gray.500">
                                    {new Date(review.updatedAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </VStack>
                        </HStack>
                        <Rating
                            readonly
                            startingValue={review.rating}
                            imageSize={20}
                            fractions={1}
                            style={{ alignSelf: 'flex-start' }}
                        />
                        <Text color="gray.600">{review.reviewText}</Text>
                        <Divider mt={2} />
                    </VStack>
                    <Box w="10%" alignItems="center" style={{ position: 'absolute', right: 0 }}>
                        <Menu w="100" trigger={(triggerProps: any) => {
                            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <ThreeDotsIcon />
                            </Pressable>;
                        }}>
                            <Menu.Item onPress={async () => {
                                await dispatch(deleteReviewProduct(review.id, id));
                            }}>Delete</Menu.Item>
                            <Menu.Item onPress={() => {
                                console.log('Edit');
                            }}>Edit</Menu.Item>
                            <Menu.Item onPress={() => {
                                console.log('Report');
                            }}>Report</Menu.Item>
                        </Menu>
                    </Box>
                </HStack>
            ))}

            {data.length > 5 && (
                <Text
                    fontSize="md"
                    color="yellow.500"
                    mt={4}
                    textAlign="center"
                    onPress={() => {
                        // Add logic for "View More"
                    }}
                >
                    {'View More'}
                </Text>
            )}

            {/* Write Review Section */}
            <VStack space={4} mt={6}>
                <Text fontSize="xl" fontWeight="bold">
                    {'Write Review'}
                </Text>
                <HStack alignItems="center" space={4}>
                    <Rating
                        startingValue={rating}
                        imageSize={30}
                        fractions={1}
                        onFinishRating={(value: number) => setRating(value)}
                    />
                    <Text>{handleRatingLabel(rating)}</Text>
                </HStack>
                <Input
                    placeholder={'Write Review'}
                    value={review}
                    onChangeText={(text: string) => setReview(text)}
                />
                <Button
                    colorScheme="primary"
                    isDisabled={!review || rating === 0}
                    onPress={handleSubmit}
                >
                    {'Submit'}
                </Button>
            </VStack>
        </Box>
    );
};

export default CustomerReview;
