const http = require("http")
const url = require("url")

const start = (route) => {
  const onRequest = (request, response) => {
    const pathname = url.parse(request.url).pathname;
    console.log("对 " + pathname + " 的请求已经接收到了。")

    route(pathname)

    response.writeHead(200, {"Content-Type": "text/plain"})
    response.write("Hello World")
    response.end()
  }

  http.createServer(onRequest).listen(8000)
  console.log("服务器开启！")
}

exports.start = start