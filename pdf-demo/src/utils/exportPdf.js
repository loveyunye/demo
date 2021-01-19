const path = require('path')
const pdf = require('html-pdf'); // html-pdf
const optionDefault = {
  "format": 'A4',
  "header": {
    "height": "10mm",
    "contents": ''
  },
  // "phantomPath": "/usr/local/phantomjs-2.1.1-linux-x86_64/bin/phantomjs" // 线上部署phantomjs路径
};

module.exports = {
  /**
   * 导出pdf
   * @param {String} template 模板
   * @param {String} name pdf名称
   * @param {Object} data 数据
   * @param {Function} fn 处理函数
   * @param {Object} options html-pdf参数
   */
  exportPdf(template, name, data, fn = null,  options = optionDefault) {
    return new Promise((resolve, reject) => {
      let dataReplace = { ...data };
      if (fn) { dataReplace = fn(data) }
      const html = template.replace(/__([A-Za-z]+)__/g, function(a1, a2) {
        return dataReplace[a2] || '&nbsp;&nbsp;'
      });
      const exportPath = path.resolve(__dirname, '../../temporary')
      pdf.create(html, options).toFile(`${exportPath}/${name}.pdf`, (err, res) => {
        if (err) {
          reject(err)
        } else {
          // resolve(res)
          resolve(`${name}.pdf`)
        }
      });
    })
  },
}



//接收前台POST过来的base64
// const base64Data = req.body.imgData;
// //过滤data:URL
// const dataBuffer = new Buffer.from(base64Data, 'base64'); // 解码图片
// fs.writeFile("image.png", dataBuffer, function (err) {
//   if (err) {
//     res.send(err);
//   } else {
//     res.send("保存成功！");
//   }
// });