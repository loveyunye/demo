import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
      ],
    },
  ],
});
