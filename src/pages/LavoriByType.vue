<script>
import { store } from '@/store/store';
import axios from 'axios';
import Loading from '@/partials/Loading.vue';

export default{
    name: 'lavoriByType',
    components:{
        Loading
    },
    data(){
        return{
            isLoading : true,
            typeName : '',
            items : [],
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'list-by-type/' + slug)
                .then(resp =>{
                    this.isLoading = false;
                    if(resp.data.success){
                        this.typeName = resp.data.type.name
                        this.items = resp.data.type.items
                        console.log(this.typeName)
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
    <div v-if="isLoading">
        <Loading/>
    </div>
    <div v-else>
        <h1>TECNOLOGIA: {{ typeName }}</h1>
        <h5>Lavori:</h5>
        <ul>
            <li v-for="item in items">{{ item.title }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
</style>