<script>
import Loading from '@/partials/Loading.vue';
import { store } from '@/store/store';
import { personalBadge } from '@/utilis/utils';
import axios from 'axios';

export default{
    name: 'home',
    components:{
        Loading
    },
    data(){
        return{
            types : [],
            frameworks: [],
            items: [],
            baseUrl: store.baseUrl,
            isLoading: true,
        }
    },
    methods:{
        getApi(url){
            axios.get(url)
                .then(resp=>{
                    console.log(resp.data)
                    if(!this.types.length){
                        this.types = resp.data.types
                    }
                    this.frameworks = resp.data.frameworks
                    
                    setTimeout(() => {
                        this.$nextTick(() => {
                            personalBadge();
                            this.isLoading = false
                            })
                    }, 500);
                })
        },
        getLastItems(){
            axios.get(store.urlApi + 'items')
                .then(resp=>{
                    console.log(resp.data.data.data)
                    this.items = resp.data.data.data
                })
            
        }
    },
    mounted(){
        this.getApi(store.urlApi + 'types')
        this.getApi(store.urlApi + 'frameworks')
        this.getLastItems()

    }
}

</script>

<template>
    <div id="my_loader" v-if="isLoading">
        <Loading/>
    </div>
    <div v-else>
        <div class="wrapper-home-top">

            <div class="header-welcome">
                <div class="wrap-info-profile">
                    <div class="wrap-img-profile">
                        <img src="/public/profile-img.jpg" alt="">
                    </div>
                    <div class="info-profile">
                        <span>FULL STACK DEVELOPER</span>
                        <h2>Riccardo Macchi</h2>
                        <span>Sono un FullStack developer Junior, esplora i miei progetti ed esperienze!</span>
                        <div class="btns">
                            <!-- <span class="btn info-profile">
                                Su di me
                            </span> -->
                            <router-link :to="{name:'items'}" class="btn info-projects">
                                I miei progetti
                            </router-link>
                        </div>              
                        <!-- <p>
                            Ciao, sono Riccardo Macchi, sviluppatore FullStack. La mia missione è trasformare idee in soluzioni digitali innovative e su misura. Esplora il mio portfolio per scoprire i miei lavori e le mie competenze!
                        </p> -->
                    </div>
                </div>
                <div class="wrap-second-img-welcome">
                    <img src="/welcome_portfolio.png" alt="">
                </div>
            </div>
        </div>
        <h2 id="sub-title">I miei progetti piu recenti:</h2>
        <div class="wrapper-home-bottom">
            <div class="skills-wrapper">
                <h3>Competenze:</h3>
                <div class="my_skills">
                    <router-link class="badge badge-type" v-for="type in types" :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
                </div>
                <div class="my_skills">
                    <router-link class="badge badge-framework" v-for="framework in frameworks" :to="{name:'lavoriByFramework', params:{'slug': framework.slug}}">{{ framework.name }}</router-link>
                </div>
                <p>Scopri tutti i lavori suddivisi per competenza! <i class="fa-solid fa-arrow-up"></i></p>
            </div>
            <div class="last-projects">
                <router-link v-for="item in items" :to="{name:'itemsDetails', params:{'slug' : item.slug}}" class="card">
                    <div class="div-card">
                        <h3>{{ item.title }}</h3>
                        <div class="thumb-home">
                            <img :src="baseUrl + item.img_path" :alt="item.title">
                        </div>
                        <!-- div descrizonale -->
                        <div class="wrap-item-tech-type">
                            <div>
                                <div class="icons">
                                    <i class="fa-solid fa-code"></i>
                                </div>
                                <span v-if="item.technologies.length === 0">
                                    <a class="badge badge-tech">NESSUNA TECNOLOGIA</a>
                                </span>
                                <span v-else v-for="tech in item.technologies">
                                    <router-link class="badge badge-tech" :to="{name:'lavoriByTech', params:{'slug' : tech.slug}}">{{ tech.name }}</router-link>
                                </span>
                            </div>
                            <div>
                                <div class="icons">
                                    <i class="fa-solid fa-microchip"></i>
                                </div>
                                <span>
                                    <router-link class="badge badge-type" :to="{name:'lavoriByType', params:{'slug': item.type.slug}}">{{ item.type.name }}</router-link>
                                </span>
                            </div>
                            <div>
                                <div class="icons">
                                    <i class="fa-solid fa-briefcase"></i>
                                </div>
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
    </div>
