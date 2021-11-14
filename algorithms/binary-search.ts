/**
 * 二分查找
 * 前提条件：
 *  1. 元素必须有序排列
 *  2. 元素无重复
 * 过程：
 *  
* 时间复杂度：
 *  O(log n)
 */


function binarySearch(array: number[], target: number) {
    if (array.length === 0) return []
    const sortedArr = array.sort((a, b) => a - b)
    console.log('sortedArr: ', sortedArr);
    let start = 0
    let end = sortedArr.length - 1
    while (start <= end) {
        // let mid = Math.floor(end / 2) + start // asc
        let mid = (start + end) >> 1 // 取整
        const num = sortedArr[mid]
        if (num === target) return mid
        const isBigger = num > target
        end = isBigger ? mid - 1 : end
        start = isBigger ? start : mid + 1
        // if (num > target) {
        //     end = mid - 1
        // } else {
        //     start = mid + 1
        // }
    }
    return -1
}

const arr = [1, 3, 6, 7, 9, 11]
const target = 3
const index = binarySearch(arr, target)
console.log('index: ', index);
