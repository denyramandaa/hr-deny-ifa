<template>
    <div class="w-full flex justify-center items-center min-h-screen">
        <form class="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4" @submit.prevent="logIn()">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-orange-100" id="email" type="text" placeholder="Email" v-model="user.email" :class="{ 'border-red-600' : loginError }">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-orange-100" id="password" type="password" placeholder="Password" v-model="user.password" :class="{ 'border-red-600' : loginError }">
                <p class="text-red-600 text-xs italic text-center" v-if="loginError">Account is not found</p>
            </div>
            <div class="flex items-center justify-center">
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">Sign In</button>
            </div>
        </form>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        loginError: false,
      }
    },
    methods: {
      logIn() {
        var getIndexUser = this.employee.findIndex(obj => obj.email === this.user.email && obj.password === this.user.password);
        if (getIndexUser == -1) {
          this.loginError = true;
          return
        }

        this.$cookies.set('local_login', this.employee[getIndexUser].id, '23h');
        this.$router.push({
          name: 'dashboard'
        });
      }
    },
    computed: {
      ...mapGetters({
        employee: 'employee',
      }),
    },
    beforeRouteEnter(to, from, next) {
      $cookies.get('local_login') ? next({
        name: 'home'
      }) : next()
    },
  }
</script>

<style>

</style>