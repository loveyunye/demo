module.exports = {
  devServer: {
    proxy: {
      '/api': {
        //本地服务接口地址
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
};
