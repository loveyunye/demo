/**
 * 页面相关store
 */

export default {
  namespaced: true,
  state: {
    sideStatus: true, // 侧边栏状态
    tagRoutes: [], // 标签路由
    navRoutes: [],
  },
  mutations: {
    setSideStatus(state, status) {
      state.sideStatus = status;
    },
  },
  actions: {},
};
