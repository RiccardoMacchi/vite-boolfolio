<script>
import Navbar from './partials/Navbar.vue';

export default{
  components: {
    Navbar,
  }
}
</script>

<template>
  <Navbar/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.container{
  max-width: 900px;
  padding: 25px;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 10px;
}
</style>