</template>

<style lang="scss" scoped>
.wrapper-home-top{
    .header-welcome{
        flex-basis: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
        border-radius: 10px;
        padding: 25px;
        .info-profile{
            text-align: right;
        }
        .wrap-info-profile{
            flex-basis: calc(70% - 20px);
            display: flex;
            align-items: center;
            gap: 20px;
            border-radius: 10px;
            padding: 25px;
        }
        .btns{
            margin-top: 15px;
            text-align: right;
            .btn{
                cursor: pointer;
                display: inline-block;
                padding: 10px 20px;
                border-radius: 8px;
                transition: all 0.3s ease-in-out;
                &:last-child{
                    margin-left: 10px;
                }
            }
        }
        .wrap-img-profile{
            width: 80%;
            margin: 0 auto;
            img{
                border-radius: 50%;
                aspect-ratio: 1/1;
                object-fit: cover;
                object-position: top;
                width: 100%;
                margin: 10px auto;
                &:hover{
                    transform: scale(1.1);
                }
            }
        }
    }
    .wrap-second-img-welcome{
        flex-basis: calc(30% - 20px);
        img{
            width: 100%;
        }
    }
    
}

.wrapper-home-bottom{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    .skills-wrapper{
        position: sticky;
        top: 75px;
        // border: 1px solid white;
        border-radius: 10px;
        padding: 10px;
        flex-basis: 30%;
        h3{
            font-size: 1.5rem;
        }
        .my_skills{
            a{
                display: block;
                margin: 5px auto;
                &.badge{
                    border-radius: 50px;
                }
            }
        }
    }

    .last-projects{
        display: flex;
        align-items: stretch;
        flex-grow: 1;
        gap: 10px;

        h3{
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        a{
            &:hover{
                transform: scale(1.1);
            }
        }
        .thumb-home{
            width: 100%;
            img{
                border-radius: 5px;
                aspect-ratio: 1/1;
                object-fit: cover;
                width: 100%;

            }
        }
        .wrap-item-tech-type{
            .icons{
                display: inline-block;
                text-align: center;
                width: 25px;
                margin-right: 5px;
            }
            span{
                margin-right: 10px;
                &:last-child{
                    margin-right: 0px;
                }
            }
        }
        .div-card{
            padding: 20px;
        }
    }
}

#sub-title{
    font-size: 2rem;
    margin-bottom: 10px;
}

@media screen and (max-width:1180px){
    .wrapper-home-bottom{
        .last-projects{
            flex-wrap: wrap;

            a{
                flex-basis: calc(50% - 10px);
            }
        }
    }

}

@media screen and (max-width: 780px) {
    .wrapper-home-top{
        .header-welcome{
            display: block;
        }
        .wrap-second-img-welcome{
            display: none;
        }
    }

    .wrapper-home-bottom{
        .last-projects{
            flex-wrap: wrap;
    
            a{
                flex-basis: 100%;
            }
        }
        .skills-wrapper{
            .my_skills {
                gap: 40px;
                a {
                    flex: 0 0 calc(100% / 2 - 100px);
                }
            }
        }
    }
}

@media screen and (max-width: 580px){
    .wrapper-home-top{
        .header-welcome{
            text-align: center;
            
            h1{
                font-size: 3.5rem;
            }
            p{
                font-size: 1.2rem;
            }
            .wrap-info-profile{
                display: block;
                .wrap-img-welcome{
                    width: 50%;
                    }
                }
            }
            .skills-wrapper{
                h3{
                    font-size: 2.5rem;
                }
                .my_skills {
                    gap: 20px;
            }
        }
    }
    .wrapper-home-bottom{
        display: block;
        .skills-wrapper{
            display: none;
        }
    }
    #sub-title{
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
}
</style>