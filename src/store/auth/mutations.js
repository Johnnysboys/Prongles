/*
export const someMutation = (state) => {
}
*/
export const SET_TOKEN = (state, payload) => (state.token = payload);
export const UNSET_TOKEN = state => (state.token = null);
export const SET_LOGIN_PENDING = state => (state.loginPending = true);
export const UNSET_LOGIN_PENDING = state => (state.loginPending = false);
export const SET_LOGIN_ERROR = (state, payload) => (state.loginError = payload);
export const UNSET_LOGIN_ERROR = state => (state.loginError = null);
