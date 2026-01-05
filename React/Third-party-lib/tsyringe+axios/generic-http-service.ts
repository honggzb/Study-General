import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { HttpService as HttpServiceInterface, HttpServiceResponse } from './http-service.interface';
import { getSession } from 'next-auth/react';
import { Session } from '~/models/auth';
import getRuntimeConfig from '../runtime-config.service';

const getAuthConfig = async (config?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const session = (await getSession()) as Session;

    const token = session?.accessToken;

    const authConfig = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            // 'Ocp-Apim-Subscription-Key': 'ab93e715352448588f38f2fa1dc1da2f',
            ...config?.headers,
        },
        ...config,
    };
    return authConfig;
};

export class GenericHttpService implements HttpServiceInterface {
    protected readonly axiosInstance: AxiosInstance;
    private basePath = '';

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.basePath, //getBasePath(),
        }) as AxiosInstance;
    }

    async getDvIBasePath() {
        const runtimeConfig = await getRuntimeConfig();
        this.basePath = runtimeConfig?.dviApiBasePath;
    }

    async delete<T = any, R = HttpServiceResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.getDvIBasePath();
        const authConfig = await getAuthConfig(config);
        return axios.delete(`${this.basePath}${url}`, authConfig);
    }

    async get<T = any, R = HttpServiceResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.getDvIBasePath();
        const authConfig = await getAuthConfig(config);
        return axios.get(`${this.basePath}${url}`, authConfig);
    }

    async post<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.getDvIBasePath();
        const authConfig = await getAuthConfig(config);
        return axios.post(`${this.basePath}${url}`, data, authConfig);
    }

    async put<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.getDvIBasePath();
        const authConfig = await getAuthConfig(config);
        return axios.put(`${this.basePath}${url}`, data, authConfig);
    }

    async patch<T = any, R = HttpServiceResponse<T>>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.getDvIBasePath();
        const authConfig = await getAuthConfig(config);
        return axios.patch(`${this.basePath}${url}`, data, authConfig);
    }

    axios<T>(config: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance(config);
    }
}
