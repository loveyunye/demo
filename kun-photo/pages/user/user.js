// pages/user/user.js
const app = getApp()
const http = app.globalData.$http
const promiseHandler = app.globalData.promiseHandler

Page({
  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    errorStatus: false,
    require: [
      {
        label: '姓名',
        value: 'name',
        required: true,
        regMessage: '姓名不能包含表情',
      },
      {
        label: '手机',
        value: 'phone',
        regMessage: '请输入正确的手机号码',
      },
      {
        label: '邮箱',
        value: 'email',
        regMessage: '请输入正确的邮箱格式',
      },
      {
        label: '地址',
        value: 'address',
        regMessage: '地址不能包含表情',
      },
    ],
    hasAuth: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    form: {
      address: '',
      email: '', // 邮箱
      avatarUrl: '', // 头像
      name: '', // 名字
      openId: '', // openid
      phone: '', // 联系
    },
    defaulturl: 'http://citydo-fhl.oss-cn-hangzhou.aliyuncs.com/upload_a8e92584535dadd72c62b7c997b57878.png',

    groups: [
      {
        text: '拍照',
        value: 1
      },
      {
        text: '从手机相册选择',
        value: 2
      },
      {
        text: '查看大图',
        value: 3
      }
    ],
    showActionsheet: false,
  },
  /** input 失去焦点 */
  inputblur({ target, detail }) {
    const { name } = target.dataset;
    const form = {
      ...this.data.form,
    };
    form[name] = detail.value.trim();
    this.setData({
      form,
    });
  },

  // 获取用户信息
  async getUserInfo() {
    if (!this.data.hasAuth) {
      const { form } = this.data.form;
      const openId = await this.getOpenId();
      const user = await this.getdefaultUser();
      this.setData({
        hasAuth: true,
        form: {
          ...form,
          openId,
          ...user,
        },
        hasAuth: true
      })
    } else {
      this.save();
    }
  },

  async btnClick({ detail }) {
    this.setData({
      showActionsheet: false,
    });
    if (detail.value === 3) {
      wx.previewImage({
        urls: [this.data.defaulturl] // 需要预览的图片http链接列表
      })
    } else {
      try {
        const { tempFilePaths } = await promiseHandler(wx.chooseImage, {
          count: 1,
          sizeType: ['compressed'],
          sourceType: detail.value === 1 ? ['camera'] : ['album'],
        });
        wx.showLoading({
          title: '上传中',
        })
        const { data: imgData } = await promiseHandler(wx.uploadFile, {
          url: `https://kabutong.cn/api/upload`,
          name: 'image',
          filePath: tempFilePaths[0],
        })
        wx.hideLoading()
        const result = JSON.parse(imgData)
        this.setData({
          defaulturl: result.url,
          form: {
            ...this.data.form,
            avatarUrl: result.url,
          },
        })
      } catch (error) {
        console.log(error.errMsg || '出错了');
      }
    }
  },


  /** 表单操作 */
  async save() {
    const { require, form } = this.data;
    let vaild = true;
    for (let i = 0; i < require.length; i++) {
      const value = form[require[i].value];
      const { required = false, value: key } = require[i];
      if (required && !value) {
        this.showError(`${require[i].label}不能为空`);
        vaild = false;
        break;
      }
      if (value && require[i].regMessage) {
        let reg_vaild;
        switch (key) {
          case 'phone':
            reg_vaild = /^1[3456789]\d{9}$/.test(value);
            break;
          case 'email':
            reg_vaild = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(value) || !value;
            break;
          default:
            reg_vaild = !this.isEmojiCharacter(value);
        }
        if (!reg_vaild) {
          this.showError(require[i].regMessage);
          vaild = false;
          break;
        }
      }
    }
    // return false;
    if (vaild) {
      try {
        wx.showLoading({ title: '保存中' });
        await http({ url: '/users/mobile', data: form, method: 'POST' })
        wx.hideLoading();
      } catch (error) {
        console.log(error.errMsg || '出错误了');
      }
    }
  },

  showError(message) {
    this.setData({
      error: message,
      errorStatus: true,
    });
  },

  /** 图片上传相关方法 */
  open() {
    this.setData({
      showActionsheet: true,
    });
  },

  // 是否拥有emoji表情
  isEmojiCharacter(substring) {
    if (typeof substring !== 'string') {
      return false;
    }
    for (var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
          hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
          hs == 0x2b50) {
          return true;
        }
      }
    }
  },


  async getOpenId() {
    try {
      const { code } = await promiseHandler(wx.login);
      const { openid: openId } = await http({
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

  async getdefaultUser() {
    const { rawData } = await promiseHandler(wx.getUserInfo)
    const userRaw = JSON.parse(rawData)
    return {
      ...userRaw,
      name: userRaw.nickName,
      avatarUrl: userRaw.avatarUrl,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { canIUse, form, defaulturl } = this.data
    if (canIUse) {
      const openId = await this.getOpenId();
      let user;
      wx.showLoading({
        title: '加载中'
      });
      try {
        user = await http({ url: '/users/mobile' })
      } catch (error) {
        user = await this.getdefaultUser()
      }
      this.setData({
        form: {
          ...form,
          ...user,
          openId,
        },
        defaulturl: user.avatarUrl || defaulturl,
        hasAuth: canIUse
      })
      wx.hideLoading()
    }
  }
})