export type RequestConfig = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    interceptRequest?: (url: string, config: RequestConfig) => Promise<RequestConfig> | RequestConfig;
    interceptResponse?: (response: Response) => Promise<Response> | Response;
    errorHandler?: (error: any) => void;
};

const defaultConfig: RequestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};
/**
 * @author huaqiang
 * @description 基于fetch请求的封装
 */
export default class HttpClient {
    constructor(private baseURL: string, private config: RequestConfig = {}) {}

    // 请求拦截器
    private async interceptRequest(url: string, config: RequestConfig): Promise<RequestConfig> {
        if (this.config.interceptRequest) {
            return this.config.interceptRequest(url, config);
        }
        return config;
    }

    // 响应拦截器
    private async interceptResponse(response: Response): Promise<Response> {
        if (this.config.interceptResponse) {
            return this.config.interceptResponse(response);
        }
        return response;
    }

    // 错误处理器
    private handleError(error: any): void {
        if (this.config.errorHandler) {
            this.config.errorHandler(error);
        } else {
            console.error('Request failed:', error);
        }
    }

    // 通用请求方法
    public async request(url: string, options: RequestConfig = {}): Promise<any> {
        const finalUrl = `${this.baseURL}${url}`;
        const config = { ...defaultConfig, ...this.config, ...options };

        try {
            // 执行请求拦截器
            const interceptedConfig = await this.interceptRequest(finalUrl, config);
            const response = await fetch(finalUrl, interceptedConfig);

            // 执行响应拦截器
            const interceptedResponse = await this.interceptResponse(response);

            // 判断响应是否成功
            if (!interceptedResponse.ok) {
                throw new Error(`HTTP error! Status: ${interceptedResponse.status}`);
            }

            return interceptedResponse.json();
        } catch (error) {
            console.error('Request failed:', error);
            // 调用错误处理器
            this.handleError(error);
            throw error;
        }
    }

    // GET 请求
    public get(url: string, options?: RequestConfig) {
        return this.request(url, { ...options, method: 'GET' });
    }

    // POST 请求
    public post(url: string, body: any, options?: RequestConfig) {
        return this.request(url, { ...options, method: 'POST', body: JSON.stringify(body) });
    }

    // 其他 HTTP 方法可以类似封装
}
