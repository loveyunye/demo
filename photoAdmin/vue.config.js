module.exports = {
  devServer: {
    proxy: {
      '/api': {
        //本地服务接口地址
        target: 'http://localhost',
        ws: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
