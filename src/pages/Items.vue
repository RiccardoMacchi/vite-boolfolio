<script>
import axios from 'axios';
import { store } from '@/store/store';
import Loading from '../partials/Loading.vue';
import { personalBadge } from '@/utilis/utils';

export default{
    name: 'items',
    components:{
        Loading,
    },
    data(){
        return{
            items: [],
            technologies: [],
            types: [],
            paginatorLink: [],
            isLoading: true,
        };
    },

    methods:{
        getApi(urlApi, type = 'items'){
            this.isLoading= true;
            axios.get(urlApi)
            .then(response =>{
                    if(type === 'items'){
                        this.isLoading= false;
                        this.items = response.data.data.data
                        this.paginatorLink = response.data.data.links
                        console.log(this.items)
                    } else{
                        this[type] = response.data
                        console.log(this[type])

                        // start della funzione personalBadge
                        if (type === 'technologies' || type === 'types') {
                        this.$nextTick(() => {
                            personalBadge();
                        })
                    }
                    }
                })
            .catch(error =>{
                console.log(error)
            }) 
        },
    },
    mounted(){
        this.getApi(store.urlApi + 'items','items');
        this.getApi(store.urlApi + 'types','types');
        this.getApi(store.urlApi + 'technologies','technologies');
    }
}
</script>

<template>
    <h2>ITEMS</h2>
    <div class="wrapper">
        <div class="wrapper_item">
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                <ul v-else>
                    <li v-for="item in items">
                        <router-link :to="{name:'itemsDetails', params:{'slug' : item.slug}}">{{ item.title }}</router-link>
                    </li>
                </ul>
            <div class="paginator_btn">
                <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url"></button>
            </div>
        </div>
        <!-- Tech and types -->
         <div class="wrapper_cath">
             <div>
                <h4>Tecnologie:</h4>
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                 <span v-else v-for="tech in technologies.technologies">
                    <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                </span>
             </div>
             <div>
                <h4>Tipi:</h4>
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                 <span v-else v-for="type in types.types">
                    <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
                 </span>
             </div>
         </div>
    </div>
</template>

<style lang="scss" scoped>

ul{
    list-style: none;
    li{
        padding-left: 10px;
        line-height: 25px;
    }
}

.wrapper{
    display: flex;
    justify-content: space-between;

    .wrapper_item{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        
        .paginator_btn{
            justify-self: flex-end;
        }
    }


    .wrapper_cath{
        display: flex;
        gap: 20px;

        div{
            max-width: 100px;

            button{
                display: block;
                width: 100%;
            }
        }
    }

}

.badge{
    width: 100%;
}

</style>
