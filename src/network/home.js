/**
 * 此处创建home.js，处于request中的中间位置，home.vue只需要面向此处的home.js开发即可，不需要每次都去请求
 request.js，减小代码耦合
 * **/
import {request} from "./request";

export function getHomeMultidata() {
  return request({
    //获取首页轮播图数据，此处接口是轮播图数据
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
