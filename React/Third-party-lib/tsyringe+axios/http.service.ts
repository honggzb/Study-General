import axios, { AxiosError, AxiosResponse } from 'axios';
import { GenericHttpService } from './generic-http-service';
import { getSession } from 'next-auth/react';
import { Session } from '~/models/auth';
import { dviSignOut } from '~/utils/auth';

export class HttpService extends GenericHttpService {
    static TOKEN = Symbol('HttpService');
    constructor() {
        super();
        // TODO write here interceptor logic
        this.axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
        this.axiosInstance.interceptors.request.use(requestInterceptor);
        axios.interceptors.response.use(responseInterceptor, errorInterceptor);
    }
}

const requestInterceptor = async (config: any) => {
    //config.headers?.Authorization = `bearer 123`;
    return config;
};

const responseInterceptor = async (response: AxiosResponse<any, any>) => {
    return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const errorInterceptor = async (error: AxiosError) => {
    if (error?.response?.status === 401) {
        const session = (await getSession()) as Session;
        if (session.idToken) {
            dviSignOut(session.idToken);
        }
    } else if (error?.response?.status === 500) {
        console.error(`Error Interceptor ${error?.response?.status}`);
    }
    return Promise.reject(error);
};
