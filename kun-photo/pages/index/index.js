//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
  onLoad: function () {
    
  },
})
