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
  async addAttendance({state, dispatch, rootState}){
    await dispatch('fetchAttendanceList');
    await dispatch('employee/fetchEmployees');
    let datas = [];
    let d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    const dt = ye+'-'+mo+'-'+da;
    let last_id = state.attendanceList.length>0 ? (state.attendanceList[state.attendanceList.length-1].id) : 0;
    for(let i=0;i<rootState.employee.employee.length;i++){
      let temp = { "id": rootState.employee.employee[i].id, "clock_in": "", "clock_out": "" }
      datas.push(temp);
    }
    console.log('dt', datas)
    let fix = { 
      "id": last_id+1,
      "date": dt,
      "data" : datas
    }
    if(state.attendanceList.some(ob => ob.date === dt)) return;
    await axios.post('http://localhost:3000/data_attendance', fix);
    dispatch('fetchAttendanceList');
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