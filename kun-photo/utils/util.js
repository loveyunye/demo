import http from './http.js'

const promiseHandler = (callback, params = {}) =>
  new Promise((resolve, reject) => {
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

const getOpenId = async () => {
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
}

const getdefaultUser = async () => {
  const { rawData } = await promiseHandler(wx.getUserInfo)
  const userRaw = JSON.parse(rawData)
  return {
    ...userRaw,
    name: userRaw.nickName,
    avatarUrl: userRaw.avatarUrl,
  }
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}




module.exports = {
  formatTime,
  http,
  promiseHandler,
  getOpenId,
  getdefaultUser,
}
