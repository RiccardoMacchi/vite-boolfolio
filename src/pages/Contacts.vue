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
        <div v-if="!sending && !sentError">
            <div class="sent-mail" v-if="!sent">
                <h2>CONTATTAMI</h2>
                <div class="wrap-contact-img">
                    <img src="/public/work-together-2.png" alt="">
                </div>
                <p>Hai domande, proposte o vuoi collaborare con me? Compila il modulo qui sotto e scrivimi! Sarò felice di risponderti al più presto.</p>
                <form action="#" @submit.prevent="sendEmail()">
                    <div>
                        <label for="">Nome società o progetto:</label>
                        <input type="text" name="subject" id="name" v-model="name" placeholder="Inserisci qui il nome della società/progetto">
                        <small class="error">{{ errors.name?.toString() }}</small>
                    </div>
                    <div>
                        <label for="">Email:</label>
                        <input type="email" name="email" id="email" v-model="email" placeholder="Inserisci qui la tua email">
                        <small class="error">{{ errors.email?.toString() }}</small>
                    </div>
                    <div>
                        <label for="">Messaggio</label>
                        <textarea name="message" rows="10" id="message" v-model="message" placeholder="Inserire una breve descrizione del progetto o del ruolo che si stava ricercando"></textarea>
                        <small class="error">{{ errors.message?.toString() }}</small>
                    </div>
                    <div class="btn-actions">
                        <button class="send" type="submit">INVIA</button>
                        <button class="cancel" type="reset">ANNULLA</button>
                    </div>
                </form>
            </div>
            <div v-else class="success-send">
                <h3>MESSAGGIO INVIATO CORRETTAMENTE</h3>
                <p>Grazie per avermi contattato! Ti risponderò al più presto. Nel frattempo, sentiti libero di esplorare il mio portfolio per saperne di più su di me e sui miei progetti.</p>
            </div>
        </div>
        <div v-else-if="!sentError">
            <PlaneLoader/>
        </div>
        <div v-if="sentError" class="error-sent">
            <h2>{{ errorMessage }}</h2>
            <div class="btn">
                <button @click="resetErrors()">RIPROVA</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.wrap-contact-img{
    width: 60%;
    margin: 0 auto;
    img{
        width: 100%;
    }
}
.sent-mail{
    h2{
        text-align: center;
        font-size: 2.5rem;
        margin: 20px auto;
    }
    p{
        margin-bottom: 15px;
    }
}
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

    .btn-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &.send {
      background-color: #28a745;
      &:hover {
        background-color: #218838;
      }
    }

    &.cancel {
      background-color: #dc3545;
      &:hover {
        background-color: #c82333;
      }
    }
  }
}


    
}
.error-sent{
    text-align: center;
    h2{
        color: red;
        margin: 20px auto;
    }
    .btn button{
        padding: 5px 10px;
        background-color: rgb(40, 122, 60);
        border-radius: 5px;
    }
}
.success-send{
    margin-top: 50px;
    text-align: center;
    h3{
        color: green;
        margin: 20px;
    }
}

@media screen and (max-width: 780px){
    .wrap-contact-img{
        width: 80%;
    }
}

@media screen and (max-width: 580px){
    .wrap-contact-img{
        width: 100%;
    }
}
</style>