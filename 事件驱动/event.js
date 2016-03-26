const events = require('events')
const eventEmitter = new events.EventEmitter()

// 为事件绑定触发方式
// eventEmitter.on('eventName', eventHandler)
// 触发事件
// eventEmitter.emit('eventName')
// 移除事件监听
// eventEmitter.removeListener('eventName', eventHandler)

const connectHandler1 = () => {
    console.log('1号连接成功！')
    eventEmitter.emit('data_received')
}

const connectHandler2 = () => {
    console.log('2号连接成功！')
}

eventEmitter.on('data_received', () => {
   console.log('数据接收成功！')
})

eventEmitter.on('connection', connectHandler1)
eventEmitter.on('connection', connectHandler2)

eventEmitter.emit('connection')

eventEmitter.removeListener('connection', connectHandler1)
console.log('connectHandler1 不再受监听')
eventEmitter.emit('connection')

console.log("程序执行完毕。")

// eventEmitter.on('error')