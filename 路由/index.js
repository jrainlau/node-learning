const server = require('./server.js')
const router = require('./router.js')

server.start(router.route)