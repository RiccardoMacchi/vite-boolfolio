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
        }
    },
    methods:{
        getApi(){
            axios.get(store.urlApi + 'types')
                .then(resp=>{
                    console.log(resp.data)
                    this.types = resp.data.types

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
    <div class="header-welcome">
        <h1>Benvenuto!</h1>
        <img src="/public/welcome_portfolio.png" alt="">
        <p>
            Ciao sono Riccardo Macchi sviluppatore web-app FullStack
        </p>
    </div>
    <div class="skills-wrapper">
        <h3>Le mie competenze:</h3>
        <div class="my_skills">
            <a class="badge badge-type" v-for="type in types">
                <router-link :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
            </a>
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
    img:hover{
        transform: scale(1.1);
    }
}

.skills-wrapper{
    margin: 40px auto;
    h3{
        font-size: 3rem;
    }
    .my_skills{
        display: flex;
        justify-content: space-evenly;
        margin-top: 30px;

        a{
            padding: 30px;

            &.badge{
                border-radius: 50px;
            }
        }
    }
}
</style>