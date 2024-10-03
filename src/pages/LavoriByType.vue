<script>
import { store } from '@/store/store';
import axios from 'axios';

export default{
    name: 'lavoriByType',
    data(){
        return{
            typeName : '',
            items : [],
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'list-by-type/' + slug)
                .then(resp =>{
                    if(resp.data.success){
                        this.typeName = resp.data.type.name
                        this.items = resp.data.type.items
                        console.log(this.typeName)
                    } else{
                        this.$router.
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
    <div>
        <h1>TECNOLOGIA: {{ typeName }}</h1>
        <h5>Lavori:</h5>
        <ul>
            <li v-for="item in items">{{ item.title }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
</style>