import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @atuhor huaqiang
 * @description AsyncStorage 工具类
 */
class AsyncStorageUtils {
    // 存储数据
    static async set(key: string, value: any): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // 处理存储错误
            console.error('存储错误:', e);
        }
    }

    // 获取数据
    static async get<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? JSON.parse(value) : null;
        } catch (e) {
            // 处理读取错误
            console.error('读取错误:', e);
            return null;
        }
    }

    // 删除数据
    static async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            // 处理删除错误
            console.error('删除错误:', e);
        }
    }

    // 清空所有数据
    static async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // 处理清空错误
            console.error('清空错误:', e);
        }
    }
}

export default AsyncStorageUtils;
