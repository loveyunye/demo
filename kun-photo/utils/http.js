const authorization = wx.getStorageSync('authorization') || ''
const baseUrl = 'http://localhost:3000/api'

const Api = ({
  url,
  method = 'GET',
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    wx.showLoading();
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header: {
        authorization,
      },
      success(res) {
        resolve(res.data);
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
