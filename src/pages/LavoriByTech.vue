<script>
import Loading from '@/partials/Loading.vue';
import { store } from '@/store/store';
import axios from 'axios';


export default{
    name: 'lavoriByTech',
    components:{
        Loading
    },
    data(){
        return{
            isLoading : true,
            technologyName : '',
            items : [],
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'list-by-technology/' + slug)
                .then(resp =>{
                    this.isLoading = false
                    this.technologyName = resp.data.technology.name
                    this.items = resp.data.technology.items
                    console.log(this.technologyName)
                })
                .catch(err =>{
                    this.$router.push({ name: '404' })
                    console.log(err.message)
                })
        }
    },
    mounted(){
        const slug = this.$route.params.slug
        this.getApi(slug)
    }
}
</script>

<template>
    <div id="my_loader" v-if="isLoading">
        <Loading/>
    </div>
    <div v-else>
        <h1>TECNOLOGIA: {{ technologyName }}</h1>
        <h2>Lavori:</h2>
        <ul>
            <router-link v-for="item in items" :to="{name:'itemsDetails', params:{'slug' : item.slug}}">
            <li>
                <h4>{{ item.title }}</h4>
                <p>
                    {{ item.description }}
                </p>
            </li>
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import url(../assets/partials/__listBy.scss);
</style>