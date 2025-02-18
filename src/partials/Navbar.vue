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
                <div class="img-logo">
                    <router-link :to="{name:'home'}">
                        <img v-if="lightTheme" src="/rem-logo-light.png" alt="Home">
                        <img v-else src="/rem-logo-dark.png" alt="Home">
                    </router-link>
                </div>
                <div class="menu">
                    <router-link :to="{name:'items'}">
                        <span class="route-tb">Progetti</span>
                        <i class="fa-solid fa-briefcase route-mb"></i>
                    </router-link>
                </div>
                <div class="menu">
                    <router-link :to="{name:'contacts'}">
                        <span class="route-tb">Contatti</span>
                        <i class="fa-solid fa-envelope route-mb"></i>
                    </router-link>
                </div>    
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
            align-items: stretch;
            gap: 10px;
            height: 80px;
            .img-logo{
                width: 70px;
                img{
                    width: 100%;
                }
            }
            .menu {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex: 1;
                a {
                    padding: 0 10px;
                    transition: color 0.3s ease;
                    .route-mb{
                        display: none;
                    }
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

@media screen and (max-width:580px){
    header{
        .my_navbar{
            .wrap-menu{
                gap: 20px;
                .menu {
                    a {
                        .route-mb{
                            display: inline-block;
                            font-size: 1.4rem;
                        }
                        .route-tb{
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>