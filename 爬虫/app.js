'use strict'
const eventproxy = require('eventproxy')
const superagent = require('superagent')
const cheerio = require('cheerio')

var theUrl = 'http://vod.cnzol.com/html/dongzuo/'

const getMovie = (link) => {
  let promise =  new Promise( (resolve, reject) => {
    superagent.get(link)
      .end((err, res) => {
        if (err) return console.log(err)
        let urlList = []
        let $ = cheerio.load(res.text)
        // 取得首页所有电影的链接并放置在数组中
        $('#list dt a').each( (index, item) => {
          let _item = $(item)
          urlList.push(_item.attr('href'))
        })
        console.log('获取首页所有链接完毕')
        // 把数组传递给Promise的下一步
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
        return ({
          title: $('#show h3').text().trim(),
          link: $('#showinfo table').eq(1).find('a').eq(1).attr('href')
        })
      })
      console.log(movieList)
      console.log('获取所有资源完毕')
    })
  })