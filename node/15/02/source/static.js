// static.js 

const fs = require("fs");
const path = require("path");

// 目前实现的功能：1、根据不同的url将页面导出来；2、输入的是文件夹的路径的话就显示文件夹里面文件的名字列表
module.exports = (dirPath = "./public") => {
    return async (ctx, next) => {
        // 访问public路径，根据默认的規則，所有静态的文件都会放在public文件夹里面
        if (ctx.url.indexOf("/public") === 0) {
            // public开头 读取文件 
            const url = path.resolve(__dirname, dirPath);
            const fileBaseName = path.basename(url);
            const filepath = url + ctx.url.replace("/public", "");
            console.log(filepath);
            // console.log(ctx.url,url, filepath, fileBaseName) 

            try {
                stats = fs.statSync(filepath); //返回对应路径的状态
                //isDirectory()会返回一个布尔值变量isDirection，返回是一个目录（true）还是一个文件（false）
                if (stats.isDirectory()) { 
                    const dir = fs.readdirSync(filepath);//读取文件夹
                    const ret = ['<div style="padding-left:20px">'];

                    dir.forEach(filename => {
                        console.log(filename);
                        // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync ，递归一下
                        if (filename.indexOf(".") > -1) {
                            ret.push(`<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`);
                        } else {
                            // 文件 
                            ret.push(`<p><a href="${ctx.url}/${filename}">${filename}</a></p>`);
                        }
                    });
                    ret.push("</div>");
                    ctx.body = ret.join("");
                    
                } else {
                    // false是文件
                    console.log("文件");
                    const content = fs.readFileSync(filepath);//把文件内容读出来
                    ctx.body = content; //之后放到body中显示
                }
            } catch (e) {
                // 报错了 文件不存在 
                ctx.body = "404, not found";
            }

        } else { // 否则不是静态资源，直接去下一个中间件 
            await next();
        }
    };
};