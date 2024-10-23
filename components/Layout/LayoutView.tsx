import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // paddingHorizontal: 20, // 水平方向的内边距
    backgroundColor: '#f0f0f0',
  },
});

const LayoutView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const layoutBackgroundColor = useThemeColor({}, 'layoutBackgroundColor');
  return (
    <ThemedView
      style={[styles.container, { backgroundColor: layoutBackgroundColor }]}>
      {children}
    </ThemedView>
  );
};

export default LayoutView;
