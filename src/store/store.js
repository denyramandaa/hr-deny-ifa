import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import "regenerator-runtime/runtime.js"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    employee: [],
    dateEvent: [],
    roleJob: [],
    employeeStatus: [],
    attendanceList:[],
    leaveReaquest: [],
    applicantList: []
  },
  getters:{
    employee(state){
      return state.employee
    },
    dateEvent(state){
      return state.dateEvent
    },
    roleJob(state){
      return state.roleJob
    },
    employeeStatus(state){
      return state.employeeStatus
    },
    attendanceList(state){
      return state.attendanceList
    },
    leaveReaquest(state){
      return state.leaveReaquest
    },
    applicantList(state){
      return state.applicantList
    },
  },
  actions: {
    async fetchEmployees({commit}) {
      let data = await axios.get('http://localhost:3000/data_employee');
      commit('fetchEmployeess', data.data)
    },
    async fetchDateEvent({commit}) {
      let data = await axios.get('http://localhost:3000/date_event');
      commit('fetchDateEvent', data.data)
    },
    async fetchRoleJob({commit}) {
      let data = await axios.get('http://localhost:3000/role_job');
      commit('fetchRoleJob', data.data)
    },
    async fetchEmployeeStatus({commit}) {
      let data = await axios.get('http://localhost:3000/status_employee');
      commit('fetchEmployeeStatus', data.data)
    },
    async fetchAttendanceList({commit}) {
      let data = await axios.get('http://localhost:3000/data_attendance');
      commit('fetchAttendanceList', data.data)
    },
    async fetchLeaveReaquest({commit}) {
      let data = await axios.get('http://localhost:3000/data_leave_reaquest');
      commit('fetchLeaveReaquest', data.data)
    },
    async fetchApplicant({commit}) {
      let data = await axios.get('http://localhost:3000/data_applicant');
      commit('fetchApplicant', data.data)
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
    proccessLeaveReaquest({}, payload){
      axios.put('http://localhost:3000/data_leave_reaquest/'+payload.id, payload);
    },
    addLeaveReaquest({}, payload){
      axios.post('http://localhost:3000/data_leave_reaquest', payload);
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
  },
  mutations: {
    fetchEmployeess(state, payload){
      state.employee = payload;
    },
    fetchDateEvent(state, payload){
      state.dateEvent = payload;
    },
    fetchRoleJob(state, payload){
      state.roleJob = payload;
    },
    fetchEmployeeStatus(state, payload){
      state.employeeStatus = payload;
    },
    fetchAttendanceList(state, payload){
      state.attendanceList = payload;
    },
    fetchLeaveReaquest(state, payload){
      state.leaveReaquest = payload;
    },
    addEmployee(state, payload){
      state.employee.push(payload);
    },
    fetchApplicant(state, payload){
      state.applicantList = payload;
    },
  }
});
