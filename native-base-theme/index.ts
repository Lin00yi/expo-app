
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base';
import AsyncStorageUtils from "@/utils/AsyncStorageUtils";
import {isWeb} from "@/constants/Common";

// Web 环境使用 localStorage 作为 colorModeManager
const webColorModeManager: StorageManager = {
    get: async () => {
        let val = localStorage.getItem('@color-mode');
        return val === 'dark' ? 'dark' : 'light';
    },
    set: async (value: ColorMode) => {
        let strValue = value ? value.toString() : '';
        localStorage.setItem('@color-mode', strValue);
    },
};

// iOS/Android 环境使用 AsyncStorage 作为 colorModeManager
const mobileColorModeManager: StorageManager = {
    get: async () => {
        try {
            let val = await AsyncStorageUtils.get('@color-mode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (value: ColorMode) => {
        try {
            await AsyncStorageUtils.set('@color-mode', value);
        } catch (e) {
            console.log(e);
        }
    },
};


// 根据平台选择 colorModeManager
export const colorModeManager = isWeb ? webColorModeManager : mobileColorModeManager;
