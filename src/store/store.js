import Vue from 'vue';
import Vuex from 'vuex';
import "regenerator-runtime/runtime.js"

import applicant from './modules/applicant'
import attendance from './modules/attendance'
import employee from './modules/employee'
import event from './modules/event'
import leaveRequest from './modules/leaveRequest'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    applicant,
    attendance,
    employee,
    event,
    leaveRequest
  }
});
