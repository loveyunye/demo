import MetroApi from '@/utils/http';
/**
 * @name 登入
 */
export const login = (data) =>
  MetroApi({
    method: 'POST',
    url: '/login',
    data,
    redirect_login: false,
  });

/**
 * @name 登出
 */
export const logout = () => MetroApi({ method: 'POST', url: '/logout' });
