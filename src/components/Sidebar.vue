<template>
  <div class="bg-gray-900 shadow-lg h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
    <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
      <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
        <router-link  v-for="(nav,key) in navs" :key="key" :to="{ name: nav.url }" tag="li" class="mr-3 flex-1" exact :class="{ 'active' : $route.name.includes(nav.url) }">
          <a class="block py-1 md:py-3 pl-1 align-middle text-white no-underline border-b-2 border-gray-800">
            <i class="fas pr-0 md:pr-3" :class="nav.icon"></i>
            <span class="pb-1 md:pb-0 text-xs md:text-base md:text-white block md:inline-block capitalize text-gray-600">{{ nav.name }}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      navs: [
        {
          name: 'Dashboard',
          url: 'dashboard',
          icon: 'fa-home'
        },{
          name: 'Employees',
          url: 'employees',
          icon: 'fa-users'
        },{
          name: 'Attendance',
          url: 'attendance',
          icon: 'fa-user-clock'
        },{
          name: 'Applicants',
          url: 'applicants',
          icon: 'fa-paperclip'
        },{
          name: 'Leave Reaquest',
          url: 'leave_reaquest',
          icon: 'fa-plane-departure'
        }
      ]
    }
  },
  watch:{
    // '$route'(to, from){
    //   console.log(to);
    // }
  },
}
</script>
<style scoped>
  li.active{
    background-color: #3182ce;
  }
</style>