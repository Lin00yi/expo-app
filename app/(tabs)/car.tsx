
import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import useRefresh from "@/hooks/useRefresh";
import {HStack, Spinner} from "native-base";
import CarCard from "@/components/card/carCard";
import {ThemedText} from "@/components/ThemedText";
import LayoutView from "@/components/Layout/LayoutView";
import TopSearchBar from "@/components/Home/TopSearchBar";
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import useLoadMore from "@/hooks/useLoadMore";


interface Car {
    id:string,
    name: string;
    brand: string;
    imageUrl: string;
    description: string;
}

const cars = [
    {
        id: '1',
        name: 'Tesla Model S',
        brand: 'Tesla',
        imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-S-Desktop-US.png',
        description: 'The Tesla Model S is an all-electric five-door liftback sedan produced by Tesla, Inc.',
    },
    {
        id: '2',
        name: 'Ford Mustang',
        brand: 'Ford',
        imageUrl: 'https://www.ford.es/content/dam/guxeu/es/home/billboard/2024/ford-homepage-es-white-mustang_mach-e-21x9_2160x925-hpr-bb.jpg.renditions.extra-large.jpeg',
        description: 'The Ford Mustang is a series of American automobiles manufactured by Ford.',
    },
    {
        id: '3',
        name: 'Chevrolet Camaro',
        brand: 'Chevrolet',
        imageUrl: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicle-groups/performance/segment-page/01-images/2024-performance-corvette-zr1.jpg?imwidth=600',
        description: 'The Chevrolet Camaro is a mid-size American automobile manufactured by Chevrolet.',
    },
    {
        id: '4',
        name: 'BMW M3',
        brand: 'BMW',
        imageUrl: 'https://www.bmw.com.cn/content/bmw/marketCN/bmw_com_cn/zh_CN/all-models/3-series/sedan/2024/inspire/jcr:content/par/mosaicgallery/items/mosaicgalleryitem/image.transform/mosaic963/image.1727244118524.jpg',
        description: 'The BMW M3 is a high-performance version of the 3 Series.',
    },
    {
        id: '5',
        name: 'Audi A4',
        brand: 'Audi',
        imageUrl: 'https://www.audi.cn/content/dam/OneWeb/faw_vw/model_finder/faw_vw/model_filter/model_filter_car_image/A4L_MY2023.png',
        description: 'The Audi A4 is a line of compact executive cars produced since 1994.',
    },
    {
        id: '6',
        name: 'Mercedes-Benz C-Class',
        brand: 'Mercedes-Benz',
        imageUrl: 'https://www.oneweb-stage.mercedes-benz.com.cn/content/dam/mb-cn/vehicles1/e-class-l/sedan/design/1-PC.jpg',
        description: 'The Mercedes-Benz C-Class is a line of compact executive cars produced by Daimler AG.',
    },
    {
        id: '7',
        name: 'Porsche 911',
        brand: 'Porsche',
        imageUrl: 'https://images.porsche.cn/-/media/E969499404154DB79BAD58EF5CC8CFAB_82BBE0A2462E47C4B1DB34EA0B23B853_CZ25W12IX0010-911-carrera-gts-side?w=1400&q=85&crop=faces%2Centropy%2Cedges&auto=format',
        description: 'The Porsche 911 is a high-performance sports car.',
    },
    {
        id: '8',
        name: 'Toyota Corolla',
        brand: 'Toyota',
        imageUrl: 'https://www.toyota.com.cn/vehicles/images/cars/corolla-hev/banner.jpg',
        description: 'The Toyota Corolla is a compact car produced by Toyota.',
    }
];


