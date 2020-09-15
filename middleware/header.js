import { getCookie } from "../assets/js/cookieHandle"
export default function ({
  $axios,
  req,
  res
}) {
  
  if (!process.server) return;

  //获取cookie
  let cookieArr = req.headers.cookie;

  //设置axios的全局变量
  $axios.defaults.headers['X-USER-TOKEN'] = getCookie('pay_token', cookieArr);
  
}
