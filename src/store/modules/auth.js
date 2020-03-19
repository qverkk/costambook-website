import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
// import {
//     USER_REQUEST
// } from "../actions/user";
import axios from "axios";

const state = {
    token: localStorage.getItem("user-token") || "",
    userId: localStorage.getItem("userId") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId
};

const actions = {
    [AUTH_REQUEST]: ({
        commit
    }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios({
                    url: 'http://localhost:8090/user/login',
                    method: 'POST',
                    data: user,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((resp) => {
                    const userId = resp.data.userId
                    const token = resp.data.token
                    if (token) {
                        localStorage.setItem("userId", userId)
                        localStorage.setItem("user-token", token)
                        commit(AUTH_SUCCESS, {
                            token: token,
                            userId: userId
                        })
                    } else {
                        commit(AUTH_ERROR);
                    }
                    resolve(resp)
                })
                .catch((err) => {
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem("userId")
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        });
    },
    [AUTH_LOGOUT]: ({
        commit
    }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("userId")
            localStorage.removeItem("user-token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp.token;
        state.userId = resp.userId;
        state.hasLoadedOnce = true;
        axios.defaults.headers.common['Authorization'] = resp.token;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
        state.userId = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};