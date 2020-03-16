<template>
    <div class="w-full w-full relative min-h-screen bg-gray-200 overflow-hidden">   
        <app-header v-if="$cookies.get('local_login')"/>
        <div class="flex flex-col md:flex-row overflow-hidden">
            <app-side-bar v-if="$cookies.get('local_login')"/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppHeader from './components/Header.vue'
import AppSideBar from './components/Sidebar.vue'
export default {
    components:{
        AppHeader,
        AppSideBar,
    },
    computed: {
        ...mapGetters({
            attendanceList: 'attendanceList'
        })
    },
    methods:{
        ...mapActions({
            fetchDateEvent : 'fetchDateEvent',
            fetchEmployees : 'fetchEmployees',
            fetchRoleJob : 'fetchRoleJob',
            fetchEmployeeStatus : 'fetchEmployeeStatus',
            fetchAttendanceList: 'fetchAttendanceList',
            addAttendance: 'addAttendance',
            fetchLeaveReaquest: 'fetchLeaveReaquest'
        }),
    },
    async created() {
        await this.fetchEmployees();
        await this.fetchAttendanceList();
        await this.fetchDateEvent();
        await this.fetchRoleJob();
        await this.fetchEmployeeStatus();
        await this.fetchLeaveReaquest();
        await this.addAttendance();
    },

}
</script>
