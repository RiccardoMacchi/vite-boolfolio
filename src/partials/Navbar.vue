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
            const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme';
            console.log(userTheme);
            body.classList.add(userTheme)
            this.lightTheme = userTheme === 'light-theme';
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
            <div class="wrap-menu">
                <router-link :to="{name:'home'}" class="img-logo">
                    <img v-if="lightTheme" src="/rem-logo-light.png" alt="Home">
                    <img v-else src="/rem-logo-dark.png" alt="Home">
                </router-link>
                <ul>
                    <li>
                        <router-link :to="{name:'items'}">Lavori</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'contacts'}">Contatti</router-link>
                    </li>
                </ul>
            </div>
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
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    // background-color: black;
    z-index: 1000;
    .my_navbar{
        font-size: 1.6rem;
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .wrap-menu{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img-logo{
                width: 70px;
                img{
                    width: 100%;
                }
            }
            ul{
                list-style: none;
                li{
                    display: inline-block;
                    padding-left: 10px;
                }
            }
        }

        i{
            font-size: 1.8rem;
        }

        .fa-solid.fa-sun{
            color: #007bff;
        }
        .fa-solid.fa-moon{
            color: grey;
        }
    }
}

@media screen and (max-width:1180px){
    header{
        .my_navbar{
            width: 90%;
            @media screen and (max-width:580px){
                font-size: 1.3rem;
            }
        }
    }
}
</style>