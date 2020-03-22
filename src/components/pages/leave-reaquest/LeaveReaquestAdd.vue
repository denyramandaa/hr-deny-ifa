<template>
    <div class="main-content flex-1 bg-gray-700 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="max-w-5xl mx-auto"> 
        <div class="flex justify-end py-4">
            <div class="flex justify-end items-center">
                <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" @click="add()">Add</div>
                <router-link :to="{name: 'leave_reaquest'}" tag="div" class="bg-transparent hover:underline cursor-pointer text-white text-base p-1 mx-1 rounded"><a>Cancel</a></router-link>
            </div>
        </div>
        <div class="w-full bg-white overflow-y-auto max-h-75">
            <div class="shadow relative">
              <h1 class="py-4 px-10 border-b font-bold text-gray-700 rounded-t bg-white">Add Leave Reaquest</h1>
              <div class="min-w-full rounded-b bg-gray-100 px-10 pt-5 pb-8 border-t border-white">
                  <div class="flex">
                      <div class="w-2/4">
                          <div class="w-full mb-2">
                              <p class="mb-2 text-gray-600">Notes</p>
                              <textarea placeholder="" required="required" class="block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="3" v-model="notes"></textarea>
                          </div>
                      </div>
                      <div class="w-2/4 ml-10">
                          <div class="w-full mb-2">
                              <p class="mb-2 text-gray-600">Leave Date</p>
                              <input type="date" placeholder="" class="block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2" v-for="day in days" :key="day" ref="date_leave" value="2020-05-29">
                          </div>
                          <div class="w-full flex justify-end">
                            <button class="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold focus:outline-none py-2 px-4 rounded-l mr-2" @click="days--" v-if="days>=2">-</button>
                            <button class="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold focus:outline-none py-2 px-4 rounded-r" @click="days++" v-if="days<=7">+</button>
                          </div>
                      </div>
                  </div>
              </div>
              <transition name="fade">
                <div class="custom-modal-succes capitalize absolute flex justify-center items-center text-white bg-green-400 rounded" v-if="addSuccess">Success Add Leave Reaquest</div>
              </transition>
              <transition name="fade">
                <div class="custom-modal-succes capitalize absolute flex justify-center items-center text-white bg-red-400 rounded" v-if="addError">Error: some input are empty</div>
              </transition>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data(){
    return{
      days: 1,
      notes: "",
      data_leave: [],
      addSuccess: false,
      addError: false
    }
  },
  computed: {
    ...mapGetters({
      leaveReaquest: 'leaveRequest/leaveReaquest',
      employee: 'employee/employee',
    }),
    getEmployeeName(){
      return this.employee.find(ob=>ob.id == parseInt(this.$cookies.get('local_login'))).name
    }
  },
  watch: {
    addSuccess(){
        if(this.addSuccess){
            let self = this;
            setTimeout(function(){
                self.addSuccess = false;
                self.$router.push({ name: 'leave_reaquest' });
            },1500);
        }
    },
    addError(){
        if(this.addError){
            let self = this;
            setTimeout(function(){
                self.addError = false;
            },1500);
        }
    },
  },
  methods: {
    ...mapActions({
      addLeaveReaquest: 'leaveRequest/addLeaveReaquest',
      fetchEmployees : 'employee/fetchEmployees',
    }),
    add(){
      let last_id = this.leaveReaquest ? (this.leaveReaquest[this.leaveReaquest.length-1].id) : 0;
      if(this.notes){
        this.data_leave = [];
        for(let i=0;i<this.days;i++){
          this.data_leave.push(this.$refs.date_leave[i].value);
        }
        let temp = {
          id : parseInt(last_id)+1,
          name: this.getEmployeeName,
          id_employee: parseInt(this.$cookies.get('local_login')),
          leave_date: this.data_leave,
          notes: this.notes,
          status: 0
        }
        this.addSuccess = true;
        this.addLeaveReaquest(temp)
      }else{
        this.addError = true;
      }
    }
  },
  async created() {
    await this.fetchEmployees();
  },
}
</script>