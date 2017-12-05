/**
 * Created by  blue dong on 2017/12/6.
 */
'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import * as getters from './getters';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_DEV !== 'production';
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: debug ? [createLogger()] : [],
  strict: debug
});
