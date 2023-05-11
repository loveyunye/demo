var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

//获取本地json文件
var file = path.join(__dirname, './1.txt');
console.log(__dirname, file)
//读取json文件
fs.readFile(file, 'utf-8', function(err, data) {
if (err) {
    res.send('文件读取失败');
} else {
  const str = data.replace(/[\r\n]/g,"")
  
    var points=str.split(',');
    //格式化数据
    const allArr  = [];
    for(var i=0,len=points.length;i<len;i+=7){
      allArr.push(points.slice(i,i+7));
    }

    
    var content = JSON.stringify(allArr); 

    //指定创建目录及文件名称，__dirname为执行当前js文件的目录
    var file = path.join(__dirname, './points2.json'); 

    //写入文件
    fs.writeFile(file, content, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('文件创建成功，地址：' + file);
    });
}});
