//index.js
//获取应用实例
const app = getApp()
const http = app.globalData.$http

Page({
  onLoad: function () {
    
  },
  data: {
    works: [],
    size: 10,
    page: 1,
    more: true,
    scrollTop: 0,
    
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
    const { size, works } = this.data
    const { records } = await http({
      url: '/works',
      data: { size, page }
    })
    this.setData({
      works: page === 1 ? records : [...works, ...records],
      more: records.length === size,
      page: page,
    })
  },

  scrollBottom(a) {
    const { more, page } = this.data;
    if (more) {
      this.getWorks(page + 1)
    }
  },

  onShow() {
    this.setData({
      scrollTop: 0,
    })
    this.getWorks(this.data.page);
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
