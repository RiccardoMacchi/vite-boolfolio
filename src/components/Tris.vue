<script>
export default{
    name: 'Tris',
    data(){
        return{
            board: [
                ['','','',],
                ['','','',],
                ['','','',],
            ],
            playerSimbol: '',
            computerSimbol: '',
            select: true,
            errorChose: false,
            // allFilled: false
        }
    },
    methods:{
        wirteOn(row, column){
            console.log(row, column)
            if(this.playerSimbol === ''){
                this.errorChose = true
            }
            if(this.board[row][column] == ''){
                this.board[row][column] = this.playerSimbol
                // console.log(this.board.length)
                let allFilled = true;
                for (let r = 0; r < this.board.length; r++) {
                    for (let c = 0; c < this.board.length; c++) {
                        if(this.board[r][c] === ''){
                            allFilled = false
                            break
                        }
                    }
                    if (!allFilled) break
                }
                if(!allFilled){
                    do {
                        let randomRow = Math.floor(Math.random() * this.board.length)
                        let randomColumn = Math.floor(Math.random() * this.board.length)
                        console.log(randomRow, randomColumn)
                        if(this.board[randomRow][randomColumn] === ''){
                            this.board[randomRow][randomColumn] = this.computerSimbol
                            break
                        }
                        
                    } while (true);
                }
            }
        },
        choseSimbol(simbol){
            this.playerSimbol = simbol
            if(simbol === 'X'){
                this.computerSimbol = 'O'
            } else{
                this.computerSimbol = 'X'
            }
            this.select = false
        }
    }
}
</script>

<template>
    <div v-if="select">
        <h2>Scegli tra:</h2>
        <span @click="choseSimbol('X')">X</span>
        <span @click="choseSimbol('O')">O</span>
        <div v-if="errorChose">
            <small>Seleziona uno dei due simboli!</small>
        </div>
    </div>
    <div v-else>
        <h2>Fai la prima mossa</h2>
    </div>
    <div>
        <div class="row" v-for="(row, r) in board">
            <!-- {{ i }} -->
            <div class="single" :class="single === '' ? 'empty' : 'compiled'" @click="wirteOn(r,i)" v-for="(single, i) in row">
                <span>{{ single }}</span>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.row{
    display: flex;
    justify-content: center;
    gap: 2px;
    margin-bottom: 2px;
    .single{
        position: relative;
        height: 50px;
        aspect-ratio: 1/1;
        &.empty{
            background-color: grey;
        }
        &.compiled{
            background-color: green;
        }
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
}
</style>