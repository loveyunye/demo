/**
 * 页面router
 */
const pageRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/login'),
  },
  {
    path: '*',
    name: 'nodeFound',
    component: () => import('@/page/noFound'),
  },
];

export default pageRoutes;
