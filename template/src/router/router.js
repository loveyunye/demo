import Layout from './Layout';
import EmptyRouter from './Layout/EmptyRouter';

const viewRouters = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/index'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'el-icon-search',
          hidden: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: Layout,
    redirect: '/test/test1',
    meta: { title: '测试页', icon: 'el-icon-search' },
    children: [
      {
        path: 'test1',
        component: () => import('@/views/test'),
        name: 'test1',
        meta: { title: '测试1', icon: 'dashboard', fixed: true },
      },
      {
        path: 'test2',
        component: () => import('@/views/test/index2'),
        name: 'test2',
        meta: { title: '测试2', icon: 'dashboard', fixed: true },
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/auth',
    meta: { title: '系统', icon: 'el-icon-search' },
    children: [
      {
        path: 'auth',
        component: EmptyRouter,
        name: 'auth',
        meta: { title: '权限', icon: 'dashboard' },
        children: [
          {
            path: 'auth2020',
            component: () => import('@/views/globalSystem/auth'),
            name: 'auth2020',
            meta: { title: '设置2020' },
          },
          {
            path: 'auth2021',
            component: () => import('@/views/globalSystem/auth'),
            name: 'auth2021',
            meta: { title: '设置2021' },
          },
        ],
      },
      {
        path: 'color',
        component: EmptyRouter,
        name: 'color',
        meta: { title: '颜色', icon: 'dashboard' },
        children: [
          {
            path: 'color2020',
            component: () => import('@/views/globalSystem/color'),
            name: 'color2020',
            meta: { title: '设置2020' },
          },
        ],
      },
    ],
  },
];

export default viewRouters;
