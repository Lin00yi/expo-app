import type {AxiosError, AxiosResponse} from 'axios';

import axios from 'axios';
import JSONBigInt from 'json-bigint';

import AsyncStorage from "@/utils/AsyncStorageUtils";

import {isEncrypt} from "@/constants/Common";

import errorHandler from './errorHandler';
import {decryptData, encryptData} from "@/utils/node-gcm";
import {message} from "@/utils/messageHelper";
import eventEmitter from './eventEmitter';


// 创建 JSONBigInt 实例
const jsonBigInt = new JSONBigInt();




// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://192.168.22.101:8000',
    timeout: 600000, // 设置请求超时（可选） 10分钟 因为在线生成知识点内容比较慢
    transformResponse: [(data: any) => {
        // 注意这里的 data 可能是字符串中包含了多余的引号，需要去除
        const newData = data.replace(/"/g, '');

        try {
            if(typeof newData === 'string') {
                return isEncrypt ? JSON.parse(JSON.stringify(jsonBigInt.parse(decryptData(newData)))) : JSON.parse(JSON.stringify(jsonBigInt.parse(data)));
            }
            return newData;
        } catch {
            return newData;
        }
    }],
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    async(config: any) => {

        // 设置 Content-Type 为 application/json 仅在 POST 请求时并且不存在 Content-Type 时
        if (config.method === 'post' && !config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        const lang = 'zh_cn';
        config.headers = {
            ...config.headers,
            lang
        };

        const token = await AsyncStorage.get('tokenInfo');
        // if (token)
        //     // 确保 headers 是一个对象，而不是 AxiosHeaders 类型
        //     config.headers = {
        //         ...config.headers,
        //         token
        //     };

        if(config.data && isEncrypt){
            config.data = encryptData(config.data);
        }

        return config;
    },
    (error) => {
        // console.error('请求时 error', error);
        // 处理请求错误
        return Promise.reject(error)
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    async(response: AxiosResponse) => {
        let res = null;
        const isTransformResponse = response.headers?.['X-Transform-Response'];

        if (isTransformResponse === false) {
            res = response;
        }
        else{
            res = {...response};
        }

        if (res.data && (res.data.code === 20001 || res.data.code === 20003)) {
            const errorMessage = res.data.message || '发生未知错误';
            message(errorMessage, 'error');
            eventEmitter.emit('API:SYSTEM_UNKNOWN_ERROR', errorMessage);
            return Promise.reject(errorMessage);
        }
        if(res.data && res.data.code === 20002){
            const errorMessage = res.data.message || '登录过期，请重新登录';
            eventEmitter.emit('API:SYSTEM_UN_AUTH', errorMessage);
            return Promise.reject(errorMessage);
        }
        return res;
    },
    (error:AxiosError) => {
        // console.error('响应时 error', error);
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }
        // 使用 errorHandler 处理响应错误
        return errorHandler(error);
    }
);


export default axiosInstance;
