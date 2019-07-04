import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

export const constantRouter = [
  {
    path: '/find',
    name: 'find',
    title: '发现',
    icon: 'icon-icon_notice',
    component: () => import( './views/find/Find.vue'),
  },
  {
    path: '/plan',
    name: 'plan',
    title: '计划',
    icon: 'icon-icon_compile',
    component: () => import('./views/plan/Plan.vue'),
  },
  {
    path: '/target',
    name: 'target',
    title: '目标',
    icon: 'icon-icon_little_taget',
    component: () => import('./views/target/Target.vue'),
  },
  {
    path: '/collection',
    name: 'collection',
    title: '收藏',
    icon: 'icon-icon_star',
    component: () => import('./views/collection/Collection.vue'),
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'find',
      children: constantRouter,
    },
  ],
});
