<template>
    <div class="main-content flex-1 bg-gray-700 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="max-w-5xl mx-auto"> 
        <div class="flex flex-col md:flex-row">
          <div class="md:w-full shadow bg-gray-100 rounded m-4">
              <div class="text-center">
                  <div class="p-4 bg-white rounded-t border-b text-center">Total Employees</div>
                  <div class="text-5xl">{{ totalEmploye }}</div>
                  <div class="text-gray-500 pb-4">{{ totalMale }} males / {{ totalFemale }} females</div>
              </div>
          </div>
          <div class="md:w-full shadow bg-gray-100 rounded m-4">
              <div class="p-4 bg-white rounded-t border-b text-center">Out Today</div>
              <div class="text-center p-4">
                    <div class="flex justify-center">
                        <img v-for="item in getOutToday" :key="item.id" :src="getPictureOutToday(item)" alt="" class="rounded-full w-12 -ml-5">
                    </div>
                  <div class="text-gray-500 pt-2 text-center">{{ getOutToday.length }} Peoples Take a Leave Today</div>
              </div>
          </div>
          <div class="md:w-full shadow bg-gray-100 rounded m-4 text-center">
              <div class="p-4 bg-white rounded-t border-b">Today's Present</div>
              <div class="text-5xl">{{ getTodayPresent }}<span class="text-gray-400">/{{ totalEmploye }}</span></div>
            <div class="text-gray-500 pb-4">Clock In till {{ getHoursNow() }}</div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="md:w-full shadow bg-gray-100 rounded m-4">
              <div class="p-4 bg-white rounded-t border-b text-center">Did you absent today?</div>
              <div class="p-4">
                  <p class="text-center mb-4">Don't forget to absent oke</p>
                  <div class="flex justify-center items-center">
                    <div class="text-white cursor-pointer text-lg p-1 px-3 mx-1 rounded" :class="!hasClockIn ? 'bg-green-600' : 'bg-gray-300'" @click="clockIn()">Clock In</div>
                    <div class="text-white cursor-pointer text-lg p-1 px-3 mx-1 rounded" :class="!hasClockOut ? 'bg-red-600' : 'bg-gray-300'" @click="clockOut()">Clock Out</div>
                  </div>
                  <table class="table-auto w-full bg-white border text-sm mt-4">
                      <tr>
                          <td class="px-4 py-2 border-b text-center">Today Clock In : <br><span class="font-bold">{{ checkClock(hasClockIn) }}</span> WIB</td>
                          <td> - </td>
                          <td class="px-4 py-2 border-b text-center">Today Clock Out : <br><span class="font-bold">{{ checkClock(hasClockOut) }}</span> WIB</td>
                      </tr>
                  </table>
              </div>
          </div>
          <div class="md:w-full shadow bg-gray-100 rounded m-4">
              <div class="p-4 bg-white rounded-t border-b text-center"> Upcoming Events </div>
              <div class="p-4">
                  <table class="table-auto w-full bg-white border text-sm">
                      <tr v-for="(item,idx) in getUpcomingEvent.slice(0,5)" :key="idx">
                          <td class="px-4 py-2 border-b">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                          </td>
                          <td class="px-4 py-2 border-b">{{ dateFormatting(item.date) }}</td>
                          <td class="px-4 py-2 border-b">{{ item.deskripsi }}</td>
                      </tr>
                  </table>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data(){
        return {
            hasClockIn: false,
            hasClockOut: false,
        }
    },
    computed:{
        ...mapGetters({
            employee: 'employee/employee',
            dateEvent: 'event/dateEvent',
            attendanceList: 'attendance/attendanceList',
            leaveReaquest: 'leaveRequest/leaveReaquest',
        }),
        totalEmploye(){
            return this.employee.length;
        },
        totalFemale(){
            return this.employee.filter(ob=>ob.gender === 'female').length
        },
        totalMale(){
            return this.employee.filter(ob=>ob.gender === 'male').length
        },
        getUpcomingEvent(){
            let today = new Date();
            return this.dateEvent.filter(ob=>parseInt(this.fixedDate(ob)) >= parseInt(this.dateToString(today)))
        },
        getSelfAttd(){
            return this.attendanceList.find(ob=>ob.date === this.dateLegalFormat()) ? this.attendanceList.find(ob=>ob.date === this.dateLegalFormat()).data.find(d=>d.id == this.$cookies.get('local_login')) : '';
        },
        getTodayId(){
            return this.attendanceList.find(ob=>ob.date === this.dateLegalFormat())
        },
        getTodayPresent(){
            return this.attendanceList.filter(ob=>ob.date === this.dateLegalFormat())[0] ? this.attendanceList.filter(ob=>ob.date === this.dateLegalFormat())[0].data.filter(d=>d.clock_in != "").length : ""
        },
        getOutToday(){
            return this.leaveReaquest.filter(ob=>ob.leave_date.includes(this.dateLegalFormat()) && ob.status === 1)
        },
    },
    methods:{
        ...mapActions({
            fetchEmployees : 'employee/fetchEmployees',
            fetchAttendanceList: 'attendance/fetchAttendanceList',
            updateClockIn: 'attendance/updateClockIn',
            updateClockOut: 'attendance/updateClockOut',
            fetchLeaveReaquest : 'leaveRequest/fetchLeaveReaquest',
        }),
        checkClock(a){
            return a ? a : '-';
        },
        dateFormatting(d){
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const dt = new Date(d);
            const dy = dt.getDate();
            const mn = months[dt.getMonth()];
            const yr = dt.getFullYear();
            return dy+' '+mn+' '+yr
        },
        dateToString(d){
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
            const dt = `${ye}${mo}${da}`;
            return dt;
        },
        dateLegalFormat(){
            let d = new Date();
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
            const dt = ye+'-'+mo+'-'+da;
            return dt;
        },
        fixedDate(d){
            return d.date.split("-").join("");
        },
        addZero(i) {
            if (i < 10) i = "0" + i;
            return i;
        },
        getHoursNow(){
            let d = new Date();
            let h = this.addZero(d.getHours());
            let m = this.addZero(d.getMinutes());
            let s = this.addZero(d.getSeconds());
            return h + ":" + m + ":" + s;
        },
        getPictureOutToday(a){
            return this.employee.find(ob=>ob.id == a.id_employee).photo
        },
        clockIn(){
            if(!this.getSelfAttd.clock_in){
                let parseData = [];
                for(let i=0;i<this.getTodayId.data.length;i++){
                    let temp = { 
                        id: this.getTodayId.data[i].id,
                        clock_in: this.getTodayId.data[i].id == this.$cookies.get('local_login') ? this.getHoursNow() : this.getTodayId.data[i].clock_in,
                        clock_out: this.getTodayId.data[i].clock_out
                    }
                    parseData.push(temp);
                }
                let fix = {
                    id: this.getTodayId.id,
                    doto: {
                        date: this.dateLegalFormat(),
                        data: parseData
                    }
                }
                this.hasClockIn = this.getHoursNow();
                this.updateClockIn(fix);
            }
        },
        clockOut(){
            if(!this.getSelfAttd.clock_out){
                let parseData = [];
                for(let i=0;i<this.getTodayId.data.length;i++){
                    let temp = { 
                        id: this.getTodayId.data[i].id,
                        clock_in: this.getTodayId.data[i].clock_in,
                        clock_out: this.getTodayId.data[i].id == this.$cookies.get('local_login') ? this.getHoursNow() : this.getTodayId.data[i].clock_out
                    }
                    parseData.push(temp);
                }
                let fix = {
                    id: this.getTodayId.id,
                    doto: {
                        date: this.dateLegalFormat(),
                        data: parseData
                    }
                }
                this.hasClockOut = this.getHoursNow();
                this.updateClockOut(fix);
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
    },
    async created() {
        await this.fetchAttendanceList();
        await this.fetchEmployees();
        await this.fetchLeaveReaquest();
        this.hasClockIn = this.getSelfAttd && this.getSelfAttd.clock_in ? this.getSelfAttd.clock_in : false;
        this.hasClockOut = this.getSelfAttd && this.getSelfAttd.clock_out ? this.getSelfAttd.clock_out : false;
    }
}
</script>