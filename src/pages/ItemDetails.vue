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
            baseUrl: store.baseUrl
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
        <h2>{{ item.title }}</h2>
        <h5>{{ item.lenguages }}</h5>
        <div class="info">
            <div v-if="item.technologies.length > 0">
                <h4>Tecnologie:</h4>
                <span v-for="tech in item.technologies">
                    <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                </span>
            </div>
            <div v-if="item.frameworks.length > 0">
                <h4>Frameworks:</h4>
                <span v-for="framework in item.frameworks">
                    <router-link class="badge badge-type" :to="{name:'lavoriByFramework', params:{'slug': framework.slug}}">{{ framework.name }}</router-link>
                </span>
            </div>
            <div>
                <h4>Dipendenze:</h4>
                <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': item.type.slug}}">{{ item.type.name }}</router-link>
            </div>
        </div>
        <img :src="baseUrl + item.img_path" :alt="item.title">
        <div class="my_btn">
            <a class="btn_git" :href="item.git_link" target="_blank">VAI A GITHUB</a>
            <a class="btn_project" v-if="item.project_link" :href="item.project_link" target="_blank">VAI AL PROGETTO</a>
        </div>
        <h5>Dettagli:</h5>
        <p>
            {{ item.description }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
h2{
    text-align: center;
    font-size: 3rem;
    margin: 10px auto;
}

a.badge{
    margin-right: 10px;
}

img{
    width: 100%;
    border-radius: 5px;
}

.info{
    margin: 15px auto;
    div{
        margin: 5px auto;
    }

}
.my_btn{
    margin: 15px auto;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    gap: 20px;
    a{
        display: inline-block;
    }
}

// @media screen and (max-width:580px){
//     .my_btn{
//         .btn_git,
//         .btn_project{
//             display: block;
//             width: 50%;
//             margin: 10px auto;
//         }
//     }
// }
</style>