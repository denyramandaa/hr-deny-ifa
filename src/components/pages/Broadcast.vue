<template>
    <div class="main-content flex-1 bg-gray-700 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="max-w-5xl mx-auto"> 
        <div class="flex justify-end py-4">
            <div class="flex justify-end items-center">
                <div class="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-base p-1 px-2 mx-1 rounded" @click="add()">Broad Cast Message</div>
                <router-link :to="{name: 'dashboard'}" tag="div" class="bg-transparent hover:underline cursor-pointer text-white text-base p-1 mx-1 rounded"><a>Cancel</a></router-link>
            </div>
        </div>
        <div class="w-full bg-white overflow-y-auto max-h-75">
            <div class="shadow relative">
              <h1 class="py-4 px-10 border-b font-bold text-gray-700 rounded-t bg-white">Make a Broadcast</h1>
              <div class="min-w-full rounded-b bg-gray-100 px-10 pt-5 pb-8 border-t border-white">
                  <div class="flex">
                      <div class="w-full">
                          <div class="flex justify-between">
                            <p class="mb-2 text-gray-600">Broadcast Message</p>
                            <div class="mb-2 text-gray-600">
                              Label Color: <input class="bg-gray-100" type="color" v-model="color">
                            </div>
                          </div>
                          <textarea type="tel" placeholder="" required="required" class="block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="12" v-model="message"></textarea>
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
      color: "#3182ce",
      message: "",
      addSuccess: false,
      addError: false
    }
  },
  computed: {
    ...mapGetters({
      broadCast: 'broadCast/broadCast',
      employee: 'employee/employee',
    })
  },
  watch: {
    addSuccess(){
        if(this.addSuccess){
            let self = this;
            setTimeout(function(){
                self.addSuccess = false;
                self.$router.push({ name: 'dashboard' });
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
      addBroadCast: 'broadCast/addBroadCast',
      fetchBroadCast : 'broadCast/fetchBroadCast',
      fetchEmployees : 'employee/fetchEmployees',
    }),
    add(){
      console.log(this.message, this.color)
      let emp = [];
      for(let i=0;i<this.employee.length;i++){
        emp.push(this.employee[i].id);
      }
      let last_id = (this.broadCast.length>2) ? (this.broadCast[this.broadCast.length-1].id) : 0;
      let fix = {
        id: last_id,
        message: this.message,
        label: this.color,
        viewer: emp
      }
      console.log(fix)
      // {
      //   "id": 1,
      //   "message": "wiwk wkwk dasdasda daskdasdad",
      //   "label": "",
      //   "viewed_by": []
      // }
      // let last_id = (this.leaveReaquest[this.leaveReaquest.length-1].id) ? (this.leaveReaquest[this.leaveReaquest.length-1].id) : 0;
      // if(this.notes){
      //   let temp = {
      //     id : parseInt(last_id)+1,
      //     name: this.getEmployeeName,
      //     id_employee: parseInt(this.$cookies.get('local_login')),
      //     leave_date: this.data_leave,
      //     notes: this.notes,
      //     status: 0
      //   }
      //   this.addSuccess = true;
      //   this.addLeaveReaquest(temp)
      // }else{
      //   this.addError = true;
      // }
    }
  },
  async created() {
    await this.fetchEmployees();
  },
}
</script>