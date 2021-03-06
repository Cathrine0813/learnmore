export default {
    namesapced: true, //独立模块需要添加namesapced: true，防止命名空间冲突
    state: { count: 0 },
    mutations: {
      increment(state) {
        state.count += 1;
      },
    },
    getters: {
      left(state) {
        // 计算剩余数量
        return 10 - state.count;
      },
    },
    actions: {
      asyncIncrement({ getters, commit }) {
        // 异步逻辑返回Promise
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // 添加业务逻辑
            if (getters.left > 0) {
              commit("increment");
              resolve();
              return;
            }
            reject();
          }, 1000);
        });
      },
    },
  };
