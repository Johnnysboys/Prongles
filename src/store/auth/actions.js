/*
export const someAction = (state) => {
}
*/
import axios from 'axios';
import { LocalStorage } from 'quasar';
const instance = axios.create({
  baseURL: 'http://localhost:3030'
});
export const login = ({ commit }, payload) => {
  commit('SET_LOGIN_PENDING');
  instance
    .post('/authentication', payload)
    .then(res => {
      commit('UNSET_LOGIN_PENDING');
      commit('SET_TOKEN', res.data.accessToken);
      LocalStorage.set('jwt', res.data.accessToken);
    })
    .catch(err => {
      commit('UNSET_LOGIN_PENDING');
      commit('SET_LOGIN_ERROR', err.message);
    });
};
