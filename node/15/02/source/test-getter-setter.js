// 实现api的封装，api数量是有限的，通过静态的方式实现getter和setter，通过二次封装提取出更优雅的api

// es5 get set 特性
const kaikeba = {   //context
    info: {         //req原始
        name :'开课吧'
    },

    get name(){
        return this.info.name
    },

    set name(val) {
        console.log('set:', val)
        this.info.name = val
    }
}

console.log('getter:',kaikeba.name)

kaikeba.name = 'kaikeba'

console.log('setter:',kaikeba.name)
