<script>
import Loading from '@/partials/Loading.vue';
import { store } from '@/store/store';
import axios from 'axios';
import { personalBadge } from '@/utilis/utils';

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
                    if(response.data.success){
                        this.isLoading = false
                        this.item = response.data.item
                        console.log(response.data.item)
                        // esecuzione funzione dopo 
                        this.$nextTick(() => {
                            personalBadge();
                        })
                    }else{
                        this.$router.push({ name: '404' })
                    }
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
        <h1>Dettaglio di: {{ item.title }}</h1>
        <h5>{{ item.lenguages }}</h5>
        <div v-if="item.technologies.length > 0">
            <h4>Tecnologie:</h4>
            <span v-for="tech in item.technologies">
                <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
            </span>
        </div>
        <div>
            <h4>Dipendenze:</h4>
            <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': item.type.slug}}">{{ item.type.name }}</router-link>
        </div>
        <img :src="item.img_path" :alt="item.title">
        <h5>Dettagli:</h5>
        <p>
            {{ item.description }}
        </p>
        <div class="my_btn">
            <a class="btn_git" :href="item.git_link" target="_blank">VAI A GIT</a>
            <a class="btn_project" v-if="item.project_link" :href="item.project_link" target="_blank">VAI AL PROGETTO</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
a.badge{
    margin-right: 10px;
}

img{
    width: 100%;
    border-radius: 5px;
}
.my_btn{
    margin: 15px auto;
    text-align: center;
    .btn_git{
        padding: 5px 20px;
        background-color: blue;
        border-radius: 5px;
    }
    .btn_project{
        margin-left: 20px;
        padding: 5px 20px;
        background-color: green;
        border-radius: 5px;
    }
}
</style>