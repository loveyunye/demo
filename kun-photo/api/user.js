import http from '../utils/http.js'

export const getSelf = async () => {
  const user = await http({ url: '/users/mobile' })
  if (user && user.forbid) {
    wx.redirectTo({
      url: '/pages/forbid/forbid',
    })
  }
  return user
}
