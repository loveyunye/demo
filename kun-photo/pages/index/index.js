//index.js
//获取应用实例
import { http, getOpenId, promiseHandler, getdefaultUser } from '../../utils/util.js'
import { getSelf } from '../../api/user.js'

Page({
  data: {
    works: [],
    size: 10,
    page: 1,
    more: true,
    scrollTop: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasAuth: true,
    userInfo: {},
    defaulturl: 'http://citydo-fhl.oss-cn-hangzhou.aliyuncs.com/upload_a8e92584535dadd72c62b7c997b57878.png'
  },

  async getUserInfo() {
    if (!this.data.hasAuth) {
      const openId = await getOpenId()
      const user = await getdefaultUser();
      const add = await http({ url: '/users/mobile', data: {
        openId,
        ...user,
      }, method: 'POST' })
      this.setData({
        userInfo: add
      })
      this.getWorks(1)
    }
  },

  editUser() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },

  goDetail(target) {
    const { id } = target.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/images/images?workId=${id}`
    })
  },

  // 获取作品
  async getWorks(page) {
    const { size, works, userInfo } = this.data
    if (userInfo.type === 'normal') {
      const works = await http({
        url: '/works/mobile/normal',
      })
      this.setData({
        more: false,
        works,
      })
    } else {
      const { records } = await http({
        url: '/works/mobile',
        data: { size, page }
      })
      this.setData({
        works: page === 1 ? records : [...works, ...records],
        more: records.length === size,
        page: page,
      })
    }
  },

  scrollBottom(a) {
    const { more, page } = this.data;
    if (more) {
      this.getWorks(page + 1)
    }
  },

  async onShow() {
    if (this.data.canIUse) {
      const openId = await getOpenId();
      let user;
      wx.showLoading({ title: '加载中' });
      try {
        user = await getSelf()
      } catch (error) {
        user = await getdefaultUser()
        user = await http({
          url: '/users/mobile',
          method: 'POST',
          data: {
            openId,
            ...user,
          }
        })
      }
      this.setData({
        userInfo: user,
        hasAuth: true,
        scrollTop: 0,
      })
      if (user.id) {
        this.getWorks(1);
      }
      wx.hideLoading()
    } else {
      this.setData({
        hasAuth: false,
      })
    }
  },

  // 打开地址
  openLocation() {
    wx.openLocation({
      latitude: 39.912432,
      longitude: 116.470235,
      name: '正邦集团',
      address: '吉安市吉州区禾埠街道井冈山大道吉安市商会大厦122号'
    })
  },

  // 打电话
  call() {
    wx.makePhoneCall({
      phoneNumber: '15879067853',
    });
  }
})
