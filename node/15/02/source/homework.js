/**
 * 作业：
 * 描述：假定/api/data/xxx下的所有数据查询实践较长，影响页面加载速度，
 *      且数据每日0点才会自动刷新，希望开发一个缓存功能
 * 要求：开发一个基于内存的缓存中间件
 */

class Homework {
    constructor(){
        this.time = ''
        this.today_data = {}
    }
    get(path,middleware) {
        this.timeFilter()
    }
    timeFilter() {
        let data = new Date()
        
        let time = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`

        if (this.time != time){
            this.today_data = {
                time:time
            }
            this.time = time
            console.log(111)
        }
        console.log(222,this.today_data,this.time)
    }
}


module.exports = Homework
