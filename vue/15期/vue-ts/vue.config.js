module.exports = {
    devServer: {
        before(app) {
            app.get('/api/list', (req, res) => {
                res.json([
                    { id: 1, name: '类型解析', version: '1.0' },
                    { id: 2, name: '编译型语言', version: '1.0' },
                ])
            })
        }
    }
}