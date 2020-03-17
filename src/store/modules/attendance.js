import axios from 'axios'

const state = {
  attendanceList:[],
}

const getters = {
  attendanceList(state){
    return state.attendanceList
  }
}

const actions = {
  async fetchAttendanceList({commit}) {
    let data = await axios.get('http://localhost:3000/data_attendance');
    commit('fetchAttendanceList', data.data)
  },
  addAttendance({state}){
    let datas = [];
    let d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    const dt = ye+'-'+mo+'-'+da;
    for(let i=0;i<state.employee.length;i++){
      let temp = { "id": state.employee[i].id, "clock_in": "", "clock_out": "" }
      datas.push(temp);
    }
    let last_id = (state.employee[state.employee.length-1].id);
    let fix = { 
      "id": last_id,
      "date": dt,
      "data" : datas
    }
    if(state.attendanceList.some(ob => ob.date === dt)) return;
    axios.post('http://localhost:3000/data_attendance', fix);
  },
  updateClockIn({}, payload){
    axios.put('http://localhost:3000/data_attendance/'+payload.id, payload.doto);
  },
  updateClockOut({}, payload){
    axios.put('http://localhost:3000/data_attendance/'+payload.id, payload.doto);
  },
}

const mutations = {
  fetchAttendanceList(state, payload){
    state.attendanceList = payload;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}