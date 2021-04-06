function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 每次把最大值 置后
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

function insertSort(arr) {
  for (let i = 1;i < arr.length; i++) {
    // 抽下一张牌，和前边 有序牌组对比
    for (let select = i; select > 0; select--) {
      if (arr[select] < arr[select - 1]) {
        const temp = arr[select]
        arr[select] = arr[select - 1]
        arr[select - 1] = temp
      }
    }
  }
  return arr
}

function quickSort(arr) {
  if (arr.length <= 1) { return arr }

  const middleIndex = Math.floor(arr.length / 2)
  const middle = arr.splice(middleIndex, 1)[0]
  const left = []
  const right = []

  for (let i = 0;i < arr.length;i++) {
    if (arr[i] < middle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), middle, ...quickSort(right)]
}

const path = require('path')
console.log(path)