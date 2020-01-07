module.exports = {
    get body() {
        return this._body //因为_body是自创的
    },
    set body(val) {
        this._body = val
    }
}