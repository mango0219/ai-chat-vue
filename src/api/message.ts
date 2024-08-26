/**
 * @author shihw
 * @date 2024/8/24 11:32
 * @description
 */
import fetch from "@/utils/fetch";

export function getMessageListApi(params:any){
    return fetch({
        url:'/message/getList/' + params.sessionId,
        method:'GET'
    })
}