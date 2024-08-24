/**
 * @author shihw
 * @date 2024/8/22 13:58
 * @description
 */

import router from "@/router/index";
import {getLocalItem, setLocalItem} from "@/utils/localStore";

const whiteList = [
    '/login',
    '/register',
    '/index'
]

router.beforeEach(async (to, from, next) => {
    const path = to.path;
    if (whiteList.indexOf(path)!==-1) {
        next();
    }
    const token = getLocalItem("token");
    if (token === null) {
        next({path:'/index'});
    }else{
        next();
    }
})