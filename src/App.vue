<template>
    <div class="w-full w-full relative min-h-screen overflow-hidden">   
        <app-header v-if="page != 'login' && page != 'apply'"/>
        <div class="flex flex-col md:flex-row overflow-hidden">
            <app-side-bar v-if="page !== 'login' && page !== 'apply'"/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppHeader from './components/Header.vue'
import AppSideBar from './components/Sidebar.vue'
export default {
    data(){
        return {
            page: ''
        }
    },
    components:{
        AppHeader,
        AppSideBar,
    },
    watch:{
        '$route'(to, from){
            this.page = to.name;
        },
    },
    computed: {
        ...mapGetters({
            attendanceList: 'attendance/attendanceList'
        })
    },
    methods:{
        ...mapActions({
            fetchDateEvent : 'event/fetchDateEvent',
            fetchEmployees : 'employee/fetchEmployees',
            fetchRoleJob : 'employee/fetchRoleJob',
            fetchEmployeeStatus : 'employee/fetchEmployeeStatus',
            addAttendance: 'attendance/addAttendance',
            fetchLeaveReaquest: 'leaveRequest/fetchLeaveReaquest'
        }),
    },
    async created() {
        await this.fetchEmployees();
        await this.addAttendance();
        await this.fetchDateEvent();
        await this.fetchRoleJob();
        await this.fetchEmployeeStatus();
        await this.fetchLeaveReaquest();
        this.page = this.$route.name
    }

}
</script>
