'use strict'
const eventproxy = require('eventproxy')
const superagent = require('superagent')
const cheerio = require('cheerio')

var theUrl = 'http://www.63vi.com/html/part/16.html'

const getMovie = (link) => {
  let promise =  new Promise( (resolve, reject) => {
    superagent.get(link)
      .end((err, res) => {
        if (err) return console.log(err)
        let urlList = []
        let $ = cheerio.load(res.text)
        $('.listtitletxt').each((index, item) => {
          let _item = $(item).find('a').eq(1)
          urlList.push('http://www.63vi.com' + _item.attr('href'))
        })
        resolve(urlList)
      })
  })
  return promise
}

getMovie(theUrl)
  .then( (urlList) => {
    const ep = new eventproxy()
    // 每当请求成功，就会触发一次'requestLink'事件
    urlList.forEach( (item) => {
      superagent.get(item)
        .end( (err, res) => {
          if (err) return console.log(err)
          ep.emit('requestLink', res.text)
        })
    })
    // 当'requestLink'事件触发次数达到要求后，重新组合数组
    ep.after('requestLink', urlList.length, (list) => {
      let movieList = list.map( (item) => {
        let $ = cheerio.load(item)
        let picList = []
        $('.n_bd img').each((index, item) => {
          picList[index] = $(item).attr('src')
        })
        return picList
      })
      console.log(movieList.length)
      console.log('获取所有资源完毕')
    })
  })