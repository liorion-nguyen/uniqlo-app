import { Alert, Linking, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Center, Column, Heading, Icon, IconButton, Text } from "native-base";
// import { useAppDispatch, useAppSelector } from "../../store";
// import { removeUser, setUser } from "../../store/user.reducer";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingButton from "../../../components/SettingButton";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParams, RootStackParams } from "../../../navigations/config";
import * as ImagePicker from "expo-image-picker";
// import { removeLoading, setLoading } from "../../store/loading.reducer";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { dispatch, RootState, useSelector } from "../../../redux/store";
import { uploadImage } from "../../../utils/image";
import { logout } from "../../../redux/slices/authentication";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// TODO: Fix Type of Props
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParams, "Setting">,
  StackScreenProps<RootStackParams>
>;

const Setting = ({ navigation }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const isLoading = false;
  const [image, setImage] = useState<string | null>(user?.avatar || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled) {
      try {
        const imageUri = result.assets[0].uri;
        const { imageName, imageUrl } = await uploadImage(imageUri);
        if (user?.avatar) {
          // Delete old image from storage
        }
        // Update image to storage
        // dispatch(setUser({ ...user!, avatarUrl: imageUrl, avatarName: imageName }));
        setImage(imageUrl);
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      }
    }
  };

  if (isLoading)
    return (
      <Column flex="1" bg="coolGray.700">
        <LoadingOverlay />
      </Column>
    );

  const purchases = [
    {
      id: 1,
      title: "Chờ xác nhận",
      icon: "hourglass-top",
    },
    {
      id: 2,
      title: "Đang giao",
      icon: "local-shipping",
    },
    {
      id: 3,
      title: "Chờ giao hàng",
      icon: "hourglass-bottom",
    },
    {
      id: 4,
      title: "Đánh giá",
      icon: "star",
    },
  ]
  return (
    <>
      <Column flex="1" bg="coolGray.700" px="5">
        <Center mt="8">
          <Column rounded="full">
            {image ? (
              <Avatar size="xl" source={{ uri: image }} />
            ) : (
              <Center bg="white" rounded="full" w="24" h="24">
                <Ionicons name="person-outline" color="gray" size={32} />
              </Center>
            )}
            <IconButton
              _pressed={{ bg: "coolGray.300" }}
              position="absolute"
              variant="solid"
              bg="white"
              w="6"
              h="6"
              rounded="full"
              bottom={0}
              right={0}
              icon={<Icon size="sm" as={Ionicons} name="camera-outline" color="red" />}
              onPress={pickImage}
            />
          </Column>
          <Heading color="white" mt="4">
            {user?.fullName}
          </Heading>
        </Center>
        <Column flex="1" space="6" mt="16">
          <View style={styles.purchaseContainer}>
            <View style={styles.purchaseTitleRow}>
              <Text style={styles.purchaseTitle}>Đơn mua</Text>
              <Button
                shadow={5}
                rightIcon={<Icon as={<MaterialIcons name="keyboard-arrow-right" />} size={5} color="primary.600" />}
                _text={{ color: "white", py: "0.5", fontWeight: "medium" }}
                onPress={() => navigation.navigate("Purchase", { purchase: purchases[1] })}
                style={styles.purchaseButton}
              >
                Xem lịch sử mua hàng
              </Button>
            </View>
            <View style={styles.purchaseBoxItem}>
              {
                purchases.map((purchase) => (
                  <Pressable key={purchase.id} onPress={() => navigation.navigate("Purchase", { purchase: purchase })}>
                    <View key={purchase.id} style={styles.purchaseItem}>
                      <Icon as={<MaterialIcons name={purchase.icon as any} />} size={8} color="primary.600" />
                      <Text style={styles.purchaseDes}>{purchase.title}</Text>
                    </View>
                  </Pressable>
                ))
              }
            </View>
          </View>
          <SettingButton
            onPress={() => navigation.navigate("FillProfile")}
            leftIconName="person-outline"
          >
            Sửa thông tin
          </SettingButton>
          <SettingButton
            onPress={() => navigation.navigate("ChangePassword")}
            leftIconName="lock-open"
          >
            Mật khẩu
          </SettingButton>
          <SettingButton
            leftIconName="chatbox-outline"
            onPress={() => navigation.navigate("ResponseForUs")}
          >
            Trợ giúp & phản hồi
          </SettingButton>
        </Column>
        <Button
          shadow={5}
          mb="6"
          leftIcon={<Icon as={Ionicons} name="exit-outline" color="white" />}
          _text={{ color: "white", py: "0.5", fontWeight: "medium" }}
          onPress={async () => {
            await dispatch(logout());
          }}
          rounded="full"
        >
          Đăng xuất
        </Button>
      </Column>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  purchaseContainer: {
    backgroundColor: "#6B7280",
    padding: 10,
    gap: 15,
    borderRadius: 10,
  },
  purchaseTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purchaseItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purchaseItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  purchaseDes: {
    fontSize: 14,
    color: "white",
  },
  purchaseBoxItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purchaseButton: {
    backgroundColor: "transparent",
  },
});
