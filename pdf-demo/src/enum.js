const fs = require('fs');
const path = require('path')

const TABLE_TYPE = {
	proofing: {
    name: '打样单',
    fn(data) {
      data.images = data.imgs.map((item) => {
        return `<img src="${item.src}" alt="" />`
      }).join('')
      return data
    }
  },
  primary: {
    name: '首件检验记录表',
    fn(data) {
      data.images = data.imgs.map((item) => {
        return `<img src="${item.src}" alt="" />`
      }).join('')
      return data
    }
  },
	panel: '面板成品首检记录表', // 打样申请单
	finished: '成品首检记录表', // 打样申请单
}
module.exports = function(type) {
  const templatePath = path.resolve(__dirname, `./template/${type}.html`)
  const template = fs.readFileSync(templatePath, 'utf8'); // 引入html模板
  const { name, fn } = TABLE_TYPE[type]
  return { name, fn , template }
}