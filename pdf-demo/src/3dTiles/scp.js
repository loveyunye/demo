const { exec, execSync } = require('child_process')
const path = require('path')
const readDir = path.join(__dirname, 'json/js/raw') // 读取目录、用来存储源文件
const writeDir = path.join(__dirname, 'json/js/update') // 修改目录、用来存储修改文件
const servePath = 'jishuiA' // 服务器目录

const fs = require('fs');

function pull() {
  // 拉取文件
  let rawExec = `./expect_scp.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/${servePath}`;
  for (let i = 0;i < 51;i++) {
    // 目录编号
    let dir = `/Tile_00${i < 10 ? `0${i}` : i}_`
    for (let j = 0;j < 100;j++) {
      let number = `00${j < 10 ? `0${j}` : j}`
      const name = dir + number
      console.log(name);
      try {
        execSync(`${rawExec}${name}${name}.json ${readDir}${name}.json`);
      } catch(error) {
        console.log('出错了: 该文件不存在')
        // console.log(name);
        continue;
        // break;
      }
    }
  }
}
// 修改文件
function modify() {
  fs.readdir(readDir, function(err, files){
    for (let i=0; i<files.length; i++) {
      const filePath = path.join(readDir, files[i]);
      const str = fs.readFileSync(filePath, 'utf8');
      const jsonObj = JSON.parse(str)
      if (i >= 0) {
        // console.log(jsonObj.root.children[0].children[0].children[0].children[0].children[0].children[0])
        // const children = jsonObj.root.children[0].children[0].children[0].children[0].children[0].children[0]
        try {
          // 15 - 16 -17 - 18 - 19 - 20(去除20层级)
          // jsonObj.root.children[0].children[0].children[0].children[0].children[0].children = []
          
          // 吉水模型处理
          // 16 -17 - 18 - 19 - 20(去除20层级)
          // 16 -17 - 18 - 19(去除19层级)
          jsonObj.root.children[0].children[0].children[0].children = []

          // 15 - 16 -17 - 18 - 19 - 20-21(去除21层级)
          // if (jsonObj.root.children[0].children[0].children[0].children[0].children[0].children) {
          //   jsonObj.root.children[0].children[0].children[0].children[0].children[0].children.forEach((i) => {
          //     i.children = []
          //   })
          // }
        } catch(error) {}
        const file = path.join(writeDir, files[i]);
        fs.writeFileSync(file, JSON.stringify(jsonObj));
        
        // break;
      }
    } 
  });
}

// 上报文件
function push() {
  let rawExec = `./expect_scp_import.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/${servePath}`;
  fs.readdir(writeDir, function(err, files){
    for (let i=0; i<files.length; i++)
    {
      const filePath = path.join(writeDir, files[i]);
      const fileName = files[i];
      const name = files[i].split('.')[0]
      // console.log(`${rawExec}/${name}/${fileName}`)
      // if (i > 5) {
      // break;
      // }
      if (i > 0) {
        try {
          execSync(`${rawExec}/${name}/${fileName} ${filePath}`);
          console.log(`提交成功 ${name}/${fileName}`, i + 1)
        } catch(error) {
          console.log('出错了')
        }
      }
    } 
  })
}

// pull()
// modify();
push()


// 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/wanzaiA/Tile_0050_000/Tile_0050_000.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json/Tile_0050_000.json
// try {
//   execSync('./expect_scp.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json');
//   console.log('下载了1')
//   execSync('./expect_scp.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/wanzaiA/Tile_0000_0018/Tile_0000_0018.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json');
//   console.log('下载了1')
// } catch(error) {
//   console.log('出错了')
// }




// scp zone@192.168.10.73:/data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo
// scp zone@192.168.10.73:/data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json
// scp 指令 -p zone_passwd
// scp -p zone_passwd zone@192.168.10.73:/data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json
// // 
// ./expect_scp 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json
// brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb

// sh ./expect_scp.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/wanzaiA/Tile_0000_0017/Tile_0000_0017.json /Users/yunye/workspace/demo/pdf-demo/src/cesium/73json


