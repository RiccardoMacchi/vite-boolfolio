<script>
export default{
    name: 'navbar',
    data(){
        return{
            lightTheme : false,
        }
    },
    methods:{
        toggleTheme(){
            const body = document.body
            console.log('hai cliccato')
            if(body.classList.contains('dark-theme')){
                body.classList.replace('dark-theme','light-theme')
                this.lightTheme = true
            }else{
                body.classList.replace('light-theme','dark-theme')
                this.lightTheme = false
            }
        },
        startTheme(){
            const body = document.body
            body.classList.add('dark-theme')
            console.log()
        }
    },
    mounted(){
        this.startTheme()
    }
}

</script>

<template>
    <header>
        <nav class="my_navbar">
            <ul>
                <li>
                    <router-link :to="{name:'home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{name:'items'}">Lavori</router-link>
                </li>
                <li>
                    <router-link :to="{name:'contacts'}">Contatti</router-link>
                </li>
            </ul>
            <div>
                <span id="toggle_theme" @click="toggleTheme()">
                    <i v-if="lightTheme" class="fa-solid fa-sun"></i>
                    <i v-else class="fa-solid fa-moon"></i>
                </span>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>

header{
    
    .my_navbar{
        max-width: 1080px;
        margin: 0 auto;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        ul{
            list-style: none;
            li{
                display: inline-block;
                padding-left: 10px;
            }
        }

        i{
            font-size: 1.8rem;
        }

        .fa-solid.fa-sun{
            color: yellow;
        }
        .fa-solid.fa-moon{
            color: grey;
        }
    }
}
</style>