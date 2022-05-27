## 实现步骤
1. 先取3dTiles.json文件，过滤转换成点位信息
```js
// 下载方法
function generateJson(name, mockJson) {
  let link = document.createElement('a')
  link.download = `${name}.json`
  link.href = 'data:text/plain,' + JSON.stringify(mockJson)
  link.click()
}

/**
 * 分块操作
*/

// 在chrome控制台操作
const children = []; // 将3dTiles-children赋值
// 进行坐标转换
children.map((i) => {
  const sphere = i.boundingVolume.sphere
  const cartesian3 = new Cesium.Cartesian3(sphere[0], sphere[1], sphere[2])
  return toLngLat(cartesian3, viewer)
})

//  下载至高德显示并划分成块展示得到 GD-XXX.json
const gdJson = []; // 将GD-XXX.json数据赋值
// 获取sphere
gdJson.map((i) => {
  const cartesian3 =   Cesium.Cartesian3.fromDegrees(...i.center)
  return {
      ...i,
      sphere: [
        cartesian3.x,
        cartesian3.y,
        cartesian3.z,
        i.geometricError,
      ]
  }
})

// 获取到分块json(index包含各个children子集)
// 利用script进行赋值对应的index，并且生成part
// 将part存入3dTiles服务器同目录
// 完成分块操作 finish！！！


/**
 * 分级操作
*/
// 利用 expect 处理输入密码操作
// 1. 下拉 2. 修改 3. 上传 scp.js

```