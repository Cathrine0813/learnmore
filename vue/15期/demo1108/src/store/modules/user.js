// 管理用户的令牌token和角色role
const state = {
    token: localStorage.getItem("token"),
    // 其他用户信息，是数组，因为一个人有可能有多个角色
    roles: []
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
};

const actions = {
    // 模拟用户登录接口
    login({ commit }, userInfo) {
        const { username } = userInfo;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" || username === "jerry") {
                    commit("SET_TOKEN", username);
                    localStorage.setItem("token", username);
                    resolve();
                } else {
                    reject("用户名、密码错误");
                }
            }, 1000);
        });
    },
    getInfo({commit, state}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = state.token === 'admin' ? ['admin'] : ['editor']
                commit('SET_ROLES', roles)
                resolve(roles)
            }, 1000);
        })
    }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
