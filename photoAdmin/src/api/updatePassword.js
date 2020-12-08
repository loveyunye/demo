import MetroApi from '@/utils/http';
/**
 * @name 登入
 */
export const updatePassword = (data) =>
  MetroApi({
    method: 'POST',
    url: '/users/updatePass',
    data,
    redirect_login: false,
  });
