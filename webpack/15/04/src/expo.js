// 模拟js tree shaking使用
export const add = (a, b) => {
    return a + b;
};

export const minus = (a, b) => { //这个没有使用到
     return a - b;
}