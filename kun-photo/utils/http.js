const baseUrl = 'https://kabutong.cn/api'

// const throttle = function(fn, delay = 1000) {
//   let timer = null
//   return function() {
//     if (timer) {
//       clearTimeout(timer)
//     } else {
//       timer = setTimeout(() => {
//         fn()
//       }, delay)
//     }
//   }
// }

const Api = ({
  url,
  method = 'GET',
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    const authorization = wx.getStorageSync('openId') || ''
    wx.showLoading();
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header: {
        authorization,
      },
      success({ data }) {
        if (data.status === 401 || data.status === 404) {
          reject(data);
        } else {
          resolve(data);
        }
      },
      fail(error) {
        reject(error);
      },
      complete() {
        wx.hideLoading();
      }
    })
  })
}


export default Api;
