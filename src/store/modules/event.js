import axios from 'axios'

const state = {
  dateEvent: [],
}

const getters = {
  dateEvent(state){
    return state.dateEvent
  },
}

const actions = {
  async fetchDateEvent({commit}) {
    let data = await axios.get('http://localhost:3000/date_event');
    commit('fetchDateEvent', data.data)
  },
}

const mutations = {
  fetchDateEvent(state, payload){
    state.dateEvent = payload;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}