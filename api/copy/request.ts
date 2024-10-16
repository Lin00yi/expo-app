import HttpClient from "@/api/copy/http-client";

/**
 * @author huaqiang
 * @description 基于fetch的请求拦截器、响应拦截器的配置
 */
const httpClient = new HttpClient('http://192.168.22.101:8000', {
    interceptRequest: async (url, config) => {
        const token = 'your-token';
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
        console.log('Intercepted Request:', url, config);
        return config;
    },
    interceptResponse: async (response) => {
        if (response.status === 401) {
            // 处理未授权错误，比如自动跳转到登录页面
            console.error('Unauthorized! Redirecting to login...');
        }
        console.log('Intercepted Response:', response);
        return response;
    },
    errorHandler: (error) => {
        // 自定义错误处理逻辑
        if (error.message.includes('404')) {
            console.error('Resource not found');
        } else if (error.message.includes('500')) {
            console.error('Server error');
        } else {
            console.error('Unknown error occurred:', error);
        }
    },
});

export default httpClient;