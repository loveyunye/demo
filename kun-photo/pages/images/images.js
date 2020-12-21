// pages/images/images.js
//获取应用实例
import { http, getOpenId, promiseHandler, getdefaultUser } from '../../utils/util.js'
import { getSelf } from '../../api/user.js'

Page({
  /**
   * 页面的初始数据
   */
  jsData: {
    columnsHeight: [0, 0],
  },
  data: {
    workId: null,
    work: {},
    imgs: [],
    columns: [
      [],
      [],
    ],
    choose: 20, // 可选择
    selectNumber: 0, // 已选择
    selectIds: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasRegister: true, // 已经注册
    isSelf: false,
    isSubmit: false,
    used: false,
    userInfo: null,
    code: '',
  },
  
  async submit(submit) {
    const { columns, workId } = this.data;
    const imgs = [
      ...columns[0].filter(i => i.selected).map(i => i.id),
      ...columns[1].filter(i => i.selected).map(i => i.id),
    ]
    wx.showLoading();
    await http({ url: `/works/mobile/selectImgs/${workId}`, method: 'POST', data: { imgs, submit } })
    wx.hideLoading();
    this.getSelected()
  },


  save(target) {
    const { action } = target.currentTarget.dataset
    if (action) {
      wx.showModal({
        title: '提示',
        content: '确定提交吗，将不再修改？',
        success: (res) => {
          if (res.confirm) {
            this.submit(true)
          }
        }
      })
    } else {
      this.submit(false)
    }
  },

  async getUserInfo() {
    if (!this.data.hasRegister) {
      const openId = await getOpenId()
      const user = await getdefaultUser();
      const add = await http({
        url: '/users/mobile', data: {
          openId,
          ...user,
        }, method: 'POST'
      })
      this.setData({
        userInfo: add,
        hasRegister: true,
      })
      this.getDetail()
    }
  },

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
    const { columns, selectNumber, choose, isSubmit } = this.data
    if (isSubmit) return;

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

  // 获取链接内容
  async getShare() {
    const { userInfo, used, code } = this.data;
    if (userInfo && !used && code) {
      await http({ url: `/share/${code}`, method: 'POST' })
      this.setData({
        isSelf: true,
      })
    }
  },

  // 获取已选
  async getSelected() {
    const { userInfo, workId, columns } = this.data;
    if (userInfo && workId) {
      const workUser = await await http({ url: `/works/mobile/self/${workId}` })
      if (workUser) {
        const imgs = workUser.imgs
        columns.forEach((item) => {
          item.forEach((i) => {
            if (imgs.some(img => i.id === img)) {
              i.selected = true
            }
          })
        })
        this.setData({
          isSelf: true,
          isSubmit: workUser.submit,
          selectIds: workUser.imgs,
          columns: columns,
          selectNumber: workUser.imgs.length,
        })
      }
    }
  },


  // 获取详情
  async getDetail() {
    const { workId, code, userInfo } = this.data
    if (workId) {
      const { work, imgs, users } = await http({
        url: `/works/detail/${workId}`
      })
      const choose = work.choose > imgs.length ? imgs.length : work.choose
      this.setData({ work, imgs, choose })
    } else if (code) {
      const { work, imgs, share } = await http({
        url: `/works/code/${code}`
      })
      const choose = work.choose > imgs.length ? imgs.length : work.choose
      this.setData({ work, imgs, choose, used: share.used, workId: work.id })
      await this.getShare()
    }
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
      this.getSelected()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { workId, code } = options
    if (workId) {
      this.setData({
        workId,
      })
    } else if (code) {
      this.setData({
        code,
      })
    }
  },

  setAuth() {
    console.log('auth')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    if (this.data.canIUse) {
      const openId = await getOpenId();
      let user;
      wx.showLoading();
      try {
        user = await getSelf()
        this.setData({
          hasRegister: true,
          userInfo: user
        })
      } catch (error) {
        this.setData({
          hasRegister: false,
        })
        wx.hideLoading()
      }
    } else {
      this.setData({
        hasRegister: false,
      })
    }
    this.getDetail()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const { userInfo, workId } = this.data
    if (userInfo && userInfo.type !== 'normal') {
      return {
        title: '摄影',
        path: `/pages/images/images?workId=${this.data.workId}`,
        success: function (res) {
          console.log(res, '分享成功');
        },
        fail: function (res) {
          console.log(res, '分享失败');
        },
        promise: new Promise(async (resove, reject) => {
          const share = await http({
            url: `/share/${this.data.workId}`,
          })
          console.log(`/pages/images/images?code=${share.code}`)
          resove(`/pages/images/images?code=${share.code}`)
        }),
      }
    } else {
      return {
        title: '摄影',
        path: `/pages/images/images?workId=${workId}`,
      }
    }
  }
})