import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ColorSchemeName, Platform, StyleSheet, SafeAreaView } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  console.log('colorScheme', colorScheme); // --> dark | light

  return (
    // <SafeAreaView style={styles(colorScheme).container}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: styles(colorScheme).tabsStyle, // 使用函数获取样式
        headerShown: false,
        tabBarShowLabel: true,
        // tabBarLabelStyle: {
        //   fontSize: 12,
        //   paddingBottom: 5,
        // },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="car"
        options={{
          title: 'Car',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="apiTest"
        options={{
          title: 'ApiTest',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
    /*</SafeAreaView>*/
  );
}

const styles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // backgroundColor: '#ecf0f1',
      // padding: 8,
    },
    tabsStyle: {
      backgroundColor: Colors[colorScheme ?? 'light'].tabBackgroundColor,
      marginHorizontal: 15,
      marginVertical: 20,
      position: 'absolute',
      left: 0,
      ...Platform.select({
        ios: {
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        },
        android: {
          borderRadius: 20,
          elevation: 5,
        },
        web: {
          borderRadius: 10,
          justifyContent: 'center',
        },
      }),
    },
  });
