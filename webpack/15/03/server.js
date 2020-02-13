// 实现本地mock
const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name:'诗诗诗'
    })
})

app.listen('9092')