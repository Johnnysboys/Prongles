import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../vendor/feathersjs';
import authentication from './auth';
const { service, auth } = feathersVuex(feathersClient);

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    service('users'),
    auth({
      state: {
        publicPages: ['login', 'signup']
      },
      userService: 'users'
    })
  ],
  modules: {
    // organization
    authentication
  }
});

export default store;
