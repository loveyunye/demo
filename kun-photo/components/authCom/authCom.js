// components/authCom/authCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasAuth: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取用户信息
    async getUserInfo() {
      if (!this.data.hasAuth) {
        await this.getOpenId();
        this.setData({
          hasAuth: true,
        })
      }
    },
  }
})
