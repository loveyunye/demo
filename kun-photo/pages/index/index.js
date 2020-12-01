//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {
    
  },
  data: {
    background: [
      {
        text: 'demo-1',
        src:'https://img.chainnews.com/material/images/0ae9b81f644d6589ca5c2bee9ef6c4d5.jpg-article'
      },
      {
        text: 'demo-2',
        src: 'http://nazacitydo.oss-cn-hangzhou.aliyuncs.com/ia_200000287.jpg'
      },
      {
        text: 'demo-3',
        src: 'http://nazacitydo.oss-cn-hangzhou.aliyuncs.com/ia_100000000790.jpg'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  openLocation() {
    wx.openLocation({
      latitude: 39.912432,
      longitude: 116.470235,
      name: '正邦集团',
      address: '吉安市吉州区禾埠街道井冈山大道吉安市商会大厦122号',
      success (res) {
        if (res.confirm) {
          console.log(res);
        }
      },
      fail (res) {
        console.log(res.errMsg);
      },
      complete () {
        wx.hideKeyboard();
      },
    })
  },

  download() {
    wx.makePhoneCall({
      phoneNumber: '15879067853',
      success (res) {
        if (res.confirm) {
          console.log(res);
        }
      },
      fail (res) {
        console.log(res.errMsg);
      },
      complete () {
        wx.hideKeyboard();
      },
    });
  }
})
