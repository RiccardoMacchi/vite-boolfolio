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
            isLoading: true,
        }
    },
    methods:{
        getApi(){
            axios.get(store.urlApi + 'types')
                .then(resp=>{
                    console.log(resp.data)
                    this.types = resp.data.types
                    this.isLoading = false
                    
                    this.$nextTick(() => {
                            personalBadge();
                        })
                })
        }
    },
    mounted(){
        this.getApi()
    }
}

</script>

<template>
    <div id="my_loader" v-if="isLoading">
        <Loading/>
    </div>
    <div v-else>
        <div class="header-welcome">
            <h1>Benvenuto!</h1>
            <div class="wrap-img-welcome">
                <img src="/public/welcome_portfolio.png" alt="">
            </div>
            <p>
                Ciao sono Riccardo Macchi sviluppatore web-app FullStack
            </p>
        </div>
        <div class="skills-wrapper">
            <h3>Le mie competenze:</h3>
            <div class="my_skills">
                <router-link class="badge badge-type" v-for="type in types" :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.header-welcome{
    text-align: center;
    h1{
        font-size: 5rem;
    }
    p{
        font-size: 1.5rem;
    }
    .wrap-img-welcome{
        width: 50%;
        margin: 0 auto;
        img{
            width: 100%;
            &:hover{
                transform: scale(1.1);
            }
        }
    }
}

.skills-wrapper{
    margin: 40px auto;
    h3{
        font-size: 3rem;
    }
    .my_skills{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;
        a{
            flex: 0 0 calc(100% / 4 - 60px);
            padding: 30px 70px;

            &.badge{
                border-radius: 50px;
            }
        }
    }
}

@media screen and (max-width: 780px) {

    .skills-wrapper{

        .my_skills {
            gap: 40px;
            a {
                flex: 0 0 calc(100% / 2 - 100px);
            }
        }
    }
}

@media screen and (max-width: 580px){
    .skills-wrapper{
        .my_skills {
            gap: 20px;
       }
}
}
</style>