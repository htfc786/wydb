// 感谢鱼皮大佬的代码提供思路
// https://github.com/liyupi/yudada/blob/master/yudada-frontend/src/request.ts

import axios from "axios";
import { message } from 'ant-design-vue';

const myAxios = axios.create({
  baseURL: "/api",
  timeout: 60000,
  withCredentials: true,
});

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    // console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // const { data } = response;

    // // 未登录
    // if (data.code === 40100) {
    //   // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
    //   if (
    //     !response.request.responseURL.includes("user/get/login") &&
    //     !window.location.pathname.includes("/user/login")
    //   ) {
    //     message.warning("请先登录");
    //     window.location.href = `/user/login?redirect=${window.location.href}`;
    //   }
    // }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    if (error.code === "ECONNABORTED") {
      message.error("网络异常：请求超时！");
      // message.error("网络不给力，请检查网络连接，或刷新页面重试！");
    }

    return Promise.reject(error);
  }
);

export default myAxios;