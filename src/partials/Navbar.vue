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
        </ul>
    </nav>
</template>

<style lang="scss" scoped>

</style>