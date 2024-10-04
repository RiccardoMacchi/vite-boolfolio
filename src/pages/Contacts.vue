<script>
export default{
    name: 'home'
}

</script>

<template>
    <div>
        <h1>CONTATTI</h1>
        <form action="">
            <div>
                <label for="">Nome</label>
                <input type="text" name="subject" id="">
            </div>
            <div>
                <label for="">Email</label>
                <input type="email" name="email" id="">
            </div>
            <div>
                <label for="">Messaggio</label>
                <textarea name="message" rows="10" id=""></textarea>
            </div>
            <button>INVIA</button>
        </form>
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
    }
}
</style>