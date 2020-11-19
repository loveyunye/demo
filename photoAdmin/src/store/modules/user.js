export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
      name: '名称',
      avatarUrl:
        'http://citydo-fhl.oss-cn-hangzhou.aliyuncs.com/upload_265eafa355fd9faec680f2ca0a665d43.png',
      gender: 0,
      city: '南昌',
      openId: '1111111111111111',
      password: '123456',
      account: 'admin11',
      type: 'admin',
      createdAt: '2020-11-14T03:49:33.000Z',
      updatedAt: '2020-11-14T03:49:33.000Z',
      deletedAt: null,
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
};
