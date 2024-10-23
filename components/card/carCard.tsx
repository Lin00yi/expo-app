// CarCard.tsx
import React from 'react';
import { Box, Image, VStack, HStack, Button } from 'native-base';
import { ThemedText } from '@/components/ThemedText';
import { Platform, StyleSheet, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

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

const CarCard: React.FC<ThemedViewProps> = ({ car, style, lightColor, darkColor, ...otherProps }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      // borderWidth={1}
      // borderColor={useThemeColor({}, 'tabBackgroundColor')}
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
        <ThemedText type="large">{car.name}</ThemedText>
        <ThemedText type="middle">{car.brand}</ThemedText>
        <ThemedText type="default" style={styles.desc}>{car.description}</ThemedText>
        <HStack mt={4} space={2}>
          <Button variant="solid" size="sm">查看详情</Button>
          <Button variant="outline" size="sm">立即购买</Button>
        </HStack>
      </VStack>
    </Box>
  );
};


const styles = StyleSheet.create({
  desc: {
    marginLeft: 2,
  },
});


export default CarCard;
