import {AUTH, CHECK_AUTH, LOG_OUT} from './../actions/auth'
import HTTP from './../http.js'

const http = new HTTP(process.env.VUE_APP_API_URL);

const state = {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('id')
};

const mutations = {

    setUserId: (state, payload) => {
        state.userId = payload;
        localStorage.setItem('id', payload);
    },

    setToken: (state, payload) => {
        state.token = payload;
        localStorage.setItem('token', payload);
    },

    removeToken: (state) => {
        state.token = "";
        localStorage.removeItem('token');
    },

    removeUserId: (state) => {
        state.userId = "";
        localStorage.removeItem('id');
    }

};

const getters = {

    getUserId: (state) => {
        return state.userId;
    }, 

    getToken: (state) => {
        return state.token;
    },

    isAuth: (state) => {
        return !!state.token;
    }

};

const actions = {

    [AUTH]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.request().post('auth/login', data)
                .then(response => {
                    commit("setToken", response.data.response.token);
                    commit("setUserId", response.data.response.userId);
                    resolve(response);
                }).catch(errors => {
                    reject(errors);
                })
        });
    },

    [CHECK_AUTH]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.requestToken(data.token).post('auth/isauth', data.params)
                .then(response => {
                    resolve(response);
                }).catch(errors => {
                    commit("removeToken");
                    commit("removeUserId");
                    reject(errors);
                })
        });
    },

    [LOG_OUT]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.requestToken(data.token).post('auth/logout', data.params)
                .then(response => {
                    commit("removeToken");
                    commit("removeUserId");
                    resolve(response);
                }).catch(errors => {
                    reject(errors);
                })
        });
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}