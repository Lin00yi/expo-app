import { useState } from 'react';

/**
 * @author huaqiang
 * @description 下拉刷新 Hook
 */
const useRefresh = <T>(initialData:T[]) => {
    const [data, setData] = useState<T[]>(initialData);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async (fetchData: () => Promise<T[]>) => {
        setRefreshing(true);
        const newData = await fetchData();
        setData(newData);
        setRefreshing(false);
    };

    return { data, refreshing, onRefresh };
};

export default useRefresh;
