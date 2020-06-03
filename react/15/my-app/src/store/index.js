import { createStore } from "redux";

// 定义state初始化和修改规则 reducer是纯函数
function counterReducer(state = 0, action) { // 接收的state和action，action是一个对象
    // console.log('state :>> ', state);
    // 返回一个新的state
    switch (action.type) {
        case 'ADD':
            return state + 1
        case 'MINUS':
            return state + 1
        default:
            return state
    }
}
const store = createStore(counterReducer);

export default store;