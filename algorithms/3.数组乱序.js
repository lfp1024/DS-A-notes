
// 将一个数组打乱

/**
fisher-yates 算法
将数组从后向前遍历，然后将当前元素与随机位置的元素进行交换
只需要通过一次遍历即可将数组随机打乱顺序
步骤：
    1. 选取数组(长度n)中最后一个元素(arr[length-1])，将其与n个元素中的任意一个交换，此时最后一个元素已经确定
    2. 选取倒数第二个元素(arr[length-2])，将其与n-1个元素中的任意一个交换
    3. 重复第 1 2 步，直到剩下1个元素为止

时间复杂度 O(n)
*/

const arr = [1, 2, 3, 4]
const arr2 = [1, 2, 3, 4]

function outOfOrder2(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)) // 要去到最后一个元素
        console.log(`index is ${randomIndex}`); // 下一行是 [ 开头，这里需要分号
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    }
    return arr
}


function outOfOrder(arr) {
    let m = arr.length - 1;
    while (m > 0) {
        // 向下取整，最后一个随机数一定是0
        // 需要包含最后一个元素：上面的m本身已经减1，再向下取整，就无法得到最后一个元素的下标，因此这里要加1
        const randomIndex = Math.floor(Math.random() * (m + 1));
        console.log(`index is ${randomIndex}`);
        // 随机位置的元素arr[index] 跟 当前元素arr[m] 交换
        [arr[m], arr[randomIndex]] = [arr[randomIndex], arr[m]]
        // const tmp = arr[m];
        // arr[m] = arr[index];
        // arr[index] = tmp;
        m--;
    }
    return arr;
}

// const res = outOfOrder(arr)
// console.log('res:', res.toString())
const res2 = outOfOrder2(arr2)
console.log('res2:', res2.toString())


/**
 * 从原始数组中随机抽取一个新的元素到新数组中
 * 步骤
 * 1. 从还没处理的数组（假如还剩n个）中，产生一个[0, n]之间的随机数 random
 * 2. 从剩下的n个元素中把第 random 个元素取出到新数组中
 * 3. 删除原数组第random个元素
 * 4. 重复第 2 3 步直到所有元素取完
 */
const newArr = [];
const len = arr.length;
for (let j = 0; j < len; j++) {
    const start = Math.floor(Math.random() * arr.length) // 这里要动态获取删除元素之后的数组长度，否则会出现 undefined
    console.log('start:', start)
    newArr.push(arr.splice(start, 1)[0]); // 如果每次start都是0，则两个数组相同
}
console.log(newArr);