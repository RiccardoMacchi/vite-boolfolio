<script>
export default{
    name: 'navbar'
}

</script>

<template>
    <nav>
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
    </nav>
</template>

<style lang="scss" scoped>
    nav{
        margin-left: 50px;
        padding: 20px 0;
        ul{
            list-style: none;
            li{
                display: inline-block;
                padding-left: 10px;
            }
        }
    }
</style>