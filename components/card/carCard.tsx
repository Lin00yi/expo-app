// CarCard.tsx
import React from 'react';
import { Box, Image, Text, VStack, HStack, Button } from 'native-base';

interface Car {
    name: string;
    brand: string;
    imageUrl: string;
    description: string;
}

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
    return (
        <Box
            borderWidth={1}
            borderColor="coolGray.300"
            borderRadius="md"
            overflow="hidden"
            shadow={2}
            mb={4}
        >
            <Image
                source={{ uri: car.imageUrl }}
                alt={car.name}
                width="100%"
                height={200}
                resizeMode="cover"
            />
            <VStack p={4}>
                <Text fontSize="lg" fontWeight="bold">{car.name}</Text>
                <Text fontSize="md" color="gray.600">{car.brand}</Text>
                <Text mt={2}>{car.description}</Text>
                <HStack mt={4} space={2}>
                    <Button colorScheme="blue">View Details</Button>
                    <Button colorScheme="green">Buy Now</Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default CarCard;
