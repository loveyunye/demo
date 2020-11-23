import Vue from 'vue';
import VueRouter from 'vue-router';
import viewRoutes from './router';
import pageRoutes from './page';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

const routes = [...pageRoutes, ...viewRoutes];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !Cookies.get('auth')) {
    window.location.href = '/login';
  } else {
    next();
  }
});

export default router;
