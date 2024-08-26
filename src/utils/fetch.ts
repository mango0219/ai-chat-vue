/**
 * @author shihw
 * @date 2024/8/23 11:05
 * @description
 */

import axios from "axios";
import '@/config/config'
import $config from "@/config/config";
import {getLocalItem, removeLocalItem, setLocalItem} from "@/utils/localStore";
import {showFailToast, showLoadingToast} from "vant";
import router from "@/router";

const codeMessage:any = {
    200: '[status:200]，服务器成功返回请求的数据。',
    201: '[status:201]，新建或修改数据成功。',
    202: '[status:202]，一个请求已经进入后台排队（异步任务）。',
    204: '[status:204]，删除数据成功。',
    400: '[status:400]，发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '[status:401]，用户没有权限（令牌、用户名、密码错误）。',
    403: '[status:403]，用户得到授权，但是访问是被禁止的。',
    404: '[status:404]，发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '[status:406]，请求的格式不可得。',
    410: '[status:410]，请求的资源被永久删除，且不会再得到的。',
    422: '[status:422]，当创建一个对象时，发生一个验证错误。',
    500: '[status:500]，服务器发生错误，请检查服务器。',
    502: '[status:502]，网关错误。',
    503: '[status:503]，服务不可用，服务器暂时过载或维护。',
    504: '[status:504]，网关超时。'
};

const fetch = (option:any) => {
    const instance = axios.create({
        baseURL: $config.baseURL
    })
    let toast:any = null;
    instance.interceptors.request.use(
        (config) => {
        if (option.loading){
            toast = showLoadingToast({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
                loadingType: 'spinner',
            });
        }
        const token = getLocalItem("token");
        config.headers.token = token;
        return config;
    },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => {
            if (toast){
                toast.close();
            }
            if (response.data.code === 777) {
                // token无效
                removeLocalItem("token");
                removeLocalItem("user_id");
                removeLocalItem("user_name");
                showFailToast(response.data.msg);
                // router.push("/index");
                setTimeout(()=>{
                    toast.close();
                    router.push("/index"); },1000);
                // return new Promise(() => {});
                return Promise.reject(new Error(response.data.msg));
            }
            return response.data;
        },
        ({response}) => {

            if (toast){
                toast.close();
            }
            const { config, status } = response || {};
            if (config) {
                response.statusText = codeMessage[status];
                showFailToast({
                    type: 'html',
                    message: `${config.url}<br />${response.statusText}`
                });
            }
            if (axios.isCancel(response)) {
                // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
                return new Promise(() => {});
            }
            return Promise.reject(response);
        }
    );
    return instance(option);
}

export default fetch;