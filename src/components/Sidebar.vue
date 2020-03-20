<template>
  <div class="bg-gray-900 shadow-lg h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-48">
    <div class="mt-16 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
      <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
        <router-link  v-for="(nav,key) in navs" :key="key" :to="{ name: nav.url }" tag="li" class="flex-1 px-2" exact :class="{ 'active' : $route.name.includes(nav.url) }">
          <a class="block py-4 align-middle text-white no-underline border-b-2" :class="$route.name.includes(nav.url) ? 'border-blue-600' : 'border-gray-800'">
            <i class="fas pr-0 md:pr-2" :class="nav.icon"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base md:text-white block md:inline-block capitalize text-gray-600">{{ nav.name }}</span>
            <span class="p-1 bg-yellow-500 text-black rounded-sm ml-1 text-xs" v-if="nav.notif">{{nav.notif}}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default{
  computed:{
    ...mapGetters({
      applicantList: 'applicant/applicantList',
      leaveReaquest: 'leaveRequest/leaveReaquest',
    })
  },
  data(){
    return{
      navs: [
        {
          name: 'Dashboard',
          url: 'dashboard',
          icon: 'fa-home',
          notif: 0
        },{
          name: 'Employees',
          url: 'employees',
          icon: 'fa-users',
          notif: 0
        },{
          name: 'Attendance',
          url: 'attendance',
          icon: 'fa-user-clock',
          notif: 0
        },{
          name: 'Applicants',
          url: 'applicants',
          icon: 'fa-paperclip',
          notif: 0
        },{
          name: 'Leave Request',
          url: 'leave_reaquest',
          icon: 'fa-plane-departure',
          notif: 0
        },{
          name: 'Make a Broadcast',
          url: 'broadcast',
          icon: 'fa-bullhorn',
          notif: 0
        }
      ]
    }
  },
  watch:{
    leaveReaquest(){
      this.navs[4].notif = this.leaveReaquest.filter(ob=>ob.status === 0).length
    },
    applicantList(){
      this.navs[3].notif = this.applicantList.filter(ob=>ob.status_applicant === 0).length
    }
  },
  methods:{
    ...mapActions({
      fetchLeaveReaquest : 'leaveRequest/fetchLeaveReaquest',
      fetchApplicant : 'applicant/fetchApplicant',
    }),
    getLeaveReaquestNotif(){
      this.navs[4].notif = this.leaveReaquest.filter(ob=>ob.status === 0).length
    },
    getApplicantNotif(){
      this.navs[3].notif = this.applicantList.filter(ob=>ob.status_applicant === 0).length
    }
  },
  async created(){
    await this.fetchApplicant();
    await this.fetchLeaveReaquest();
    this.getLeaveReaquestNotif();
    this.getApplicantNotif();
  }
}
</script>
<style scoped>
  li.active{
    background-color: #3182ce;
  }
</style>