interface TrieNodeAttributes {
    data: string;
    children: TrieNodeAttributes[];
    isEndingChar: boolean;
}

class TrieNode implements TrieNodeAttributes {
    public data: string
    public children: TrieNodeAttributes[]
    public isEndingChar

    constructor(data: string) {
        this.data = data
        this.isEndingChar = false
        this.children = new Array<TrieNodeAttributes>(26) // 英文26个字母，每个节点存储一个长度为26的数组
    }
}

class Tire {

    private root: TrieNode

    constructor() {
        this.root = new TrieNode('/')
    }

    public insert(str: string) { // 单个字符串插入
        const chars = str.split('')
        let p = this.root;
        for (let i = 0; i < chars.length; i++) {
            const index = chars[i].charCodeAt(0) - 'a'.charCodeAt(0);
            if (p.children[index] === undefined) {
                p.children[index] = new TrieNode(chars[i]); // 不存在，添加
            }
            // 存在，下一个字符
            p = p.children[index]
        }
        p.isEndingChar = true // 标记字符串结束位置
    }

    public find(str: string): boolean { // 查找是否有某个字符串
        const chars = str.split('')
        console.log('str = ', chars)
        let p = this.root;
        for (let i = 0; i < chars.length; i++) {
            const index = chars[i].charCodeAt(0) - 'a'.charCodeAt(0)
            if (p.children[index] === undefined) {
                return false
            }
            p = p.children[index]
        }
        return p.isEndingChar ? true : false
    }

    public filter(str: string): string {
        let chars = str.replace(/\s/g, '').split('')
        let startIdx = 0;
        for (; startIdx < chars.length;) {
            let p = this.root;
            for (let i = startIdx; i < chars.length; i++) {
                const index = chars[i].charCodeAt(0) - 'a'.charCodeAt(0)
                if (p.children[index] === undefined) {
                    startIdx += 1
                    break
                }// 从下一个字符开始匹配
                p = p.children[index]
                if (p.isEndingChar) {
                    for (let j = startIdx; j <= i; j++) { chars[j] = '*' }
                    startIdx = i + 1
                    break
                }
            }
        }
        return chars.join('')
    }

}

const trie = new Tire();

['hello', 'her', 'hi', 'how', 'so', 'see'].forEach(e => trie.insert(e));
console.log('========================================');
// console.log(`hi is = ${trie.find('hi')}`);
// console.log(`his is = ${trie.find('his')}`);
// console.log('result = ', trie.find('so'));

const str = 'i am so happy to see you'
console.log(trie.filter(str));