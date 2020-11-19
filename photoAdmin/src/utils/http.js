import axios from 'axios';
import { Message } from 'element-ui';

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

async function MetroApi(config = {}) {
  const {
    method = 'post',
    url = '',
    data = {},
    headers = {},
    redirect_login = true,
  } = config;
  const opt = { data, url, method, headers };

  if (method.toLowerCase() === 'get') {
    opt.params = data;
  }
  try {
    const res = await instance.request(opt);
    return res.data;
  } catch (err) {
    if (err.response.status === 401 && redirect_login) {
      Message.error('登录过期，无权限');
    }
    throw err;
  }
}

export default MetroApi;
