import MetroApi from '@/utils/http';

/**
 * @name 列表
 */
export const list = (data = {}) => MetroApi({ url: '/works', data });

/**
 * @name 删除
 */
export const del = (id) => MetroApi({ url: `/works/${id}`, method: 'DELETE' });
