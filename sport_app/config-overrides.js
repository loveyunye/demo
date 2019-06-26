const { override, fixBabelImports, addLessLoader, addBabelPlugin, 
  // addBabelPlugins, useBabelRc 
} = require('customize-cra');

module.exports =  override(
  fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true
  }),
  addBabelPlugin(["@babel/plugin-proposal-decorators", {"legacy": true}]),
);