import MetroApi from '@/utils/http';

/**
 * @name 列表
 */
export const list = (data = {}) => MetroApi({ url: '/users', data });
