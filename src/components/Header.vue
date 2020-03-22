<template>
  <nav class="bg-gray-900 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 px-4">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
        <router-link :to="{ name: 'dashboard' }" tag="span" class="font-semibold text-xl text-white tracking-tight"><a>HR App</a></router-link>
      </div>
      <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
          <li class="px-1">
            <a class="inline-block py-2 px-4 text-white no-underline" href="#"><i class="fas fa-bell pr-0 md:pr-3 text-blue-600"></i></a>
          </li>
          <li class="px-1">
						<div class="relative inline-block">
              <div class="text-gray-600 focus:outline-none cursor-pointer" @click="show = !show"><i class="fas fa-user-circle pr-0 md:pr-1 text-gray-200"></i> <span class="text-gray-200 capitalize">Hi, {{ getUser }}</span> <svg class="h-3 inline" style="fill: #fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
              <div class="absolute bg-gray-900 text-white right-0 mt-3 p-3 overflow-auto z-30 w-40" :class="{ invisible: !show }">
                  <!-- <router-link :to="{name: 'edit_employees', params: { id: $cookies.get('local_login') }}" tag="a" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block cursor-pointer"><i class="fas fa-cog fa-fw"></i> Settings</router-link> -->
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
        id: ''
      }
    },
    computed:{
      ...mapGetters({
          employee: 'employee/employee',
      }),
      getUser(){
        return this.$cookies.get('local_login') && this.employee.find(ob=>ob.id == this.$cookies.get('local_login')) ? this.employee.find(ob=>ob.id == this.$cookies.get('local_login')).name : 'user'
      }
    },
    methods:{
      ...mapActions({
        fetchEmployees : 'employee/fetchEmployees',
      }),
      logOut(){
        this.$cookies.remove('local_login');
        this.$router.push({ name: 'login' });
      }
    },
    async created() {
      await this.fetchEmployees();
      this.id = this.$cookies.get('local_login');
      console.log('header', this.employee);
    },
  }
</script>