import {useEffect, useState} from 'react';

type FetchMoreData<T> = () => Promise<T[]>; // 定义 fetchMoreData 函数的类型

const useLoadMore = <T>(fetchMoreData: FetchMoreData<T>) => {
    const [moreData, setMoreData] = useState<T[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        console.log('hasMore',hasMore);
    }, [hasMore]);

    const loadMore = async () => {
        // console.log('loadMore');
        if (loading || !hasMore) return; // 防止重复请求

        setLoading(true);
        try {
            const newData = await fetchMoreData(); // 获取更多数据
            console.log('newData',newData);
            if (newData.length === 0) {
                setHasMore(false); // 如果没有更多数据，更新状态
            } else {
                setMoreData([ ...newData]); // 追加新数据
            }
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        moreData,
        loading,
        hasMore,
        loadMore,
    };
};

export default useLoadMore;
