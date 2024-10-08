<script>
import { store } from '@/store/store';
import axios from 'axios';
import Loading from '@/partials/Loading.vue';

export default{
    name: 'lavoriByFramework',
    components:{
        Loading
    },
    data(){
        return{
            isLoading : true,
            frameworkName : '',
            items : [],
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'list-by-framework/' + slug)
                .then(resp =>{
                    this.isLoading = false;
                    if(resp.data.success){
                        this.frameworkName = resp.data.framework.name
                        this.items = resp.data.framework.items
                        console.log(this.frameworkName)
                    } else{
                        this.$router.push({ name: '404' })
                    }
                })
                .catch(err =>{
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
        <h1>TECNOLOGIA: {{ frameworkName }}</h1>
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