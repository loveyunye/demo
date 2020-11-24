import axios from 'axios';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';

const BASE_URL = '/api';

const instance = axios.create({
  baseURL: BASE_URL, // 设置统一请求地址
  withCredentials: true, // 跨域请求时是否需要使用凭证
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  },
);

const authorization = Cookies.get('auth'); // 权限码
console.log(authorization);

async function MetroApi(config = {}) {
  const { method = 'get', url = '', data = {}, redirect_login = true } = config;
  const opt = {
    data,
    url,
    method,
    headers: {
      authorization,
    },
  };

  if (method.toLowerCase() === 'get') {
    opt.params = data;
  }
  try {
    const res = await instance.request(opt);
    return res.data;
  } catch (err) {
    if (err.response.status === 401 && redirect_login) {
      Message.error('登录过期，无权限');
      // Cookies.remove('auth');
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 1500);
    }
    throw err;
  }
}

export default MetroApi;
