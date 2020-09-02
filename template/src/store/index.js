import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import page from './modules/page';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    page,
  },
});

export default store;
