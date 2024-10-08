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
    <h1>HOME</h1>
    <p>
        Ciao sono Riccardo Macchi sviluppatore web-app FullStack
    </p>
    <h3>Competenze apprese:</h3>
    <div class="my_skills">
        <a class="badge badge-type" v-for="type in types">
            <router-link :to="{name:'lavoriByType', params:{'slug': type.slug}}">{{ type.name }}</router-link>
        </a>
    </div>
</template>

<style lang="scss" scoped>
.my_skills{
    display: flex;
    justify-content: space-evenly;

}
</style>