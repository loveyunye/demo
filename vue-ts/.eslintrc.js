module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 取消未定义变量报错
    'no-undef': 0,
    // 禁止使用new Function(); 语句
    'no-new-func': 2,
    'space-before-function-paren': ["error", "never"],
    'space-after-keywords': 0,
    "space-in-parens": 0,
    // 文末强制换行
    // "eol-last": 0,
    // 语句强制分号结尾
    "semi": [2, "always"]
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaFeatures": {
      "legacyDecotators": true
    }
  }
};
