import Layout from './Layout';

const viewRouters = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: 'work',
    // redirect: 'dashboard',
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/index'),
    //     name: 'dashboard',
    //     // hidden: true,
    //     meta: {
    //       title: '首页',
    //       icon: 'el-icon-s-home',
    //       affix: true,
    //     },
    //   },
    // ],
  },
  {
    path: '/work',
    name: 'work',
    component: Layout,
    redirect: '/work/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/work'),
        name: 'work-index',
        meta: { title: '作品', icon: 'el-icon-camera-solid', fixed: true },
      },
      {
        path: 'detail',
        component: () => import('@/views/work/detail'),
        hidden: true,
        name: 'work-detail',
        meta: { title: '详情', icon: 'el-icon-camera-solid', fixed: true },
      },
    ],
  },
  {
    path: '/img',
    name: 'img',
    component: Layout,
    redirect: '/img/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/img'),
        name: 'img-index',
        meta: { title: '图片', icon: 'el-icon-picture', fixed: true },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user'),
        name: 'user-index',
        meta: { title: '用户', icon: 'el-icon-user-solid', fixed: true },
      },
      {
        path: 'detail',
        component: () => import('@/views/user/detail'),
        hidden: true,
        name: 'user-detail',
        meta: { title: '详情', icon: 'el-icon-camera-solid', fixed: true },
      },
    ],
  },
  {
    path: '/manager',
    name: 'manager',
    component: Layout,
    redirect: '/manager/index',
    children: [
      {
        path: 'manager',
        component: () => import('@/views/manager'),
        name: 'manager-index',
        meta: { title: '管理员', icon: 'el-icon-s-custom', fixed: true },
      },
    ],
  },
];

export default viewRouters;
