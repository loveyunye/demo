const fs = require('fs');
const path = require('path')
const templatePath = path.resolve(__dirname, '../../template/proofing.html')
const html = fs.readFileSync(templatePath, 'utf8'); // 引入html模板
const pdf = require('html-pdf'); // html-pdf


const options = {
  "format": 'A4',
  "header": {
    "height": "10mm",
    "contents": ''
  }
};
const data = {}
data.images = `<img src="https://himg.bdimg.com/sys/portrait/item/public.1.b816d46a.beZO79m0gJ9a-3pCQO0Y5A.jpg" alt="" />`
let template = html.replace(/__([A-Za-z]+)__/g, function(a1, a2) {
  return data[a2] || '&nbsp;&nbsp;'
});


pdf.create(template, options).toFile('./test.pdf', function (err, res) {
  if (err) {
    return console.log(err);
  }
  console.log(res);
});