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
            frameworks: [],
            types: [],
            paginatorLink: [],
            search: '',
            isLoading: true,
        };
    },
    watch: {
        search(newSearch) {
            this.getApi(store.urlApi + 'items', 'items', newSearch);
        }
    },
    methods:{
        getApi(urlApi, type = 'items', search = ''){
            this.isLoading= true;
            console.log('ingresso chiamata api')
            if (search) {
                urlApi += `?search=${search}`;
                console.log('aggiunta search')
            }
            axios.get(urlApi)
            .then(response =>{
                console.log('chiamta:', urlApi)
                    if(type === 'items'){
                        this.isLoading= false;
                        this.items = response.data.data.data
                        this.paginatorLink = response.data.data.links
                        console.log(this.items)
                        this.$nextTick(() => {
                            personalBadge();
                        });
                    } else{
                        this[type] = response.data
                        console.log(this[type])

                        // start della funzione personalBadge
                        // if (type === 'technologies' || type === 'types') {
                        this.$nextTick(() => {
                            personalBadge();
                        })
                    // }
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
        this.getApi(store.urlApi + 'frameworks','frameworks');

    }
}
</script>

<template>
    <h2>ITEMS</h2>
    <div class="search_bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" v-model="search" @keypress="getApi()">
    </div>
    <div class="wrapper">
        <div class="wrapper_item">
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                <div v-else-if="!items.length">
                    <h3>NON CI SONO LAVORI</h3>
                </div>
                <ul v-else>
                    <li v-for="item in items">
                        <router-link :to="{name:'itemsDetails', params:{'slug' : item.slug}}">{{ item.title }}</router-link>
                        <!-- Small descrizonale -->
                        <small>
                            <h6>Teconologie usate:</h6>
                            <span v-if="item.technologies.length === 0">
                                <a class="badge badge-tech">NESSUNA TECNOLOGIA</a>
                            </span>
                            <span v-else v-for="tech in item.technologies">
                                <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                            </span>
                        </small>
                        <small>
                            <h6>Tipologia:</h6>
                            <span>
                                <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': item.type.slug}}">{{ item.type.name }}</router-link>
                            </span>
                        </small>
                        <small>
                            <h6>Freamworks usati:</h6>
                            <span v-if="item.frameworks.length === 0">
                                <a class="badge badge-framework">NESSUN FRAMEWORK</a>
                            </span>
                            <span v-else v-for="framework in item.frameworks">
                                <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': framework.slug}}">{{ framework.name }}</router-link>
                            </span>
                        </small>
                        
                    </li>
                </ul>
            <div v-if="items.length" class="paginator_btn">
                <button v-for="link in paginatorLink" v-html="link.label" @click="getApi(link.url)" :disabled="link.active || !link.url"></button>
            </div>
        </div>
        <!-- Tech types frame -->
         <div class="wrapper_cath">
             <!-- Tipi -->
             <div>
                <h4>Tipi:</h4>
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                 <span v-else v-for="type in types.types">
                    <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
                 </span>
             </div>
            <!-- Teconolgie -->
             <div>
                <h4>Tecnologie:</h4>
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                <span v-else v-for="tech in technologies.technologies">
                    <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                </span>
             </div>
             <!-- framework e Librerie -->
             <div>
                <h4>Frameworks:</h4>
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                 <span v-else v-for="framework in frameworks.frameworks">
                    <a class="badge badge-framework">{{ framework.name }}</a>
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
        border-radius: 10px;
        border: 1px solid grey;
        margin: 5px;
        &:hover{
            background-color: rgba(82, 82, 82, 0.7);
        }
    }
}

.wrapper{
    display: flex;

    .wrapper_item{
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        small{
            display: block;
            padding-left: 15px;
            h6{
                display: inline-block;
                margin-right: 4px
            }
            span{
                a{
                    width: auto;
                    margin-right: 8px;
                }
            }
        }
        
        .paginator_btn{
            justify-self: flex-end;
        }

        h3{
            color: red;
            margin: 20px auto;
        }
    }


    .wrapper_cath{
        display: flex;
        gap: 20px;

        div{
            max-width: 100px;
        }
    }

}

.search_bar {
    margin: 10px 0px;
    position: relative;
    width: 70%;
    input {
        width: 100%;
        padding: 10px 20px 10px 40px;
        border: 1px solid white;
        border-radius: 5px;
        box-sizing: border-box;
    }
    i {
        position: absolute; 
        top: 50%;
        left: 10px;
        transform: translateY(-50%); 
        color: black;
        pointer-events: none; 
    }
}



.badge{
    width: 100%;
}

@media screen and (max-width:578px) {
    .search_bar{
        width: 100%;
    }
    .wrapper{
        flex-direction: column-reverse;
    .wrapper_cath{
        justify-content: center;
    }
    }

}

</style>
