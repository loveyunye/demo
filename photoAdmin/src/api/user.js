import MetroApi from '@/utils/http';

/**
 * @name 列表
 */
export const list = (data = {}) => MetroApi({ url: '/users', data });

/**
 * @name 删除
 */
export const del = (id) => MetroApi({ url: `/users/${id}`, method: 'DELETE' });

/**
 * @name 更新
 */
export const edit = (data) =>
  MetroApi({ url: `/users/${data.id}`, method: 'PATCH', data });

/**
 * @name 新增
 */
export const create = (data) =>
  MetroApi({ url: '/users', method: 'POST', data });
