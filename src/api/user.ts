/**
 * @author shihw
 * @date 2024/8/23 11:04
 * @description
 */
import fetch from "@/utils/fetch";
import type {AxiosResponse} from "axios";


export function registerApi(params:any) {
    return fetch({
        url: '/user/register',
        method: 'post',
        loading: true,
        data: params
    });
}

export function loginApi(params:any) {
    return fetch({
        url: '/user/login',
        method: 'post',
        loading: true,
        data: params
    });
}

export function logoutApi(params:any) {
    return fetch({
        url: '/user/logout/'+ params.id,
        method: 'get',
        loading: true
    });
}


export function verifyTokenApi(params:any) {
    return fetch({
        url: '/user/verifyToken',
        method: 'post',
        loading: true,
        data: params
    });
}