import { useState } from 'react';

type FetchMoreData<T> = () => Promise<T[]>; // 定义 fetchMoreData 函数的类型

const useLoadMore = <T>(initialData: T[], fetchMoreData: FetchMoreData<T>) => {
    const [data, setData] = useState<T[]>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadMore = async () => {
        if (loading || !hasMore) return; // 防止重复请求

        setLoading(true);
        try {
            const newData = await fetchMoreData(); // 获取更多数据
            if (newData.length === 0) {
                setHasMore(false); // 如果没有更多数据，更新状态
            } else {
                setData((prevData) => [...prevData, ...newData]); // 追加新数据
            }
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        hasMore,
        loadMore,
    };
};

export default useLoadMore;
