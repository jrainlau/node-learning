const fs = require('fs')
var data = '今天天气有点6'

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('./流/output.txt')

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8')

// 标记文件末尾
writerStream.end()

// 处理流事件 --> data, end, and error
writerStream.on('data', () => {
    console.log('写入中...')
})

writerStream.on('finish', () => {
    console.log("写入完成。")
})

writerStream.on('error', (err) => {
   console.log(err.stack)
})

console.log("程序执行完毕")
