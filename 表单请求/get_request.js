const http = require('http')
const url = require('url')
const util = require('util')

const onRequest = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write(util.inspect(url.parse(req.url, true)))
    res.end()
}

http.createServer(onRequest).listen(8080)
console.log('Server Start!')