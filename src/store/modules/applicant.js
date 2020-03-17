import axios from 'axios'

const state = {
  applicantList: []
}

const getters = {
  applicantList(state){
    return state.applicantList
  },
}

const actions = {
  async fetchApplicant({commit}) {
    let data = await axios.get('http://localhost:3000/data_applicant');
    commit('fetchApplicant', data.data)
  },
  deleteApplicant({}, payload){
    axios.delete('http://localhost:3000/data_applicant/'+payload);
  },
  proccessApplicant({}, payload){
    axios.put('http://localhost:3000/data_applicant/'+payload.id, payload);
  },
  addApplicant({}, payload){
    axios.post('http://localhost:3000/data_applicant', payload);
  },
}

const mutations = {
  fetchApplicant(state, payload){
    state.applicantList = payload;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}