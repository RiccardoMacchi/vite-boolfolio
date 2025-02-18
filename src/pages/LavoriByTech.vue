<script>
import Loading from '@/partials/Loading.vue';
import { store } from '@/store/store';
import axios from 'axios';
import { personalBadge } from '@/utilis/utils';



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
            baseUrl: store.baseUrl
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
                    this.$nextTick(() => {
                            personalBadge();
                        });
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
        <div class="title-name">
            <a class="badge badge-type bigger-badge">{{ technologyName }}</a>
        </div>
        <h2>Lavori dispoibili: {{ items.length }}</h2>
        <div class="wrapper-cards">
            <router-link v-for="item in items" :to="{name:'itemsDetails', params:{'slug' : item.slug}}" class="card">
                <div class="div-card">
                    <h4>{{ item.title }}</h4>
                    <div class="thumb">
                        <img :src="baseUrl + item.img_path" :alt="item.title">
                    </div>
                    <div class="description">
                        <p>{{ item.short_description }}</p>
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
    </div>
</template>

<style lang="scss" scoped>
.title-name{
    text-align: center;
    margin: 10px auto;
}

h2{
    text-align: right;
    font-size: 1rem;
}
</style>