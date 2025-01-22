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
  padding: 70px 0;
  max-width: 900px;
  margin: 0 auto;
}

@media screen and (max-width:780px) {
  .container{
  margin: 0px 10px;
}
}
</style>
