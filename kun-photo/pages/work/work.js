//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {

  },
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    works: [
      {
        id: 1222,
        title: '早期作品',
        date: '2020-11-09',
        imgs: [
          'https://szhz.huzhou.gov.cn/image/80971360456794112.jpg',
          'https://szhz.huzhou.gov.cn/image/81364588767059968.jpg',
          'https://szhz.huzhou.gov.cn/image/81364588767059968.jpg',
        ]
      },
      {
        id: 1222,
        title: '后期作品',
        date: '2020-11-20',
        imgs: [
          'https://szhz.huzhou.gov.cn/image/80971360456794112.jpg',
          'https://szhz.huzhou.gov.cn/image/81364588767059968.jpg',
          'https://szhz.huzhou.gov.cn/image/81364588767059968.jpg',
        ]
      }
    ]
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
