// 定义接口基础类型
export namespace TypeApi {
    /**
     * @author huaqiang
     * @description 基础返回类
     */
    export interface BaseResult<T> {
        code : number;
        message : string;
        data: T;
        success : boolean;
    }

    /**
     * @author huaqiang
     * @description 分页参数
     */
    export interface PageBean {
        currentPage: number;
        pageSize: number;
    }

    /**
     * @author huaqiang
     * @description 分页列表返回值
     */
    export interface PageListResult<T> {
        pages: number;
        total: number;
        list: T[];
    }
}