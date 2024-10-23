import type { AxiosError } from 'axios';
import eventEmitter from "@/api/eventEmitter";

/**
 * @author huaqiang
 * @param error 错误信息
 * @description 错误处理
 */
const errorHandler = (error: AxiosError) => {
    const { response } = error;
    let msg = null;
    if (!response) {
        // 网络错误（例如断网）
        console.error('Network error - please check your internet connection');
        // 你可以在这里显示网络错误提示
        // msg = 'Network error - please check your internet connection';
        msg = '网络错误，请检查您的网络连接';
        eventEmitter.emit('API:NETWORK_ERROR', msg);
    } else
        switch (response.status) {
            case 400:
                // 请求错误
                console.error('Request error - please check your request data');
                // 你可以在这里显示请求错误提示
                // msg = 'Request error - please check your request data';
                msg = '请求错误 - 请检查您的请求数据';
                eventEmitter.emit('API:INVALID', 400);
                break;
            case 401:
                // 未授权
                console.error('Unauthorized access - redirecting to login');
                // 你可以在这里执行注销操作或重定向到登录页面
                // msg = 'Unauthorized access - redirecting to log in'
                msg = '未授权访问 - 重定向到登录';
                eventEmitter.emit('API:UN_AUTH', msg);
                break;
            case 403:
                // 禁止访问
                console.error('Forbidden - you do not have permission to access this resource');
                // 你可以在这里显示禁止访问提示
                // msg='Forbidden - you do not have permission to access this resource'
                msg='禁止访问 - 您无权访问此资源';
                eventEmitter.emit('API:FORBIDDEN', msg);
                break;
            case 404:
                // 资源未找到
                console.error('Not found - the requested resource could not be found');
                // 你可以在这里显示资源未找到提示
                // msg='Not found - the requested resource could not be found'
                msg='未找到 - 无法找到请求的资源';
                eventEmitter.emit('API:NOT_FOUND', msg);
                break;
            case 500:
                // 服务器错误
                console.error('Server error - please try again later');
                // 你可以在这里显示服务器错误提示
                // msg='Server error - please try again later';
                msg='服务器错误 - 请稍后重试';
                eventEmitter.emit('API:SERVER_ERROR', msg);
                break;
            default:
                // 其他错误
                console.error(`An error occurred: ${response.statusText}`);
                // 你可以在这里显示其他错误提示
                // msg=`An error occurred: ${response.statusText}`
                msg=`发生错误: ${response.statusText}`
                eventEmitter.emit('API:INVALID', response.status);
                break;
        }
    return Promise.reject(msg);
};

export default errorHandler;
