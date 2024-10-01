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
  <router-view></router-view>
</template>

<style lang="scss" scoped>

</style>
