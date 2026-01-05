import { AxiosResponse, AxiosRequestConfig } from 'axios';

export type HttpServiceConfig = AxiosRequestConfig;
export type HttpServiceResponse<T> = AxiosResponse<T>;

export interface HttpService {
    delete<T = any, R = HttpServiceResponse<T>>(
        url: string,
        config?: HttpServiceConfig
    ): Promise<R>;
    get<T = any, R = HttpServiceResponse<T>>(url: string, config?: HttpServiceConfig): Promise<R>;
    post<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: HttpServiceConfig
    ): Promise<R>;
    put<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: HttpServiceConfig
    ): Promise<R>;
    patch<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: HttpServiceConfig
    ): Promise<R>;
}
