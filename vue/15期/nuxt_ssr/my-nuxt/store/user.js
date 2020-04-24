// 访问的模块名是什么，文件名就是什么
// 具名导出
export const state = () => ({ //这里的state是函数
    token: ''
});
export const mutations = {
    init(state, token) {
        state.token = token;
    }
};
export const getters = {
    isLogin(state) {
        return !!state.token;
    }
};
export const actions = {
    login({ commit, getters }, u) {
        // 这里的this指的是nuxt上下文

        // this.$axios由@nuxt/axios模块提供
        // return this.$axios.$post("/api/login", u).then(({ token }) => {
        //     if (token) {
        //         commit("init", token); //登录成功，提交令牌的设置
        //     }
        //     return getters.isLogin;
        // });

        // 使用插件注入的login接口，自定义属性的调用前面有$，定义的时候没有
        return this.$login(u).then(({ token }) => {
            if (token) {
                commit("init", token); //登录成功，提交令牌的设置
            }
            return getters.isLogin;
        });
    }
};
