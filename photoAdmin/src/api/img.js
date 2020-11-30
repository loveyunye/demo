import MetroApi from '@/utils/http';

/**
 * @name 列表
 */
export const list = (data = {}) => MetroApi({ url: '/imgs', data });

/**
 * @name 删除
 */
export const del = (id) => MetroApi({ url: `/imgs/${id}`, method: 'DELETE' });

/**
 * @name 更新
 */
export const edit = (data) =>
  MetroApi({ url: `/imgs/${data.id}`, method: 'PATCH', data });

/**
 * @name 新增
 */
export const create = (data) =>
  MetroApi({ url: '/imgs', method: 'POST', data });

/**
 * @name 所有作品
 */
export const allWork = () => MetroApi({ url: '/works/all' });
