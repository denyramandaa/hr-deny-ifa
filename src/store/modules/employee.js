import axios from 'axios'

const state = {
  employee: [],
  employeeStatus: [],
  roleJob: [],
}

const getters = {
  employee(state){
    return state.employee
  },
  roleJob(state){
    return state.roleJob
  },
  employeeStatus(state){
    return state.employeeStatus
  },
}

const actions = {
  async fetchEmployees({commit}) {
    let data = await axios.get('http://localhost:3000/data_employee');
    commit('fetchEmployeess', data.data)
  },
  async fetchRoleJob({commit}) {
    let data = await axios.get('http://localhost:3000/role_job');
    commit('fetchRoleJob', data.data)
  },
  async fetchEmployeeStatus({commit}) {
    let data = await axios.get('http://localhost:3000/status_employee');
    commit('fetchEmployeeStatus', data.data)
  },
  addEmployee({}, payload){
    axios.post('http://localhost:3000/data_employee', payload);
  },
  deleteEmployee({}, payload){
    axios.delete('http://localhost:3000/data_employee/'+payload);
  },
  editedEmployee({}, payload){
    axios.put('http://localhost:3000/data_employee/'+payload.id, payload);
  },
}

const mutations = {
  fetchEmployeess(state, payload){
    state.employee = payload;
  },
  fetchRoleJob(state, payload){
    state.roleJob = payload;
  },
  fetchEmployeeStatus(state, payload){
    state.employeeStatus = payload;
  },
  addEmployee(state, payload){
    state.employee.push(payload);
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}