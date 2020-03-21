<template>
  <nav class="bg-gray-900 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 px-4">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
        <router-link :to="{ name: 'dashboard' }" tag="span" class="font-semibold text-xl text-white tracking-tight"><a>HR App</a></router-link>
      </div>
      <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
          <li class="px-1">
						<div class="relative inline-block">
              <div class="inline-block py-2 px-4 text-white no-underline" @click="notif = !notif; show = false;"><i class="fas fa-bell pr-0 md:pr-3 text-blue-600"></i></div>
              <div class="absolute bg-gray-900 text-white right-0 z-30 notif-panel p-3 overflow-y-scroll" :class="{ invisible: !notif }">
                <div class="px-2 py-3 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer flex items-center border-b-2 border-gray-800 justify-between" v-for="(item,idx) in broadcastnotif">
                  <div class="w-full">
                    <p class="text-xs block leading-none pb-2 text-gray-200">{{ getName(item) }}</p>
                    <p class="text-base block leading-none whitespace-pre-line">{{ item.title }}</p>
                  </div>
                  <div class="flex items-center">
                    <span class="w-2 h-2" :style="{ backgroundColor: item.label }"></span>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="px-1">
						<div class="relative inline-block">
              <div class="text-gray-600 focus:outline-none cursor-pointer" @click="show = !show; notif = false;"><i class="fas fa-user-circle pr-0 md:pr-1 text-gray-200"></i> <span class="text-gray-200 capitalize">Hi, {{ getUser }}</span> <svg class="h-3 inline" style="fill: #fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
              <div class="absolute bg-gray-900 text-white right-0 mt-3 p-3 overflow-auto z-30 w-40" :class="{ invisible: !show }">
                  <div class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer" @click="logOut()"><i class="fas fa-sign-out-alt fa-fw"></i> Log Out</div>
              </div>
						</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default{
    data(){
      return{
        show: false,
        notif: false,
        broadcastnotif: [],
        broadcastcount: 0
      }
    },
    watch: {
      broadCast(){
        console.log('nambah 1 anjing');
      }
    },
    computed:{
      ...mapGetters({
          employee: 'employee/employee',
          broadCast: 'broadCast/broadCast',
      }),
      getUser(){
        return this.$cookies.get('local_login') && this.employee.find(ob=>ob.id == this.$cookies.get('local_login')) ? this.employee.find(ob=>ob.id == this.$cookies.get('local_login')).name : 'user'
      }
    },
    methods:{
      ...mapActions({
        fetchEmployees : 'employee/fetchEmployees',
        fetchBroadCast : 'broadCast/fetchBroadCast',
      }),
      logOut(){
        this.$cookies.remove('local_login');
        this.$router.push({ name: 'login' });
      },
      getName(item){
        if(!item) return
        return this.employee.find(ob=>ob.id == item.broadcaster).name
      }
    },
    async created() {
      await this.fetchEmployees();
      await this.fetchBroadCast();
      this.broadcastnotif = this.broadCast;
      console.log('header', this.employee);
    },
  }
</script>