import axios from 'axios'

const state = {
  broadCast: [],
}

const getters = {
  broadCast(state){
    return state.broadCast
  },
}

const actions = {
  async fetchBroadCast({commit}) {
    let data = await axios.get('http://localhost:3000/data_broadcast');
    commit('fetchBroadCast', data.data)
  },
  addBroadCast({}, payload){
    axios.post('http://localhost:3000/data_broadcast', payload);
  },
}

const mutations = {
  fetchBroadCast(state, payload){
    state.broadCast = payload;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}