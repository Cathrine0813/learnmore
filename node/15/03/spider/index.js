// 电影天堂的定向爬取（一个开始的数字到一个结束的数字，循环累加）

// 对原生http这个包的封装
const originRequest = require('request') 

//使用这个库是因为电影天堂的编码是gb2312,爬虫之后能难在js处理，因为js使用的是utf-8的语言环境，遇到中文就要进行处理
const iconv = require('iconv-lite') // iconv-lite通过纯js方式实现的

// 对取到的html页面进行处理,例如提取一些字段
const cheerio = require('cheerio') // cheerio后端的jQuery，使用jq的语法


// 对originRequest封装一个新的函数方便使用
function requset(url, callback) {
    const option = {
        encoding: null // 不要求编码类型
    }

    originRequest(url, option, callback)
}

for (let i = 100553; i < 100564; i++){
    const url = `https://www.dy2018.com/i/${i}.html`
    
    // 请求  err在第一位，是node.js的标准
    requset(url, function (err, res, body) {
        // console.log('body:', body) //buffer
        const html = iconv.decode(body, 'gb2312')
        // console.log('html:', html) //转了之后是正常的显示

        // 引用了jquery
        const $ = cheerio.load(html)
        console.log($('.title_all h1').text())
        // 用jq的形式将所需内容获取
    })
}