const fs = require('fs')
var data = ''
// 创建可读流
var readerStream = fs.createReadStream('./流/input.txt')

// 设置编码为 utf8。
readerStream.setEncoding('UTF8')

// 处理流事件 --> data, end, and error
readerStream.on('data', (chunk) => {
   data += chunk
})

readerStream.on('end', () => {
   console.log(data)
})

readerStream.on('error', (err) => {
   console.log(err.stack)
})

console.log("程序执行完毕")