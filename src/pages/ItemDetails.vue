<script>
import Loading from '@/partials/Loading.vue';
import { store } from '@/store/store';
import axios from 'axios';

export default{
    name: 'itemsDetails',
    components:{
        Loading
    },
    data(){
        return{
            item: [],
            isLoading : true,
        }
    },
    methods:{
        getApi(slug){
            axios.get(store.urlApi + 'item-by-slug/' + slug)
                .then(response =>{
                    this.isLoading = false
                    this.item = response.data.item
                    console.log(response.data.item)
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
        <h1>Dettaglio di: {{ item.title }}</h1>
        <h5>{{ item.lenguages }}</h5>
        <img :src="item.img_path" alt="">
        <div v-if="item.technologies.length > 0">
            <h4>Tecnologie:</h4>
            <span class="badge badge-tech" v-for="tech in item.technologies">{{ tech.name }}</span>
        </div>
        <div>
            <h4>Dipendenze:</h4>
            <span class="badge badge-type">{{ item.type.name }}</span>
        </div>
        <h5>Dettagli:</h5>
        <p>
            {{ item.description }}
        </p>
    </div>
</template>

<style lang="scss" scoped>

</style>