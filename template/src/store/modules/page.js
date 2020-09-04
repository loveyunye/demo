/**
 * 页面相关store
 */

export default {
  namespaced: true,
  state: {
    sideStatus: true, // 侧边栏状态
    tagRoutes: [], // 标签路由
    navRoutes: [], // 导航路由左侧
  },
  mutations: {
    setSideStatus(state, status) {
      state.sideStatus = status;
    },
  },
  actions: {},
};
