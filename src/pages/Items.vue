<script>
import axios from 'axios';
import { store } from '@/store/store';

export default{
    name: 'items',
    data(){
        return{
            items: [],
        };
    },

    methods:{
        getApi(){
            axios.get(store.urlApi + 'items')
                .then(response =>{
                    this.items = response.data.data.data
                    console.log(this.items)
                })
            
        }
    },
    mounted(){
        this.getApi();
    }
}
</script>

<template>
    <h1>ITEMS</h1>
    <div>
        <ul>
            <li v-for="item in items"> {{ item.title }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>
