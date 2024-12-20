import { Box, Icon, ScrollView, Text } from "native-base";
import { Pressable, StyleSheet, View } from "react-native";
import { ResizeMode, Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

export default function SurfVideos() {
    const data = [
        {
            id: 1,
            title: "Quần áo thể thao",
            video: "https://v.made-in-china.com/ucv/sbr/f98bd3e93a7eab93a1506bed5fdc40/7a90a1ff0610247769155357187441_h264_def.mp4",
            view: 78
        },
        {
            id: 2,
            title: "Quần áo thể thao ống siêu rộng, siêu đẹp với chất thun co giãn.",
            video: "https://v.made-in-china.com/ucv/sbr/f98bd3e93a7eab93a1506bed5fdc40/7a90a1ff0610247769155357187441_h264_def.mp4",
            view: 78
        },
        {
            id: 3,
            title: "Quần áo thể thao",
            video: "https://v.made-in-china.com/ucv/sbr/f98bd3e93a7eab93a1506bed5fdc40/7a90a1ff0610247769155357187441_h264_def.mp4",
            view: 78
        },
        {
            id: 4,
            title: "Quần áo thể thao",
            video: "https://v.made-in-china.com/ucv/sbr/f98bd3e93a7eab93a1506bed5fdc40/7a90a1ff0610247769155357187441_h264_def.mp4",
            view: 78
        },
        {
            id: 5,
            title: "Quần áo thể thao",
            video: "https://v.made-in-china.com/ucv/sbr/f98bd3e93a7eab93a1506bed5fdc40/7a90a1ff0610247769155357187441_h264_def.mp4",
            view: 78
        }
    ];
    const [video, setVideo] = useState<number>(0);
    return (
        <View style={{ gap: 4 }}>
            <Box>
                <Text fontSize="lg" fontWeight="bold">Lướt Uniqlo Video - Giảm 50%</Text>
            </Box>
            <ScrollView horizontal style={styles.scrollView}>
                {
                    data.map((item, index) => (
                        <Pressable key={item.id} style={[styles.item, index === data.length - 1 && { marginRight: 0 }]} onPress={() => setVideo(index)}>
                            <Box>
                                <Video
                                    source={{ uri: item.video }}
                                    style={styles.video}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    isLooping
                                    shouldPlay={video === index}
                                    isMuted={true}
                                />
                                <Box style={styles.info}>
                                    <Box style={styles.infoItem}>
                                        <Icon as={MaterialIcons} name="play-arrow" size={5} color="coolGray.500" />
                                        <Text style={styles.infoView}>{item.view}</Text>
                                    </Box>
                                    <Text style={styles.infoText}>{item.title}</Text>
                                </Box>
                            </Box>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    info: {
        flexDirection: "column",
        justifyContent: "space-between",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 4
    },
    item: {
        position: "relative",
        marginRight: 10,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    video: {
        width: 150,
        height: 250,
    },
    infoView: {
        fontSize: 12,
        color: "white"
    },
    infoText: {
        fontSize: 11,
        color: "white",
        flexWrap: "wrap",
        maxWidth: "100%",
        lineHeight: 16,
        maxHeight: 36,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: 2
    },
    scrollView: {
        width: "100%",
        height: 250,
        flexDirection: "row",
    }
})