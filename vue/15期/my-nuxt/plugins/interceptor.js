// 拦截器（也可以像之前那样自己写axios.request.interceptor）
// 添加请求拦截器附加token，【担忧：这里的$axios是不是唯一相同的实例】
export default function ({ $axios, store }) {
    // 为$axios实例添加一个请求事件监听
    // onRequest是@nuxtjs/axios模块提供的帮助方法，不是axios特有的
    $axios.onRequest(config => {
        // 每次请求前进来
        if (store.state.user.token) {
            config.headers.Authorization = "Bearer " + store.state.user.token;
        }
        return config;
    });
}
