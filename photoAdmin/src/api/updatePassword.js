import MetroApi from '@/utils/http';
/**
 * @name 重置密码
 */
export const updatePassword = (data) =>
  MetroApi({
    method: 'POST',
    url: '/users/updatePass',
    data,
    redirect_login: false,
  });
