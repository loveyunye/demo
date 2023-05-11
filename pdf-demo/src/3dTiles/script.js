const { exec, execSync } = require('child_process')
const fs = require('fs');
const path = require('path');
path.join(__dirname, '3dtiles.json')
const filePath = path.join(__dirname, 'json/js/scene.json')
const lastResult = path.join(__dirname, 'json/js/js-parts.json')


function getPart() {
  try {
    const rawDataStr = fs.readFileSync(filePath, 'utf8');
    const resultStr = fs.readFileSync(lastResult, 'utf8');
    // parse JSON string to JSON object
    const raw = JSON.parse(rawDataStr);
    const result = JSON.parse(resultStr);
    const childrenRaw = raw.root.children;
    for (let i = 0; i < result.length; i++) {
      var content = JSON.stringify({
        "asset":
        {
            "version": "1.0",
            "gltfUpAxis": "Y"
        },
        "geometricError": result[i].geometricError,
        "refine": "REPLACE",
        "root":
        {
          "boundingVolume":
          {
              "sphere": result[i].sphere
          },
          "geometricError": result[i].geometricError,
          children: result[i].index.map((i) => {
            const obj = childrenRaw[i];
            // const 
            return {
              ...childrenRaw[i]
            }
          })
        }
      });
  
      //指定创建目录及文件名称，__dirname为执行当前js文件的目录
      const file = path.join(__dirname, `json/js/parts/3dtiles_part_${i + 1}.json`);
      //写入文件
      fs.writeFileSync(file, content);
    }
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}

function getPartBest() {
  try {
    const rawDataStr = fs.readFileSync(filePath, 'utf8');
    const resultStr = fs.readFileSync(lastResult, 'utf8');
    // parse JSON string to JSON object
    const raw = JSON.parse(rawDataStr);
    const result = JSON.parse(resultStr);
    const childrenRaw = raw.root.children;
    for (let i = 0; i < result.length; i++) {
      var content = JSON.stringify({
        "asset":
        {
            "version": "1.0",
            "gltfUpAxis": "Y"
        },
        "geometricError": result[i].geometricError,
        "refine": "REPLACE",
        "root":
        {
          "boundingVolume":
          {
              "sphere": result[i].sphere
          },
          "geometricError": result[i].geometricError,
          children: result[i].index.map((i) => {
            try {
              const obj = childrenRaw[i];
              const url = obj.children[0].content.url;
              const b3dm = url.split('/')[0] + '_0018.b3dm'
              obj.children = []
              obj.content = {
                url: url.split('/')[0] + '/' + b3dm
              }
              // const 
              return {
                ...obj
              }
            } catch {
              return {}
            }
          })
        }
      });
  
      //指定创建目录及文件名称，__dirname为执行当前js文件的目录
      const file = path.join(__dirname, `json/js/parts/3dtiles_part_${i + 1}.json`);
      //写入文件
      fs.writeFileSync(file, content);
    }
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
}

const writeDir = path.join(__dirname, 'json/js/parts') // 修改目录、用来存储修改文件
const servePath = 'jishuiA' // 服务器目录
function push() {
  let rawExec = `./expect_scp_import.sh 192.168.10.73 zone zone_passwd /data/minio/data/3dmap/${servePath}`;
  fs.readdir(writeDir, function(err, files){
    for (let i=0; i<files.length; i++)
    {
      const filePath = path.join(writeDir, files[i]);
      const fileName = files[i];
      // console.log(`${rawExec}/${fileName} ${filePath}`)
      // break;
      try {
        execSync(`${rawExec}/${fileName} ${filePath}`);
        console.log(`提交成功${fileName}`, i + 1)
      } catch(error) {
        console.log('出错了')
      }
    } 
  })
}

push()
