// pages/images/images.js
//获取应用实例
const app = getApp()
const http = app.globalData.$http
const promiseHandler = app.globalData.promiseHandler

Page({
  /**
   * 页面的初始数据
   */
  jsData: {
    columnsHeight: [0, 0],
  },
  data: {
    workId: 5,
    work: {},
    imgs: [],
    columns: [
      [],
      [],
    ],
    choose: 20, // 可选择
    selectNumber: 0, // 已选择
  },

  save() {},
  submit() {},

  // preview 图片
  lookItem(target) {
    const { path } = target.currentTarget.dataset
    wx.previewImage({
      urls: [path],
    })
  },

  // 选择单个
  selectItem(target) {
    const { col, index, selected } = target.currentTarget.dataset
    const { columns, selectNumber, choose } = this.data
    let number = selectNumber
    if (!selected) {
      if (selectNumber === choose) {
        wx.showToast({
          title: '选择数量已上限',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      number = selectNumber + 1
    } else {
      number = selectNumber - 1
    }

    if (columns[col][index]) {
      columns[col][index].selected = !selected
    }
    this.setData({
      columns,
      selectNumber: number
    })
  },

  // 获取详情
  async getDetail(workId) {
    const { work, imgs } = await http({
      url: `/works/detail/${workId}`
    })
    const choose = work.choose > imgs.length ? imgs.length : work.choose
    this.setData({ work, imgs, choose })
  },

  // 加载图片
  loadPic(target) {
    const { index } = target.currentTarget.dataset
    const { height, width } = target.detail
    const { imgs } = this.data
    if (imgs[index]) {
      //以750为宽度算出相对应的高度
      imgs[index].height = height * 750 / width
      imgs[index].isLoad = true
    }
    this.setData({
      imgs: imgs
    })
    this.judgeLoad()
  },

  // 判断加载
  judgeLoad() {
    const { imgs, columns } = this.data
    const { columnsHeight } = this.jsData
    let index = 0
    if (imgs.every((item) => item.isLoad)) {
      wx.hideLoading()
      for(let i = 0;i < imgs.length;i++) {
        index = columnsHeight[0] < columnsHeight[1] ? 0 : 1
        columns[index].push(imgs[i])
        columnsHeight[index] += imgs[i].height
      }
      this.setData({
        columns: columns,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    promiseHandler(wx.login).then((res) => {
      console.log(res)
    })
    const { workId = 5 } = options
    this.setData({
      workId
    })
  },

  setAuth() {
    console.log('auth')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading()
    const { workId } = this.data
    this.getDetail(workId)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})