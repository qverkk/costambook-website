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
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({
        commit,
        // dispatch
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
                    const token = resp.data.token
                    if (token) {
                        localStorage.setItem("user-token", token) // store the token in localstorage
                        commit(AUTH_SUCCESS, token)
                    } else {
                        commit(AUTH_ERROR);
                    }
                    // you have your token, now log in your user :)
                    // dispatch(USER_REQUEST)
                    resolve(resp)
                })
                .catch((err) => {
                    console.log("remove token");
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                    reject(err)
                })
        });
    },
    [AUTH_LOGOUT]: ({
        commit
    }) => {
        return new Promise(resolve => {
            console.log("remove token");
            commit(AUTH_LOGOUT);
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
        state.token = resp;
        state.hasLoadedOnce = true;
        axios.defaults.headers.common['Authorization'] = resp;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};