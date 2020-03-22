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
                  <div class="w-full">
                    <div class="mb-6 flex">
                      <p class="text-gray-600 pr-2">Label</p>
                      <input class="bg-gray-100" type="color" v-model="color">
                    </div>
                    <div class="w-full mb-6">
                        <p class="mb-2 text-gray-600">Title</p>
                        <input type="text" placeholder="" class="block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" v-model="title">
                    </div>
                    <div class="mb-6">
                      <p class="mb-1 text-gray-600">Message</p>
                      <textarea placeholder="" required="required" class="block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="12" v-model="message"></textarea>
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
      title: "",
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
                self.title = "";
                self.message = "";
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
    dateFormatting(){
        let d = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dt = new Date(d);
        const dy = dt.getDate();
        const mn = months[dt.getMonth()];
        const yr = dt.getFullYear();
        return dy+' '+mn
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
        return h + ":" + m
    },
    add(){
      let emp = [];
      for(let i=0;i<this.employee.length;i++){
        if(this.employee[i].id != this.$cookies.get('local_login')) emp.push(this.employee[i].id);
      }
      let last_id = this.broadCast ? (this.broadCast[this.broadCast.length-1].id) : 0;
      let dateNow = this.dateFormatting() + ', ' + this.getHoursNow();
      let fix = {
        id: parseInt(last_id)+1,
        broadcaster: parseInt(this.$cookies.get('local_login')),
        title: this.title,
        message: this.message,
        label: this.color,
        date: dateNow,
        viewer: emp
      }
      console.log(this.broadCast[this.broadCast.length-1].id)
      console.log(fix)
      if(this.title && this.message){
        this.addSuccess = true;
        this.addBroadCast(fix)
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