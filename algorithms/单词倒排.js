
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  let regx = /[a-zA-Z]+/g;
  let str = line.match(regx).reverse().join(' ');
  console.log(str);
});