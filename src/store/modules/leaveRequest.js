import axios from 'axios'

const state = {
  leaveReaquest: [],
}
const getters = {
  leaveReaquest(state){
    return state.leaveReaquest
  },
}
const actions = {
  async fetchLeaveReaquest({commit}) {
    let data = await axios.get('http://localhost:3000/data_leave_reaquest');
    commit('fetchLeaveReaquest', data.data)
  },
  proccessLeaveReaquest({}, payload){
    axios.put('http://localhost:3000/data_leave_reaquest/'+payload.id, payload);
  },
  addLeaveReaquest({}, payload){
    axios.post('http://localhost:3000/data_leave_reaquest', payload);
  },
}
const mutations = {
  fetchLeaveReaquest(state, payload){
    state.leaveReaquest = payload;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}