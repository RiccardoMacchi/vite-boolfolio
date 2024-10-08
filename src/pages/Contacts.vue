<script>
import { store } from '@/store/store';
import axios from 'axios';
import PlaneLoader from '@/partials/PlaneLoader.vue';

export default{
    name: 'home',
    components:{
        PlaneLoader,
    },
    data(){
        return{
            name : '',
            email: '',
            message: '',
            errors:{
                name: [],
                email: [],
                message: [],
            },
            sending: false,
            sent: false,
            sentError: false,
            errorMessage: '',
        }
    },
    methods:{
        sendEmail(){
            this.sending = true;
            const data = {
                name : this.name,
                email : this.email,
                message : this.message
            }
            console.log(data)
            axios.post(store.urlApi + 'send-email', data)
                .then( resp =>{
                    console.log(resp.data)
                    this.sending = false;
                    if(!resp.data.success){
                        this.errors = resp.data.errors
                    } else{
                        this.sent = true;
                        this.errors = {
                            name: [],
                            email: [],
                            message: [],
                        }
                    }
                })
                .catch( er =>{
                    this.sending = false;
                    this.errorMessage = er.message
                    this.sentError = true;
                    console.log(er.message)
                })
        },
        resetErrors(){
            this.errorMessage = '';
            this.sentError = false;
        }
    }
}


</script>

<template>
    <div>
        <h1>CONTATTI</h1>
        <div v-if="!sending && !sentError">
            <form action="#" @submit.prevent="sendEmail()" v-if="!sent">
                <div>
                    <label for="">Nome</label>
                    <input type="text" name="subject" id="name" v-model="name">
                    <small class="error">{{ errors.name?.toString() }}</small>
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="email" id="email" v-model="email">
                    <small class="error">{{ errors.email?.toString() }}</small>
                </div>
                <div>
                    <label for="">Messaggio</label>
                    <textarea name="message" rows="10" id="message" v-model="message"></textarea>
                    <small class="error">{{ errors.message?.toString() }}</small>
                </div>
                <button type="submit">INVIA</button>
                <button type="reset">ANNULLA</button>
            </form>
            <div v-else>
                <h3>MESSAGGIO INVIATO CORRETTAMENTE</h3>
            </div>
        </div>
        <div v-else-if="!sentError">
            <PlaneLoader/>
        </div>
        <div v-if="sentError">
            <h2>{{ errorMessage }}</h2>
            <button @click="resetErrors()">RIPROVA</button>
        </div>
    </div>

</template>

<style lang="scss" scoped>
form{
    label{
        display: inline-block;
        margin-bottom: 5px;
        margin-top: 10px;
    }
    input,
    textarea{
        width: 100%;
        border-radius: 5px;
        padding: 8px;
    }
    .error{
        color: red;
    }
}
</style>