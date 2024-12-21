import React from 'react';
import { Box, ScrollView, VStack, Image, Text, Button, Heading } from 'native-base';
import Members from './members';
import MapView, { Marker } from "react-native-maps";

const Contact = () => {
  const team = [
    {
      name: 'Nguyễn Quốc Chung',
      image: require('../../../../assets/about/avt_chung.jpg'),
      description: 'Responsible for developing the Uniqlo software and building the API.',
      link: 'https://www.facebook.com/chungg.203',
    },
    {
      name: 'Nguyễn Văn Duy',
      image: require('../../../../assets/about/avt_duy.jpg'),
      description: 'Specialist in developing API, ensuring efficiency and optimization.',
      link: 'https://www.facebook.com/vanduy.nguyen.2003',
    },
    {
      name: 'Phạm Thị Chinh',
      image: require('../../../../assets/about/avt_chinh.jpg'),
      description: 'Main role in developing the Uniqlo software.',
      link: 'https://www.facebook.com/yukio.pham.5',
    },
    {
      name: 'Đặng Quốc Cường',
      image: require('../../../../assets/about/avt_cuong.jpg'),
      description: 'Responsible for developing and optimizing the website.',
      link: 'https://www.facebook.com/cuongdq1002',
    },
    {
      name: 'Dương Thị Ánh Duyên',
      image: require('../../../../assets/about/avt_duyen.jpg'),
      description: 'Testing the product, ensuring quality and stability.',
      link: 'https://www.facebook.com/profile.php?id=100073160363879',
    },
  ];

  return (
    <ScrollView flex={1} bg="gray.50">
      <Box p={4} bg="white">
        <Heading size="xl" textAlign="center" mb={4}>
          About Uniqlo
        </Heading>
        <Text textAlign="center" mb={4}>
          Welcome to the Uniqlo clothing store!
        </Text>
        <Text textAlign="center" mb={4}>
          We provide high-quality and modern fashion products.
        </Text>
      </Box>

      <MapView
        style={{ width: '100%', height: 300 }}
        initialRegion={{
          latitude: 21.028511,
          longitude: 105.804817,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 21.03831960774677, longitude: 105.78324269303504 }}
          title="Uniqlo"
          description="Uniqlo clothing store"
        />
      </MapView>

      <VStack space={4} p={4}>
        <Box bg="white" shadow={2} borderRadius="lg" p={4}>
          <Image
            source={require('../../../../assets/about/hotels.jpg')}
            alt="Our Hotels"
            height={200}
            resizeMode="cover"
            borderRadius="md"
          />
          <Heading size="md" mt={4}>
            Our store
          </Heading>
          <Text mt={2} color="gray.600">
            Our store is a clothing store and sells clothing and related products.
          </Text>
          <Button mt={4} colorScheme="primary" >
            Learn more
          </Button>
        </Box>

        {/* Section: Tours */}
        <Box bg="white" shadow={2} borderRadius="lg" p={4}>
          <Image
            source={require('../../../../assets/about/tours.jpeg')}
            alt="Our Tours"
            height={200}
            resizeMode="cover"
            borderRadius="md"
          />
          <Heading size="md" mt={4}>
            Fashion products
          </Heading>
          <Text mt={2} color="gray.600">
            We offer a variety of fashion products for you to choose from.
          </Text>
          <Button mt={4} colorScheme="primary" >
            Learn more
          </Button>
        </Box>
      </VStack>

      {/* Section: Mission */}
      <Box bg="gray.100" p={6} borderRadius="lg" mx={4} mt={4}>
        <Heading size="lg" color="primary.800" mb={4}>
          Our mission
        </Heading>
        <Text color="gray.700" fontSize="md" mb={4}>
          Our mission is to provide high-quality fashion products to customers.
        </Text>
        <Text color="gray.700" fontSize="sm">
          Our mission is to provide high-quality fashion products to customers.
        </Text>
      </Box>

      {/* Section: Team */}
      <Box p={4} mt={6}>
        <Heading size="lg" mb={4} textAlign="center">
          Our team
        </Heading>
        <Members data={team} />
      </Box>

      {/* Section: Contact */}
      <Box p={4} mt={6}>
        <Heading size="lg" mb={4} textAlign="center">
          Contact us
        </Heading>
        <Text textAlign="center">
          If you have any questions or suggestions, please contact us via email.
        </Text>
      </Box>
    </ScrollView>
  );
};

export default Contact;