export default function CarScreen(){
    const { data:initialData, refreshing, onRefresh } = useRefresh(cars);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);


    useEffect(() => {
        setFilteredCars(initialData);
    }, [initialData]);

    // 使用共享值捕捉滚动位置
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Animated style for the TopSearchBar (e.g., fade out or slide up)
    const topSearchBarAnimatedStyle = useAnimatedStyle(() => {
        // 计算滚动时的透明度
        const opacity = refreshing
            ? 0 // 当 refreshing 为 true 时，直接将 opacity 设置为 0
            : interpolate(scrollY.value, [0, -100], [1, 0], 'clamp'); // 否则根据滚动位置插值计算

        return {
            opacity: withTiming(opacity, { duration: 100 }), // 使用动画改变透明度
        };
    });

    /**
     * @author huaqiang
     * @description 请求获取数据
     */
    const fetchData = async () => {
        // 模拟网络请求
        return new Promise<Car[]>((resolve) => {
            setTimeout(() => {
                const newData = [
                    {
                        id: '9',
                        name: 'Honda Civic',
                        brand: 'Honda',
                        imageUrl: 'https://media.ghac.cn/s/homePage/v1/pc/kv/kv1.jpg',
                        description: 'The Honda Civic is a line of cars manufactured by Honda.',
                    },
                    {
                        id: '10',
                        name: 'Nissan Altima',
                        brand: 'Nissan',
                        imageUrl: 'https://upload.dongfeng-nissan.com.cn/nissan/image/202201/d32b6560-7cee-11ec-b481-633940ec6607.jpg',
                        description: 'The Nissan Altima is a mid-size car produced by Nissan.',
                    },
                    {
                        id: '11',
                        name: 'Mazda 3',
                        brand: 'Mazda',
                        imageUrl: 'https://www.changan-mazda.com.cn/product/mazda3/images/brand/xnn_07.jpg',
                        description: 'The Mazda3 is a compact car produced by Mazda.',
                    },
                    ];
                resolve(newData);
            }, 2000); // 模拟2秒的加载时间
        });
    };

    /**
     * @author huaqiang
     * @description 请求更多数据
     */
    const fetchMoreCars = async () => {
        return new Promise<Car[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: String(Date.now() + Math.random()),
                        name: 'Ford Mustang',
                        brand: 'Ford',
                        imageUrl: 'https://www.ford.es/content/dam/guxeu/es/home/billboard/2024/ford-homepage-es-white-mustang_mach-e-21x9_2160x925-hpr-bb.jpg.renditions.extra-large.jpeg',
                        description: 'A powerful American muscle car',
                    },
                    {
                        id: String(Date.now() + Math.random()),
                        name: 'Chevrolet Camaro',
                        brand: 'Chevrolet',
                        imageUrl: 'https://www.ford.es/content/dam/guxeu/es/home/billboard/2024/ford-homepage-es-white-mustang_mach-e-21x9_2160x925-hpr-bb.jpg.renditions.extra-large.jpeg',
                        description: 'A stylish sports car with great performance',
                    },
                ]);
            }, 2000);
        });
    };


    const { moreData, loading: loadMoreLoading, hasMore, loadMore } = useLoadMore(fetchMoreCars);


    // 合并数据
    useEffect(() => {
        if (moreData) {
            setFilteredCars((prev) => [...prev, ...moreData]);
        }
    }, [moreData]);


    const handleSearch = (query:string) => {
        if(!query.trim()) return;
        const filtered = cars.filter((car) =>
            car.name.toLowerCase().includes(query.toLowerCase()) ||
            car.brand.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCars(filtered);
    };

    const handlePublish = () => {
        console.log('发布按钮被点击');
        // 实现发布的逻辑
    };

    return (
        <LayoutView>
            {/* 使用 Animated.View 包裹 TopSearchBar */}
            <Animated.View style={[topSearchBarAnimatedStyle]}>
                <TopSearchBar onSearch={handleSearch} onPublish={handlePublish} />
            </Animated.View>
            <Animated.FlatList
                style={styles.list}
                data={filteredCars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CarCard car={item} darkColor={'rgba(255,255,255,0.05)'}/>
                )}
                onEndReached={hasMore && !loadMoreLoading ? loadMore : null} // 只有在有更多数据且当前未加载时才触发加载更多
                onEndReachedThreshold={0} // 调整为 0.5，表示要距离底部还有 50% 的距离时才加载更多
                refreshControl={
                    <RefreshControl
                        title='拼命加载中...'
                        refreshing={refreshing}
                        onRefresh={() => onRefresh(fetchData)}
                        titleColor="#333"  // 设置标题的颜色
                    />
                }
                onScroll={scrollHandler}
                scrollEventThrottle={16} // 确保滚动事件频率
                ListFooterComponent={
                    <>
                        {hasMore ? (
                            loadMoreLoading ? (
                                <HStack space={4} alignItems="center" justifyContent='center' style={{ paddingBottom: 16}}>
                                    <ThemedText>正在加载中</ThemedText>
                                    <Spinner color="blue" />
                                </HStack>
                            ) : (
                                <View style={{ alignItems: 'center', paddingBottom: 16 }}>
                                    <ThemedText>上滑加载更多</ThemedText>
                                </View>
                            )
                        ) : (
                            <View style={{ alignItems: 'center', paddingBottom: 16 }}>
                                <ThemedText>没有更多数据了</ThemedText>
                            </View>
                        )}
                    </>
                }
            />
        </LayoutView>
    );
};


const styles = StyleSheet.create({
    list: {
        padding: 8,
    }
});



