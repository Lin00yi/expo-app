// CarCard.tsx
import React from 'react';
import { Box, Image,  VStack, HStack, Button } from 'native-base';
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet, type ViewProps} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

interface CarProps {
    name: string;
    brand: string;
    imageUrl: string;
    description: string;
}

export type ThemedViewProps = ViewProps & {
    car: CarProps;
    lightColor?: string;
    darkColor?: string;
};

const CarCard: React.FC<ThemedViewProps> = ({ car,style,lightColor,darkColor,...otherProps }) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    return (
        <Box
            borderRadius="md"
            overflow="hidden"
            shadow={2}
            mb={4}
            style={[{ backgroundColor }, style]}
            {...otherProps}
        >
            <Image
                source={{ uri: car.imageUrl }}
                alt={car.name}
                width="100%"
                height={200}
                resizeMode="cover"
            />
            <VStack p={4}>
                <ThemedText type='large'>{car.name}</ThemedText>
                <ThemedText type="middle">{car.brand}</ThemedText>
                <ThemedText type='default' style={styles.desc}>{car.description}</ThemedText>
                <HStack mt={4} space={2}>
                    <Button variant='solid'>View Details</Button>
                    <Button variant='outline'>Buy Now</Button>
                </HStack>
            </VStack>
        </Box>
    );
};


const styles = StyleSheet.create({
    desc: {
        marginLeft: 2,
    }
});



export default CarCard;
