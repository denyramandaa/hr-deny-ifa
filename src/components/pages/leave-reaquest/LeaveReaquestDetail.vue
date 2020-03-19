<template>
  <div class="main-content flex-1 bg-gray-700 flex pt-20">
    <div class="w-full max-w-4xl mx-auto bg-transparent" v-if="getUserDetail && getLeaveReaquest"> 
      <div class="flex justify-end py-4">
          <div class="flex justify-end items-center">
              <div class="bg-red-600 hover:bg-red-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" v-if="!getLeaveReaquest.status && !isUser()" @click="reject()">Reject</div>
              <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" v-if="!getLeaveReaquest.status && !isUser()" @click="approve()">Approve</div>
              <router-link :to="{name: 'leave_reaquest'}" tag="div" class="bg-transparent hover:underline cursor-pointer text-white text-base p-1 mx-1 rounded"><a>Back</a></router-link>
          </div>
      </div>
      <div class="flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0 relative">
        <!--Main Col-->
        <h1 class="py-4 px-10 border-b font-bold text-gray-700 rounded-t bg-white w-full">Leave Reaquest Detail</h1>
        <div id="profile" class="w-full shadow-2xl bg-white mx-6 lg:mx-0 flex">
            <div class="px-12 py-8 text-center lg:text-left text-gray-700 w-2/3">
                <h1 class="text-2xl font-bold pt-8 lg:pt-0 capitalize">{{ getUserDetail.name }}</h1>

                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25"></div>

                <div class="pt-4 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-1/4">
                    <i class="fas fa-briefcase mr-2"></i>Position
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/4 capitalize">{{ getRoleJobPosition(getUserDetail) }}</span>
                </div>
                <div class="pt-4 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-1/4">
                    <i class="fas fa-briefcase mr-2"></i>Divition
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/4 capitalize">{{ getRoleJobDivition(getUserDetail) }}</span>
                </div>
                <div class="pt-4 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-1/4">
                    <i class="fas fa-phone mr-2"></i>Phone
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/4 capitalize">{{ getUserDetail.phone }}</span>
                </div>
                <div class="pt-4 text-base flex justify-center lg:justify-start">
                  <div class="w-1/4">
                    <i class="fas fa-calendar-alt mr-2"></i>Leave date
                  </div>
                  <span class="w-1/12">:</span>
                  <div class="w-3/4">
                    <span class="font-bold block" v-for="item in getLeaveReaquest.leave_date" :key="item">{{ item | formatingCustomDate}}</span>
                  </div>
                </div>
                <div class="pt-4 text-base flex justify-center lg:justify-start">
                  <div class="w-1/4">
                    <i class="fas fa-comment-dots mr-2"></i>Notes
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/4 normal-case">{{ getLeaveReaquest.notes }}</span>
                </div>
                
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25"></div>

                <p class="pt-8 text-base flex items-center justify-center lg:justify-start"><i class="fas fa-stamp mr-2"></i>Status : <span class="ml-1 capitalize p-2 rounded text-white" :class="{ 'bg-gray-400': !getLeaveReaquest.status, 'bg-green-400': getLeaveReaquest.status == 1, 'bg-red-400': getLeaveReaquest.status == 2 }">{{ getStatusText(getLeaveReaquest.status) }}</span></p>
            </div>
        </div>
        <transition name="fade">
          <div class="custom-modal-succes absolute flex justify-center items-center text-white bg-green-400 rounded" v-if="succesApprove">Success Approved a Leave Reaquest</div>
        </transition>
        <transition name="fade">
          <div class="custom-modal-succes absolute flex justify-center items-center text-white bg-red-400 rounded" v-if="succesReject">Success Rejected a Leave Reaquest</div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      id: this.$route.params.id,
      succesApprove: false,
      succesReject: false,
    }
  },
  computed:{
    ...mapGetters({
        employee: 'employee/employee',
        leaveReaquest: 'leaveRequest/leaveReaquest',
        roleJob: 'employee/roleJob',
    }),
    getLeaveReaquest(){
      return this.leaveReaquest.find(ob=>ob.id === this.id);
    },
    getUserDetail(){
      if(this.getLeaveReaquest) return this.employee.find(ob=>ob.id === this.getLeaveReaquest.id_employee);
    },
  },
  methods:{
    ...mapActions({
      fetchEmployees : 'employee/fetchEmployees',
      fetchLeaveReaquest : 'leaveRequest/fetchLeaveReaquest',
      fetchRoleJob : 'employee/fetchRoleJob',
      proccessLeaveReaquest: 'leaveRequest/proccessLeaveReaquest'
    }),
    getRoleJobPosition(d){
        return this.roleJob.find(ob=>ob.id === d.role_job) ? this.roleJob.find(ob=>ob.id === d.role_job).position : ''
    },
    getRoleJobDivition(d){
        return this.roleJob.find(ob=>ob.id === d.role_job) ? this.roleJob.find(ob=>ob.id === d.role_job).divition : ''
    },
    getStatusText(a){
      if(!a) return 'pending'
      return a == 1 ? 'approved' : 'rejected'
    },
    approve(){
      let temp = {
        id: this.id,
        name: this.getLeaveReaquest.name,
        id_employee: this.getLeaveReaquest.id_employee,
        leave_date: this.getLeaveReaquest.leave_date,
        notes: this.getLeaveReaquest.notes,
        status: 1,
      }
      this.proccessLeaveReaquest(temp);
      this.succesApprove = true;
    },
    reject(){
      let temp = {
        id: this.id,
        name: this.getLeaveReaquest.name,
        id_employee: this.getLeaveReaquest.id_employee,
        leave_date: this.getLeaveReaquest.leave_date,
        notes: this.getLeaveReaquest.notes,
        status: 2,
      }
      this.proccessLeaveReaquest(temp);
      this.succesReject = true;
    },
    isUser(){
      return this.getLeaveReaquest.id_employee == this.$cookies.get('local_login')
    }
  },
  watch:{
    '$route'(to, from){
      this.id = to.params.id;
    },
    succesApprove(){
      if(this.succesApprove){
        let self = this;
        setTimeout(function(){
          self.succesApprove = false;
          self.$router.push({ name: 'leave_reaquest' });
        },1500);
      }
    },
    succesReject(){
      if(this.succesReject){
        let self = this;
        setTimeout(function(){
          self.succesReject = false;
          self.$router.push({ name: 'leave_reaquest' });
        },1500);
      }
    },
  },
  async created(){
    await this.fetchEmployees();
    await this.fetchLeaveReaquest();
    await this.fetchRoleJob();
    if(!this.getLeaveReaquest) this.$router.push({ name: 'leave_reaquest' });
  },
  beforeRouteEnter (to, from, next) {
      $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
  },
}
</script>