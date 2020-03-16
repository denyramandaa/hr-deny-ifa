<template>
  <div class="main-content flex-1 bg-gray-700 flex pt-20">
    <div class="w-full max-w-4xl mx-auto bg-transparent" v-if="getApplicantDetail"> 
      <div class="flex justify-end py-4">
          <div class="flex justify-end items-center">
              <div class="bg-red-600 hover:bg-red-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" @click="removeApplicant()">Not Qualified</div>
              <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" v-if="getApplicantDetail.status_applicant == 0" @click="processApllicantTo(1)">Continue to Psyco Test</div>
              <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" v-if="getApplicantDetail.status_applicant == 1" @click="processApllicantTo(2)">Continue to Interview</div>
              <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" v-if="getApplicantDetail.status_applicant == 2" @click="acceptApplicant()">Qualified as Employee</div>
              <router-link :to="{name: 'applicants'}" tag="div" class="bg-transparent hover:underline cursor-pointer text-white text-base p-1 mx-1 rounded"><a>Back</a></router-link>
          </div>
      </div>
      <div class="flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0 relative">
        <!--Main Col-->
        <h1 class="py-4 px-10 border-b font-bold text-gray-700 rounded-t bg-white w-full">Aplicants Detail</h1>
        <div id="profile" class="w-full bg-white mx-6 lg:mx-0 flex">
            <div class="w-1/3">
              <div class="bg-cover bg-center h-full" :style="{ 'background-image': 'url(' + getApplicantDetail.photo + ')' }"></div>
            </div>
            <div class="px-12 py-8 text-center lg:text-left text-gray-700 w-2/3">
                <h2 class="text-2xl font-bold pt-8 lg:pt-0 capitalize">{{ getApplicantDetail.name }}</h2>

                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25"></div>


                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-briefcase mr-2 capitalize"></i>Applying to
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 capitalize">{{ getRoleJobPosition(getApplicantDetail) }} - {{ getRoleJobDivition(getApplicantDetail) }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-envelope mr-2"></i>Email
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5">{{ getApplicantDetail.email }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-phone mr-2"></i>Phone
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5">{{ getApplicantDetail.phone }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-venus-mars mr-2"></i>Gender
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 capitalize">{{ getApplicantDetail.gender }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-birthday-cake mr-2"></i>Birth Date
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5">{{ getApplicantDetail.birth_date | formatingCustomDate }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-dove mr-2"></i>Birth Place
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 capitalize">{{ getApplicantDetail.birth_place }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-building mr-2 capitalize"></i>Last Company/School
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 capitalize">{{ getApplicantDetail.last_work }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-graduation-cap mr-2"></i>Last Education
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 uppercase">{{ getApplicantDetail.last_education }}</span>
                </div>

                <div class="pt-5 text-base flex items-center justify-center lg:justify-start">
                  <div class="w-2/6">
                    <i class="fas fa-map-marked-alt mr-2"></i>Address
                  </div>
                  <span class="w-1/12">:</span>
                  <span class="w-3/5 normal-case">{{ getApplicantDetail.address }}</span>
                </div>

                <div class="mx-auto lg:mx-0 w-4/5 pt-4 border-b-2 border-blue-600 opacity-25"></div>

                <p class="pt-8 text-base flex items-center justify-center lg:justify-start"><i class="fas fa-stamp mr-2"></i>Last Process : <span class="font-bold ml-1 capitalize">{{ getStatusText(getApplicantDetail.status_applicant) }}</span></p>
            </div>
        </div>
        <transition name="fade">
          <div class="custom-modal-succes absolute flex justify-center items-center text-white bg-green-400 rounded" v-if="succesApprove">Success Continue an Applicant to Next Process</div>
        </transition>
        <transition name="fade">
          <div class="custom-modal-succes absolute flex justify-center items-center text-white bg-red-400 rounded" v-if="succesReject">Success Unqualified an Applicant</div>
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
  computed: {
    ...mapGetters({
      applicantList: 'applicantList',
      roleJob: 'roleJob',
      employee: 'employee',
    }),
    getApplicantDetail(){
      return this.applicantList.find(ob=>ob.id === this.id)
    }
  },
  methods: {
    ...mapActions({
      addEmployee: 'addEmployee',
      fetchEmployees : 'fetchEmployees',
      fetchApplicant : 'fetchApplicant',
      fetchRoleJob : 'fetchRoleJob',
      deleteApplicant: 'deleteApplicant',
      proccessApplicant: 'proccessApplicant'
    }),
    getRoleJobPosition(d){
        return this.roleJob.find(ob=>ob.id === d.apply_to) ? this.roleJob.find(ob=>ob.id === d.apply_to).position : ''
    },
    getRoleJobDivition(d){
        return this.roleJob.find(ob=>ob.id === d.apply_to) ? this.roleJob.find(ob=>ob.id === d.apply_to).divition : ''
    },
    getStatusText(a){
      if(!a) return 'unprocessed'
      return a == 1 ? 'psyco test' : 'interview'
    },
    removeApplicant(){
      this.deleteApplicant(this.id);
      this.succesReject = true;
    },
    processApllicantTo(a){
      let temp = {
        id: this.id,
        apply_to: this.getApplicantDetail.apply_to,
        name: this.getApplicantDetail.name,
        email: this.getApplicantDetail.email,
        phone: this.getApplicantDetail.phone,
        gender: this.getApplicantDetail.gender,
        birth_date: this.getApplicantDetail.birth_date,
        birth_place: this.getApplicantDetail.birth_place,
        photo: this.getApplicantDetail.photo,
        last_work: this.getApplicantDetail.last_work,
        last_education: this.getApplicantDetail.last_education,
        address: this.getApplicantDetail.address,
        status_applicant: a
      }
      this.proccessApplicant(temp);
      this.succesApprove = true;
    },
    acceptApplicant(){
      let last_id = (this.employee[this.employee.length-1].id);
      let new_user = {
          "id" : parseInt(last_id)+1,
          "role_job" : parseInt(this.getApplicantDetail.apply_to),
          "status_employee" : 2,
          "name" : this.getApplicantDetail.name,
          "email" : this.getApplicantDetail.email,
          "phone" : this.getApplicantDetail.phone,
          "gender" : this.getApplicantDetail.gender,
          "birth_date" : this.getApplicantDetail.birth_date,
          "birth_place" : this.getApplicantDetail.birth_place,
          "photo" : this.getApplicantDetail.photo,
          "password" : "kompas2020"
      }
      this.succesApprove = true;
      this.addEmployee(new_user);
      this.deleteApplicant(this.id);
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
          self.$router.push({ name: 'applicants' });
        },1500);
      }
    },
    succesReject(){
      if(this.succesReject){
        let self = this;
        setTimeout(function(){
          self.succesReject = false;
          self.$router.push({ name: 'applicants' });
        },1500);
      }
    },
  },
  beforeRouteEnter (to, from, next) {
      $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
  },
  async created(){
    await this.fetchApplicant();
    await this.fetchRoleJob();
    await this.fetchEmployees();
    if(!this.getApplicantDetail) this.$router.push({ name: 'applicants' });
  },
}
</script>