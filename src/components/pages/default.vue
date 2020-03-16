<template>
    <div class="main-content flex-1 bg-gray-100 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="w-full"> 

      </div>
    </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
  },
}
</script>