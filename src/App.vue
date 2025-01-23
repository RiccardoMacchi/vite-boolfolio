<script>
import Navbar from './partials/Navbar.vue';
import Footer from './partials/Footer.vue';


export default{
  components: {
    Navbar,
    Footer,
  }
}
</script>

<template>
  <Navbar/>
  <div class="container">
    <router-view></router-view>
  </div>
  <Footer/>
</template>

<style lang="scss" scoped>
.container{
  padding: 80px 0;
  width: 90%;
  margin: 0 auto;
}
</style>
