const express = require('express')
const app = express()
const router = require('./router')
// app.route('/book')
//   .get((req, res) => {
//     res.send('Get a random book');
//   })
//   .post((req, res) => {
//     res.send('Add a book');
//   })
//   .put((req, res) => {
//     res.send('Update the book');
//   });

app.use('/', router)

const server = app.listen(8082, () => {
  'use strict'
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})