import $http from './utils/http';

//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    $http,
    promiseHandler(callback, params = {}) {
      return new Promise((resolve, reject) => {
        callback({
          ...params,
          success(res) {
            resolve(res);
          },
          fail(res) {
            reject(res);
          },
        })
      })
    },
    async getOpenId() {
      const { promiseHandler, $http } = this.globalData
      try {
        const { code } = await promiseHandler(wx.login);
        const { openid: openId } = await $http({
          url: '/getCode',
          data: { code }
        });
        wx.setStorageSync('openId', openId)
        return openId;
      } catch (error) {
        console.log(error.errMsg || '出错了');
        return false;
      }
    },
  }
})