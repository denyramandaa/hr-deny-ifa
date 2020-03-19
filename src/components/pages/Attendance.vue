<template>
    <div class="main-content flex-1 bg-gray-700 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="max-w-5xl mx-auto"> 
        <div class="flex justify-between">
            <ul class="flex justify-start">
                <li class="-mb-px mr-1 cursor-pointer" v-for="(item, idx) in menu" :key="idx" :class="{ 'tab-active' : activeIdx === idx }" @click="activeIdx=idx">
                    <a class="bg-gray-300 inline-block py-4 px-4 text-gray-500 rounded-t hover:text-blue-600 font-semibold">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="w-full bg-white text-center overflow-y-auto max-h-75">
            <div class="flex p-6 border-b-4 border-gray-200 hover:bg-gray-100 flex-wrap sticky top-0 bg-white z-10">
                <div class="items-center w-2/12 text-left">Employee</div>
                <div class="items-center px-2 w-2/12" v-for="att in attendanceList.slice(attendanceList.length-5,attendanceList.length)" :key="att.date">{{ att.date | formatingCustomDate }}</div>
            </div>
            <div class="flex p-6 border-b border-gray-200 hover:bg-gray-100 flex-wrap" v-for="item in employee" :key="item.id">
                <div class="items-center w-2/12 capitalize text-left">{{ item.name }}</div>
                <div class="items-center px-2 w-2/12" v-for="att in attendanceList.slice(attendanceList.length-5,attendanceList.length)" :key="att.date">
                    <span class="font-bold" v-if="activeIdx" :class="getClockOut(att.date, item.id) == '-' ? 'text-red-500' : 'text-green-500'"> {{ getClockOut(att.date, item.id) }} </span>
                    <span class="font-bold" v-else :class="getClockIn(att.date, item.id) == '-' ? 'text-red-500' : 'text-green-500'"> {{ getClockIn(att.date, item.id) }} </span>
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
        return{
            activeIdx: 0,
            menu: [{
                key: 'clock-in',
                name: 'Clock In'
            },{
                key: 'clock-out',
                name: 'Clock Out'
            }],
        }
    },
    computed:{
        ...mapGetters({
            employee: 'employee/employee',
            attendanceList: 'attendance/attendanceList'
        })
    },
    methods: {
        ...mapActions({
            fetchEmployees: 'employee/fetchEmployees',
            fetchAttendanceList: 'attendance/fetchAttendanceList'
        }),
        getClockIn(date, id){
            return this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id) && this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id).clock_in ? this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id).clock_in : '-'
        },
        getClockOut(date, id){
            return this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id) &&this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id).clock_out ? this.attendanceList.find(ob=>ob.date === date).data.find(d=>d.id == id).clock_out : '-'
        }
    },
    created() {
        this.fetchEmployees();
        this.fetchAttendanceList();
    },
    beforeRouteEnter (to, from, next) {
        $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
    },
}
</script>