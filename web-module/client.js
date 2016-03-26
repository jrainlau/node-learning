const http = require('http')

// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8082',
   path: '/web-module/index.html'  
}

// 处理响应的回调函数
var callback = (response) => {
   // 不断更新数据
   var body = ''
   response.on('data', (data) => {
      body += data
   })
   
   response.on('end', () => {
      // 数据接收完成
      console.log(body)
   })
}
// 向服务端发送请求
var req = http.request(options, callback)
req.end()