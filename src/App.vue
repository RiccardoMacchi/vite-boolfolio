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
  max-width: 900px;
  padding: 25px;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 10px;
}

@media screen and (max-width:780px) {
  .container{
  margin: 0px 10px;
}
}
</style>
