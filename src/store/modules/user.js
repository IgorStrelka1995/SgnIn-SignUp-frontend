import {GET_USER, CREATE_USER, UPLOAD_IMAGE} from './../actions/user'
import HTTP from './../http.js'

const http = new HTTP(process.env.VUE_APP_API_URL);

const state = {
    user: [],
    answer: ""
};

const mutations = {

    setUserData: (state, payload) => {
        state.user = payload;
    },

    setAnswer: (state, payload) => {
        state.answer = payload;
    }

};

const getters = {

    getUserData: (state) => {
        return state.user.shift();
    }

};

const actions = {

    [GET_USER]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.requestToken(data.token).get('user/user/' + data.params)
                .then(response => {
                    commit("setUserData", response.data.response);
                    resolve(response);
                }).catch(errors => {
                    reject(errors);
                })
        });
    }, 

    [CREATE_USER]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.request().post("user/create", data)
                .then(response => {
                    commit("setUserId", response.data.response.userId);
                    commit("setToken", response.data.response.token);
                    resolve(response);
                }).catch(errors => {
                    reject(errors);
                })
        });
    },

    [UPLOAD_IMAGE]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            http.request().post("user/upload", data)
                .then(response => {
                    commit("setAnswer", response.data.response.res);
                    resolve(response);
                }).catch(errors => {
                    reject(errors);
                })
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
