const fs = require('fs');
const path = require('path');
path.join(__dirname, '3dtiles.json')
const filePath = path.join(__dirname, 'json/js/scene.json')
const lastResult = path.join(__dirname, 'json/js/js-parts.json')



try {
  const rawDataStr = fs.readFileSync(filePath, 'utf8');
  const resultStr = fs.readFileSync(lastResult, 'utf8');
  // parse JSON string to JSON object
  const raw = JSON.parse(rawDataStr);
  const result = JSON.parse(resultStr);
  const childrenRaw = raw.root.children;
  // console.log(raw.root.children.length)
  // console.log(raw.root.children)
  console.log(result);
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
        children: result[i].index.map((i) => childrenRaw[i])
      }
    });

    //指定创建目录及文件名称，__dirname为执行当前js文件的目录
    const file = path.join(__dirname, `json/js/3dtiles_part_${i + 1}.json`);
    //写入文件
    fs.writeFileSync(file, content);
  }
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}