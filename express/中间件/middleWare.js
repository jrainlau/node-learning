const express = require('express')
const app = express()

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
// 通过next('route')跳到下一个路由
app.get('/user/:id', (req, res, next) => {
  if (req.params.id == 0) {
      next('route')
  } else {
    next()
}
}, (req, res, next) => {
  res.send('User Id: ' + req.params.id)
})
// 当id == 0时由该路由进行处理
app.get('/user/:id', (req, res, next) => {
  res.send('special');
})

var server = app.listen(8082, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})