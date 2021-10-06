import Vue from "vue";

const initialState = {
  loading: false,
  username: "",
  token: "",
  userid: "",
  authCode: ""
};

const parseJWT = function(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const state = Object.assign({}, initialState);
let tokenRefid = "";

export default {
  namespaced: true,
  initialState,
  state,
  parseJWT,
  tokenRefid,
  mutations: {
    setToken(state, userdata) {
      state.token = userdata.token;
      state.refToken = userdata.refToken;
      state.username = userdata.preferred_username;
      state.userid = userdata.sub;
    },
    storeAuthCode(state, code) {
      state.authCode = code;
    }
  },

  actions: {
    storeAuthCode: function({ commit }, code) {
      commit("storeAuthCode", code);
    },
    gainToken: function({ commit, dispatch }, payload) {
      let authUrl = `${process.env.KEYCLOAK_SEVER}/realms/Abacus-Test/protocol/openid-connect/token`;
      let authPayload =
        "code=" +
        state.authCode +
        `&client_id=${process.env.CLIENT_ID}` +
        `&client_secret=${process.env.CLIENT_SECRET}` +
        "&redirect_uri=" +
        encodeURIComponent(`${process.env.REDIRECT_URI}`);
      Object.keys(payload).forEach(key => {
        authPayload += "&" + key + "=" + payload[key];
      });
      let authHeaders = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      return new Promise((resolve, reject) => {
        Vue.http.post(authUrl, authPayload, authHeaders).then(
          response => {
            commit(
              "setToken",
              Object.assign(parseJWT(response.body.access_token), {
                refToken: response.body.refresh_token,
                token: response.body.access_token
              })
            );
            dispatch("refreshToken");
            resolve();
          },
          error => {
            console.error("User :: gainToken: ", error);
            reject({ status: error.status, error: error });
          }
        );
      });
    },
    refreshToken: function({ dispatch }) {
      clearTimeout(tokenRefid);
      tokenRefid = setTimeout(() => {
        dispatch("gainToken", {
          grant_type: "refresh_token",
          refresh_token: state.refToken
        });
      }, 240000); // 4 мин
    },
    submitCredentials({ commit }, prompt) {
      let url =
        `${process.env.KEYCLOAK_SEVER}/realms/Abacus-Test/protocol/openid-connect/auth?&client_id=${process.env.CLIENT_ID}&redirect_uri=` +
        encodeURIComponent(process.env.REDIRECT_URI) +
        "&scope=openid&response_type=code" +
        prompt;
      location.replace(url);
    },
    logout({ commit }) {
      commit("resetStore", null, { root: true });
      location.replace(
        `${process.env.KEYCLOAK_SEVER}/realms/Abacus-Test/protocol/openid-connect/logout?redirect_uri=${process.env.REDIRECT_URI}`
      );
    }
  }
};
