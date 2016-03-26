const http = require('http')
const querystring = require('querystring')
const util = require('util')

const onRequest = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})

    var post = ''    //定义了一个post变量，用于暂存请求体的信息

    req.on('data', (chunk) => {    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk
    })

    req.on('end', () => {    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post)
        res.write(util.inspect(post))
        res.end()
    })
}

http.createServer(onRequest).listen(8081)
console.log('Server Start!')