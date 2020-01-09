const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const {
        method,
        url
    } = req;
    console.log('url:' + url)
    console.log('method:' + method)

    if (method == "GET" && url == "/") {
        // 返回一个页面
        fs.readFile("./index.html", (err, data) => {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        });

    } else if (method == "GET" && url == "/api/users") {
        // 允许访问的源
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

        // 返回一个接口 
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify([{
            name: "tom",
            age: 20
        }]));
    } else if (method == "OPTIONS" && url == "/api/users") {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "X-Token,Content-Type",
            "Access-Control-Allow-Methods": "PUT"
        });
        res.end();
    }
}).listen(4000, () => {
    console.log('api listen at 4000')
});