<script>
import { store } from '@/store/store';
import axios from 'axios';

export default{
    name: 'lavoriByTech',
    data(){
        return{
            technologyName : '',
            items : [],
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'list-by-technology/' + slug)
                .then(resp =>{
                    this.technologyName = resp.data.technology.name
                    this.items = resp.data.technology.items
                    console.log(this.technologyName)
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
    <div>
        <h1>TECNOLOGIA: {{ technologyName }}</h1>
        <h5>Lavori:</h5>
        <ul>
            <li v-for="item in items">{{ item.title }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
</style>