import type {AxiosRequestConfig} from "axios";
import axiosInstance from "@/api/request";
import {TypeApi} from "@/api/type";



export namespace SmsApi {
    /**
     * @author huaqiang
     * @description 手机短信参数
     */
    export interface SmsMobileParams {
        areaCode : string;
        mobile: string
        smsType: SmsType ;
    }

    /**
     * @author huaqiang
     * @description 邮箱参数
     */
    export interface SmsEmailParams {
        email: string
        smsType: SmsType ;
    }

}


/**
 * @author huaqiang
 * @description 手机短信通知
 */
export async function smsMobileApi( data:SmsApi.SmsMobileParams,config?: AxiosRequestConfig) {
    return axiosInstance.post<TypeApi.BaseResult<{ data: string|null }>>('/sms/mobile', data,{
        ...config
    });
}

/**
 * @author huaqiang
 * @description 邮箱通知
 */
export async function smsEmailApi( data:SmsApi.SmsEmailParams,config?: AxiosRequestConfig) {
    return axiosInstance.post<TypeApi.BaseResult<{ data: string|null }>>('/sms/email', data,{
        ...config
    });
}








