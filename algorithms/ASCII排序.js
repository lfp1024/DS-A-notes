

let arr = []

const line = 'Ihave1nose2hands10fingers'

line.split('').forEach(char => {
  const val = char.charCodeAt()
  console.log('char = ', char, 'val = ', val, arr[0])
  if (!arr[0]) {
    arr[0] = { k: char, v: val }
  } else {
    insertVal(val, char)
  }
})

console.log(arr)
let ret = ''
arr.forEach(ele => (ret += ele.k))
console.log(ret)


function insertVal(val, e) {
  let i = arr.length - 1
  const ele = { k: e, v: val }

  while (i >= 0 && arr[i].v > val) {
    i--
  }
  if (i < 0) {
    arr.splice(0, 0, ele) // 插在第一位
  } else {
    arr.splice(i + 1, 0, ele) // 插在当前位置后面
  }
  console.log(arr)
}


// sort 默认按照 ASCII 排序
// const sortedLine = line.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt()).join('')
// console.log('sortedLine: ', sortedLine);