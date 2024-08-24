/**
 * @author shihw
 * @date 2024/8/23 17:33
 * @description
 */
import fetch from "@/utils/fetch";

export function getSessionListApi(params:any){
    return fetch({
        url: `/session/getList/${params.userId}`,
        method: 'get',
        loading: true
    })
}

export function createSessionApi(params:any){
    return fetch({
        url: `/session/createSession/${params.userId}`,
        method: 'get',
        loading: true
    })
}

export function deleteSessionApi(params:any){
    return fetch({
        url: `/session/deleteSession/${params.id}`,
        method: 'get',
        loading: true
    })
}