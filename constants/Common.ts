import {Platform} from "react-native";

export const isEncrypt = false; // 是否加密

export const isIos = Platform.OS === 'ios'; // 是否是ios
export const isAndroid = Platform.OS === 'android'; // 是否是android
export const isWeb = Platform.OS === 'web'; // 是否是web