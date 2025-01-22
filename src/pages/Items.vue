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
            baseUrl: store.baseUrl
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
    <div>
        <h2>I miei Lavori</h2>
        <div class="wrap-img">
            <img src="../../public/my_works.svg" alt="">
        </div>
    </div>
    <div class="wrapp-search">
        <h4>Carca tra tutti i lavori:</h4>
        <div class="search_bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="search" v-model="search">
        </div>
    </div>
    <div class="wrapper">
        <div class="wrapper_item">
                <div id="my_loader" v-if="isLoading">
                    <Loading/>
                </div>
                <div v-else-if="!items.length">
                    <h3>NON CI SONO LAVORI</h3>
                </div>
                <div v-else>
                    <span class="right">Lavori disponibili: {{ items.length }}</span>
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
                                        <i class="fa-solid fa-server"></i>
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
                <span>{{ console.log(paginatorLink) }}</span>
            <div v-if="paginatorLink.length > 3" class="paginator_btn">
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
                    <router-link class="badge badge-framework" :to="{name:'lavoriByFramework', params:{'slug': framework.slug}}" >{{ framework.name }}</router-link>
                 </span>
             </div>
         </div>
    </div>
</template>

<style lang="scss" scoped>

h2{
    font-size: 4rem;
    text-align: center;
    margin: 20px auto;
}
.wrap-img{
    width: 70%;
    margin: 30px auto;
    img{
        width: 100%;
    }
}

span{
    
    &.right{
        text-align: right;
        margin-right: 20px;
        display: block;
    }
}

.wrapp-search{
    h4{
        font-size: 1.7rem;
    }
}

// Cards

.wrapper-cards{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 30px;
        .card{
            flex: 0 0 calc(100% / 2 - 30px);
            .div-card{
                h4{
                    font-size: 2.2rem;
                    margin-bottom: 20px;
                }
                .thumb{
                    width: 60%;
                    margin: 0 auto;
                    img{
                        border-radius: 5px;
                        aspect-ratio: 1/1;
                        object-fit: cover;
                        width: 100%;
                    }
                }

                .description{
                    h5{
                        font-size: 1.2rem;
                    }
                    p{
                        margin: 10px auto;
                    }
                }

                .wrap-item-tech-type{
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    div{
                        display: flex;
                        align-items: center;
                    }
                    .badge{
                        padding: 8px;
                        border-radius: 10px;
                    }
                }
            }
        }
    
}

.wrapper{
    display: flex;

    .wrapper_item{
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        i{
            color: rgb(219, 240, 177);
            padding: 5px;
            background: #3d3d3d;
            border-radius: 5px;
            margin-right: 5px;
        }

        span{
            a{
                width: auto;
                margin-right: 8px;
            }
        }
        
        .paginator_btn{
            justify-self: flex-end;
        }

        h3{
            color: red;
            margin: 20px auto;
            text-align: center;
        }
    }


    .wrapper_cath{
        margin-left: 15px;
        h4{
            font-size: 1.2rem;
        }
        div{
            margin-bottom: 15px;
            max-width: 100px;
        }
    }

}

.search_bar {
    margin: 10px 0px;
    position: relative;
    width: 85%;
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
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    }

}

</style>
