/**
 * @author shihw
 * @date 2024/8/22 14:51
 * @description localStorage工具类
 */
import {useCookies,globalCookiesConfig} from "vue3-cookies";

export function setLocalItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalItem(key: string) {
    if (localStorage.getItem(key)===null || localStorage.getItem(key)===undefined) {
        return null;
    }
    let value:any = localStorage.getItem(key)
    return JSON.parse(value);
}

export function removeLocalItem(key: string) {
    localStorage.removeItem(key);
}


const cookies = useCookies().cookies;

export function setCookieItem(key: string, value: any) {
    cookies.set(key, value,'3d');
}

export function getCookieItem(key: string) {
    const data = cookies.get(key);
    if(data===undefined || data===null) {
        return null;
    }
    return data;
}

export function removeCookieItem(key: string) {
    cookies.remove(key);
}


