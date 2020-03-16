import {
    USER_REQUEST,
    USER_ERROR,
    USER_SUCCESS
} from "../actions/user";
import Vue from "vue";
import {
    AUTH_LOGOUT,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from "../actions/auth";
import axios from "axios";

const state = {
    status: "",
    profile: {}
};

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [USER_REQUEST]: ({
        commit,
        dispatch
    }, user) => {
        commit(USER_REQUEST);
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            axios({
                    url: 'http://localhost:8090/user/login',
                    data: user,
                    method: 'POST'
                })
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('user-token', token) // store the token in localstorage
                    commit(AUTH_SUCCESS, token)
                    // you have your token, now log in your user :)
                    dispatch(USER_REQUEST)
                    resolve(resp)
                })
                .catch(err => {
                    console.log("remove token");
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                    reject(err)
                })
        })
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};