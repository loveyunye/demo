//使用fs模块，读取b3dm文件
const fs = require('fs');
const path = require('path')
const filePath = path.join(__dirname, 'Tile_0016_0014_0018.b3dm');
const glftPath = path.join(__dirname, 'gen18.glb');
console.log(filePath)

fs.readFile(filePath, (err, filebuffer) => {
  if (err) return
  //读取的为nodejs的Buffer类型，参见api进行解析
  //格式说明头读取
  const _headstr = filebuffer.toString('utf8', 0, 4);
  //版本号和文件总长度读取
  const _version = filebuffer.readUInt32LE(4);
  const _bytelen = filebuffer.readUInt32LE(8);

  const tableJsonLen = filebuffer.readUInt32LE(12);
  const bindLen = filebuffer.readUInt32LE(16);
  const batchTableLen = filebuffer.readUInt32LE(20);
  const batchBindLen = filebuffer.readUInt32LE(24);
  //按照以上方式，featuretable和batchtable等进行读取

  console.log(filebuffer.length)

  // const glft = filebuffer.subarray(28);
  const glft = filebuffer.subarray(48);

  console.log(glft.length)
  const glftJson = glft.toString('utf8')


  fs.writeFileSync(glftPath,glft);

  console.log(glftJson);


  console.log(_headstr)
})
