import { ErrorBoundaryProps } from 'expo-router';
import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <ThemedText>{error.message}</ThemedText>
      <ThemedText onPress={retry}>Try Again?</ThemedText>
    </View>
  );
}
