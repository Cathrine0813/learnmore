class EventEmitter {
    constructor() {
        this.handler = {}

    }
    on(eventName, callback) {
        if (!this.handles) {
            this.handles = {}
        }
        if (!this.handles[eventName]) {
            this.handles[eventName] = []
        }
        this.handles[eventName].push(callback)
    }
    emit(eventName, ...arg) {
        if (this.handles[eventName]) {
            for (var i = 0; i < this.handles[eventName].length; i++){
                thid.handles[eventName][i](...arg)
            }
        }
    }
}