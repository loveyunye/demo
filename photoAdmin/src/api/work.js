import MetroApi from '@/utils/http';

/**
 * @name 列表
 */
export const list = (data = {}) => MetroApi({ url: '/works', data });

/**
 * @name 删除
 */
export const del = (id) => MetroApi({ url: `/works/${id}`, method: 'DELETE' });

/**
 * @name 更新
 */
export const edit = (data) =>
  MetroApi({ url: `/works/${data.id}`, method: 'PATCH', data });

/**
 * @name 新增
 */
export const create = (data) =>
  MetroApi({ url: '/works', method: 'POST', data });

/**
 * @name 详情
 */
export const detail = (id) => MetroApi({ url: `/works/detail/${id}` });

/**
 * @name 关联
 */
export const link = (id, userId, link = true) =>
  MetroApi({
    url: `/works/link/${id}`,
    data: { userId, link },
    method: 'POST',
  });
