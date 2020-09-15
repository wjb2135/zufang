import qs from "qs";
import { Message } from 'element-ui';
import { getCookie } from "../assets/js/cookieHandle";
export default function ({
  $axios,
  redirect
}) {

  if (!process.server) { // 当不是服务端的时候获取cookie设置header
    $axios.setHeader('X-USER-TOKEN', getCookie("pay_token"))
  }

  $axios.onRequest(config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    if (!process.server) {
      $axios.setHeader('X-USER-TOKEN', getCookie("pay_token"))
    }

    return config;
  })

  $axios.onResponse(response => {
    if (response.data.errcode != undefined && response.data.errcode != 0) {
      if (response.data.errcode == 10006) { // 用户未登录或登录状态信息过期
        redirect({
          path: '/error_page',
          query: {
            err_info: '连接失效'
          }
        })
      }
      if (response.data.errcode == 10005) { // 当天关闭交易次数过多
        redirect({
          path: '/error_page',
          query: {
            err_info: '您当天关闭交易次数过多'
          }
        });
      }
      return Promise.reject(response.data);
    }
    else {
      return response.data;
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}