const path = require('path')
const schedule = require('node-schedule');
const { unlinkSync, statSync, readdirSync } = require('fs')

// 临时文件夹
const tempPath = path.resolve(__dirname, '../../temporary')

function removeTemporary() {
  const files = readdirSync(tempPath);
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(tempPath, files[i]);
    const stat = statSync(newPath);
    if (!stat.isDirectory()) {
      unlinkSync(newPath); // 删除文件
    }
  }
}


const scheduleTask = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('30 * * * * *', () => {
    // console.log('scheduleTask:' + new Date());
    removeTemporary();
  });
}

module.exports = { scheduleTask }
