const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const {
        method,
        url
    } = req;
    console.log('url:' + url)
    console.log('method:' + method)

    console.log('cookie:' + req.headers.cookie)

    if (method == "GET" && url == "/") {
        // 返回一个页面
        fs.readFile("./index.html", (err, data) => {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        });

    } else if (method == "GET" && url == "/api/users") {
        // 设置cookie，鉴权，设置cookie到浏览器内部，当发生同域请求时会将cookie带到request里面
        res.setHeader('Set-Cookie','cookie1=ceshihhhh')
        // res.setHeader('Access-Control-Allow-Credentials','true') //确认接受cookie

        // // 允许访问的源
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

        // // 返回一个接口 
        // res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify([{
            name: "tom",
            age: 20
        }]));
    } else if (method == "OPTIONS" && url == "/api/users") {
        // res.setHeader('Access-Control-Allow-Credentials','true')
        // res.writeHead(200, {
        //     "Access-Control-Allow-Origin": "http://localhost:3000", //允许localhost:3000
        //     "Access-Control-Allow-Headers": "X-Token,Content-Type", //允许X-Token
        //     "Access-Control-Allow-Methods": "PUT"
        // });
        // res.end();
    } else if (method === "POST" && url == "/api/save") {
        // post请求接收body信息，body在request中，而且是个流
        let reqData = [] // 流的数组
        let size = 0

        // 接收的body
        req.on('data', data => {
            // data是一个二进制的buffer
            console.log('>>req on', data) 
            reqData.push(data)
            size += data.length //记住多大 
        })

        // 接收完
        req.on('end', function () { 
            console.log('end')
            const data = Buffer.concat(reqData, size) //把所有buffer连接在一起，并且传入size
            console.log('data', size, data.toString()) //data.toString()实际上就是一个query string字符串

            // 可以解析完返回页面
            res.end(`formdata:${data.toString()}`)
        })
    }
}).listen(4000, () => {
    console.log('api listen at 4000')
});