import Vue from 'vue';
import VueRouter from 'vue-router';
import viewRoutes from './router';
import pageRoutes from './page';

Vue.use(VueRouter);

const routes = [...pageRoutes, ...viewRoutes];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
