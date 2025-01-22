<script>
export default{
    name: 'Footer',
    data(){
        return{
            actualYear: new Date().getFullYear()
        }
    }
}
</script>

<template>
    <footer>
        <h5>{{actualYear}}<i class="fa-regular fa-copyright"></i> Riccardo Macchi</h5>
    </footer>
</template>

<style lang="scss" scoped>
    footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        height: 60px;
        background-color: rgb(0, 0, 0);
        h5{
            line-height: 60px;
        }
    }
</style>