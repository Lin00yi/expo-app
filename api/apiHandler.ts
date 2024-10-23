import eventEmitter from "@/api/eventEmitter";
import {message} from "@/utils/messageHelper";
import AsyncStorage from "@/utils/AsyncStorageUtils";
// import {useNavigation} from "@react-navigation/native";

// const navigation = useNavigation();

// 处理系统错误 20001 20003
eventEmitter.on('API:SYSTEM_UNKNOWN_ERROR', async(msg: string) => {
    console.log(`Received API:SYSTEM_UNKNOWN_ERROR event with message: ${msg}`);
    message(msg, 'error');
});

// 处理系统未授权错误 20002
eventEmitter.on('API:SYSTEM_UN_AUTH', async(msg: string) => {
    console.log(`Received API:SYSTEM_UN_AUTH event with message: ${msg}`);
    message(msg, 'error');
    await AsyncStorage.remove('tokenInfo');
    // 重定向到登录页
    // navigation.navigate('login');
});

// 处理 API:UN_AUTH 事件
eventEmitter.on('API:UN_AUTH', (msg: string) => {
    console.log(`Received API:UN_AUTH event with message: ${msg}`);
    message(msg, 'error');
});

// 处理 API:INVALID 事件
eventEmitter.on('API:INVALID', (errorCode: number) => {
    console.log(`Received API:INVALID event with error code: ${errorCode}`);
    // 在这里处理无效请求的错误，例如显示错误提示
    if (errorCode === 400) {
        // 针对参数无效的提示
        message('请求参数无效，请检查您的输入。', 'error');
    } else {
        // 针对其他错误码的处理
        message(`请求无效，错误代码: ${errorCode}`, 'error');
    }
});

// 处理 API:FORBIDDEN 事件
eventEmitter.on('API:FORBIDDEN', (msg: string) => {
    console.log(`Received API:FORBIDDEN event with message: ${msg}`);
    // 在这里处理禁止访问的错误
    // 例如：显示“无权访问”的提示
    message(msg, 'error');
});

// 处理 API:NOT_FOUND 事件
eventEmitter.on('API:NOT_FOUND', (msg: string) => {
    console.log(`Received API:NOT_FOUND event with message: ${msg}`);
    // 在这里处理资源未找到的错误
    // 例如：显示 404 页面
    message(msg, 'error');
});

// 处理 API:SERVER_ERROR 事件
eventEmitter.on('API:SERVER_ERROR', (msg: string) => {
    console.log(`Received API:SERVER_ERROR event with message: ${msg}`);
    // 在这里处理服务器错误
    // 例如：显示“服务器错误，请稍后重试”
    message(msg, 'error');
});

// 处理 API:NETWORK_ERROR 事件
eventEmitter.on('API:NETWORK_ERROR', (msg: string) => {
    console.log(`Received API:NETWORK_ERROR event with message: ${msg}`);
    // 在这里处理网络错误
    // 例如：显示“网络错误，请检查您的网络连接”
    message(msg, 'error');
});
