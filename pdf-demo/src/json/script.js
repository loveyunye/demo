var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

function getMax(arr, isIndex = false, refer = -Infinity) {
  var max = refer;
  var index = [0]
  for (var i = 1; i < arr.length; i++) {
    arr[i] > max ? index = [i] : arr[i] === max ? index.push(i) : null
    arr[i] > max ? max = arr[i] : null
  }
  return isIndex ? index : max
}
function getMin(arr, isIndex = false, refer = Infinity) {
  var min = refer;
  var index = [0]
  for (var i = 1; i < arr.length; i++) {
    arr[i] < min ? index = [i] : arr[i] === min ? index.push(i) : null
    arr[i] < min ? min = arr[i] : null

  }
  return isIndex ? index : min
}

function doRepeat(points) {
  const obj = {};
  const temp = []
  for (var i=0; i<points.length; i++) {
    if( !obj[points[i].toString()] ) {
      temp.push(points[i]);
      obj[points[i].toString()] = 1;
    } 
  }
  return temp
}

function exportJson(data, name) {
  var content = JSON.stringify(data);
  //指定创建目录及文件名称，__dirname为执行当前js文件的目录
  var file = path.join(__dirname, `./${name}.json`);

  //写入文件
  fs.writeFile(file, content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('文件创建成功，地址：' + file);
  });
}


//获取本地json文件
var file = path.join(__dirname, './1.txt');
//读取json文件
fs.readFile(file, 'utf-8', function (err, data) {
  if (err) {
    res.send('文件读取失败');
  } else {
    const str = data.replace(/[\r\n]/g, "")

    var points = str.split(',').map((i) => Number(i));
    // points = points.slice(0, parseInt(points.length / 3))
    //格式化数据
    let allArr = [];
    for (var i = 0, len = points.length; i < len; i += 7) {
      allArr.push(points.slice(i, i + 7));
    }
    allArr = allArr.filter((i) => i.length === 7)
    console.log('总点量', allArr.length)

    const maxX = getMax(allArr.map((i) => i[0] + i[3]))
    const minX = getMin(allArr.map((i) => i[0]))

    const maxY = getMax(allArr.map((i) => i[1] + i[4]))
    const minY = getMin(allArr.map((i) => i[1]))

    const maxZ = getMax(allArr.map((i) => i[2] + i[5]))
    const minZ = getMin(allArr.map((i) => i[2]))

    method2()
    function method2() {
      const maxMinArr = [maxX, maxY, maxZ, minX, minY, minZ]
      let wirePointsYZ = doRepeat(sectionFun(0, 1, 2, maxMinArr, allArr))
      console.log('优化后点量YZ面',wirePointsYZ.length)

      let wirePointsYX = doRepeat(sectionFun(2, 1, 0, maxMinArr, allArr))
      console.log('优化后点量YX面',wirePointsYX.length)

      let wirePointsZX = doRepeat(sectionFun(1, 2, 0, maxMinArr, allArr))
      console.log('优化后点量ZX面',wirePointsZX.length)


      let wirePoints = [...wirePointsYZ, ...wirePointsYX, ...wirePointsZX]
      wirePoints = doRepeat(wirePoints)
      console.log('去重后总量', wirePoints.length)
      
      let componentsPoints = componentsFun(2, 0, 1, wirePoints)
      console.log('Z轴组合后点量：', componentsPoints.length)
      componentsPoints = componentsFun(0, 1, 2, componentsPoints)
      console.log('X轴组合后点量：', componentsPoints.length)
      componentsPoints = componentsFun(1, 0, 2, componentsPoints)
      console.log('Y轴组合后点量：', componentsPoints.length)
      exportJson(componentsPoints, 'componentsPoints')
      exportJson(wirePoints.slice(0, parseInt(wirePoints.length / 3)), 'wirePoints')
    }

    // 切方法 0-x 1-y 2-z
    function sectionFun(index, oI1, oI2, maxMinArr, points,  d = 5) {
      const wirePoints = []
      const max1 = maxMinArr[index]
      const min1 = maxMinArr[index + 3]
      const max2 = maxMinArr[oI1]
      const min2 = maxMinArr[oI1 + 3]
      const max3 = maxMinArr[oI2]
      const min3 = maxMinArr[oI2 + 3]
      // console.log(maxMinArr, max1, min1)
      for (let i = min1;i < max1;i+=d) {
        const otherPoints1 = points.filter((p) => {
          return p[0] <= (i + d) && (p[index] + p[index + 3]) >= i
        })
        if (!otherPoints1.length) {
          continue
        }
        // console.log(otherPoints1.length)
        for (let j = min2; j < max2; j += d) {
          const otherPoints2 = otherPoints1.filter((p) => {
            return p[oI1] <= (j + d) && (p[oI1] + p[oI1 + 3]) >= j
          })
          if (!otherPoints2.length) {
            continue;
          }
          // console.log(otherPoints2.length)
          const minIndexes = getMin(otherPoints2.map((i) => i[oI2]), true)
          const maxIndexes = getMax(otherPoints2.map((i) => i[oI2] + i[oI2 + 3]), true)
          wirePoints.push(...[...minIndexes, ...maxIndexes].map((index) => otherPoints2[index]))
          // wirePoints.push(otherPoints2[minIndex], otherPoints2[maxIndex])
        }
        for (let j = min3; j < max3; j += d) {
          const otherPoints2 = otherPoints1.filter((p) => {
            return p[oI2] <= (j + d) && (p[oI2] + p[oI2 + 3]) >= j
          })
          if (!otherPoints2.length) {
            continue;
          }
          const minIndexes = getMin(otherPoints2.map((i) => i[oI1]), true)
          const maxIndexes = getMax(otherPoints2.map((i) => i[oI1] + i[oI1 + 3]), true)
          wirePoints.push(...[...minIndexes, ...maxIndexes].map((index) => otherPoints2[index]))
          // wirePoints.push(otherPoints2[minIndex], otherPoints2[maxIndex])
        }
      }
      return wirePoints
    }

    // 组合方法 0-x 1-y 2-z
    function componentsFun(index, oI1, oI2, points) {
      let objC = {}
      // 根据x,y,xW,yW,Li组合 z方向合并
      for (let i = 0;i < points.length;i++) {
        let key = `${points[i][oI1]},${points[i][oI2]},${points[i][oI1 + 3]},${points[i][oI2 + 3]},${points[i][6]}`
        if (!objC[key]) {
          objC[key] = [points[i]]
        } else {
          objC[key].push(points[i])
        }
      }
      const keys = Object.keys(objC);
      const componentsPoints = [];
      for (let i = 0;i < keys.length;i++) {
        const group = objC[keys[i]]
        if (group.length === 1) {
          componentsPoints.push(...group)
        } else {
          group.sort((a, b) => a[index] - b[index])
          let currentGroup = []
          for(let j = 0;j < group.length;j++) {
            const pre = group[j]
            const next = group[j + 1]
            currentGroup.push(pre)
            if (!next || pre[index] + pre[index + 3] !== next[index]) {
              // 没有存储情况下
              if (currentGroup.length === 1) {
                componentsPoints.push(pre)
              } else {
                const nexBox = currentGroup[currentGroup.length - 1]
                nexBox[index + 3] = nexBox[index] - currentGroup[0][index] + nexBox[index + 3]
                nexBox[index] = currentGroup[0][index]
                componentsPoints.push(nexBox)
              }
              currentGroup = []
            }
          }
        }
      }
      return componentsPoints;
    }
  }
});
