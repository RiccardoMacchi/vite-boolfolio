<script>
import { store } from '@/store/store';
import axios from 'axios';
import Loading from '@/partials/Loading.vue';
import { personalBadge } from '@/utilis/utils';


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
            baseUrl: store.baseUrl
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
                        this.$nextTick(() => {
                            personalBadge();
                        });
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
        console.log('url', store.urlApi + 'list-by-type/' + slug)
    }
}
</script>

<template>
    <div id="my_loader" v-if="isLoading">
        <Loading/>
    </div>
    <div v-else>
        <h1>TECNOLOGIA: {{ typeName }}</h1>
        <h2>Lavori:</h2>
        <div class="wrapper-cards">
            <router-link v-for="item in items" :to="{name:'itemsDetails', params:{'slug' : item.slug}}" class="card">
                <div class="div-card">
                    <h4>{{ item.title }}</h4>
                    {{console.log(item)}}
                    <div class="thumb">
                        <img :src="baseUrl + item.img_path" :alt="item.title">
                    </div>
                    <div class="description">
                        <h5>Una breve descrizione:</h5>
                        <p>{{ item.description }}</p>
                    </div>
                    <!-- div descrizonale -->
                    <div class="wrap-item-tech-type">
                        <div>
                            <i class="fa-solid fa-code"></i>
                            <span v-if="item.technologies.length === 0">
                                <a class="badge badge-tech">NESSUNA TECNOLOGIA</a>
                            </span>
                            <span v-else v-for="tech in item.technologies">
                                <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                            </span>
                        </div>
                        <div>
                            <i class="fa-solid fa-microchip"></i>
                            <span>
                                <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': item.type.slug}}">{{ item.type.name }}</router-link>
                            </span>
                        </div>
                        <div>
                            <i class="fa-solid fa-briefcase"></i>
                            <span v-if="item.frameworks.length === 0">
                                <a class="badge badge-framework">NESSUN FRAMEWORK</a>
                            </span>
                            <span v-else v-for="framework in item.frameworks">
                                <router-link class="badge badge-type" :to="{name:'lavoriByFramework', params:{'slug': framework.slug}}">{{ framework.name }}</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <div v-if="paginatorLink.length > 3" class="paginator_btn">
            <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url"></button>
        </div> -->
    </div>
</template>


<style lang="scss" scoped>
</style>