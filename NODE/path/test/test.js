var path = require('path');

// 可通过path.resolve('./')来转换为绝对路径
console.log("path.resolve('./') = %s", path.resolve('./'));
console.log(". = %s", path.resolve("../"));

console.log("process.cwd() = %s", process.cwd());
console.log("__dirname = %s", __dirname);
console.log("__filename = %s", __filename);

// 只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：
// 当前目录下
path.dirname(__filename) + '/test.js';
// 相邻目录下
path.resolve(__dirname, '../outtest.js');