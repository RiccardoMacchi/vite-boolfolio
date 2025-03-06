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
            playerSymbol: '',
            computerSymbol: '',
            select: true,
            errorChose: false,
            playerWin: false,
            computerWin: false,
            imThinking: false,
            firstMove: false,
            thoughts: [
                'Sto pensando...',
                "Umh... Fammi vedere un po'!",
                'Bella mossa! Provo così'
            ]
        }
    },
    methods:{
        wirteOn(row, column){
            console.log(row, column)
            if(this.playerSymbol === ''){
                this.errorChose = true
            }
            if(this.board[row][column] === '' && !this.computerWin && !this.playerWin && !this.imThinking){
                this.board[row][column] = this.playerSymbol
                this.checkWin()
                // console.log(this.board.length)
                this.firstMove = true
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
                if(!allFilled && !this.playerWin && !this.computerWin){
                    do {
                        let randomRow = Math.floor(Math.random() * this.board.length)
                        let randomColumn = Math.floor(Math.random() * this.board.length)
                        // console.log(randomRow, randomColumn)
                        if(this.board[randomRow][randomColumn] === ''){
                            this.imThinking = true
                            setTimeout(() => {
                                this.board[randomRow][randomColumn] = this.computerSymbol
                                this.imThinking = false
                                this.checkWin()
                            }, 1000);
                            break
                        }
                        
                    } while (true);
                }
            }
        },
        restart(){
            this.playerSymbol = ''
            this.computerSymbol = ''
            this.select = true
            this.errorChose = false
            this.playerWin = false
            this.computerWin = false
            this.board = [
                ['','','',],
                ['','','',],
                ['','','',],
            ]
        },
        checkWin(){
            if(this.playerSymbol !== ''){
                for (let r = 0; r < this.board.length; r++) {
                    if(this.board[r][0] === this.playerSymbol && this.board[r][1] === this.playerSymbol && this.board[r][2] === this.playerSymbol){
                        this.playerWin = true
                    }
                    if(this.board[r][0] === this.computerSymbol && this.board[r][1] === this.computerSymbol && this.board[r][2] === this.computerSymbol){
                        this.computerWin = true
                    }
                }
                for (let c = 0; c < this.board.length; c++) {
                    if(this.board[0][c] === this.playerSymbol && this.board[1][c] === this.playerSymbol && this.board[2][c] === this.playerSymbol){
                        this.playerWin = true
                    }
                    if(this.board[0][c] === this.computerSymbol && this.board[1][c] === this.computerSymbol && this.board[2][c] === this.computerSymbol){
                        this.computerWin = true
                    }
                }
                if(this.board[0][0] === this.playerSymbol && this.board[1][1] === this.playerSymbol && this.board[2][2] === this.playerSymbol){
                    this.playerWin = true
                }
                if(this.board[0][2] === this.playerSymbol && this.board[1][1] === this.playerSymbol && this.board[2][0] === this.playerSymbol){
                    this.playerWin = true
                }
    
                if(this.board[0][0] === this.computerSymbol && this.board[1][1] === this.computerSymbol && this.board[2][2] === this.computerSymbol){
                    this.computerWin = true
                }
                if(this.board[0][2] === this.computerSymbol && this.board[1][1] === this.computerSymbol && this.board[2][0] === this.computerSymbol){
                    this.computerWin = true
                }
            }
        },
        // Schemi vincenti sono: 
        // 00 01 02 | 10 11 12 | 20 21 22   righe
        // 00 10 20 | 01 11 21 | 02 12 22   colonne
        // 00 11 22 | 02 11 20            traverse
        chooseSymbol(symbol){
            this.playerSymbol = symbol
            if(symbol === 'X'){
                this.computerSymbol = 'O'
            } else{
                this.computerSymbol = 'X'
            }
            this.select = false
        }
    }
}
</script>

<template>
    <div>
        <h3>Facciamo una partita per rompere il ghiaccio!?</h3>
    </div>
    <div class="header-tris">
        <div v-if="playerWin">
            <h2>Complimenti! Hai vinto!!</h2>
        </div>
        <div v-if="computerWin">
            <h2>Questa volta ho vinto io!</h2>
        </div>
        <div v-if="select">
            <h2>Scegli tra:</h2>
            <div class="select-symbol">
                <span class="x" @click="chooseSymbol('X')">X</span>
                <span class="o" @click="chooseSymbol('O')">O</span>
            </div>
            <div v-if="errorChose">
                <small>Seleziona uno dei due simboli!</small>
            </div>
        </div>
        <div v-else-if="!select && !computerWin && !playerWin && !firstMove">
            <h2>Fai la prima mossa</h2>
        </div>
        <div v-else-if="!computerWin && !playerWin">
            <h2>Giochiamo!!</h2>
        </div>
    </div>
    <div class="board">
        <div class="row" v-for="(row, r) in board">
            <!-- {{ i }} -->
            <div class="single" :class="[ 
            r === 1 && c === 1 ? 'core' : '',
            r === 0 && c === 1 ? 'top-bottom' : '',
            r === 2 && c === 1 ? 'top-bottom' : '',
            r === 1 && c === 0 ? 'left-right' : '',
            r === 1 && c === 2 ? 'left-right' : ''
            ]"
            @click="wirteOn(r,c)" v-for="(single, c) in row">
                <span :class="single === 'X' ? 'x' : single === 'O' ? 'o' : ''">{{ single }}</span>
            </div>
        </div>
    </div>
    <div class="think" v-if="imThinking && !computerWin && !playerWin">
        <span>{{ thoughts[Math.floor(Math.random() * thoughts.length)] }}</span>
    </div>
    <div class="play-again" v-if="computerWin || playerWin">
        <div v-if="playerWin">
            <span>Grande!! Questa volta hai vinto tu!</span>
        </div>
        <div v-else>
            <span>Mi dispaice! Ho vinto io! Facciamo un altra partita?</span>
        </div>
        <div class="btn">
            <span @click="restart()">Gioca di nuovo</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-tris{
    h2{
        margin-top: 10px;
    }
    .select-symbol{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin: 15px auto;
        span{
            padding: 8px 25px;
            border-radius: 8px;
        }
    }
}

.board{
    margin: 20px auto;
    .row{
        display: flex;
        justify-content: center;
        // gap: 2px;
        // margin-bottom: 2px;
        .single{
            position: relative;
            height: 100px;
            aspect-ratio: 1/1;
            &.core{
                border: 2px solid grey;
            }
            &.top-bottom{
                border-left: 2px solid grey;
                border-right: 2px solid grey;
            }
            &.left-right{
                border-top: 2px solid grey;
                border-bottom: 2px solid grey;
            }
    
            span{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                padding: 7px 10px;
                border-radius: 10px;
            }
        }
    }
}

.play-again{
    .btn{
        margin: 20px auto;
        span{
            border-radius: 8px;
            padding: 8px 20px;
        }
    }
}

@media screen and (max-width:540px){
    .board{
    .row{
        .single{
            height: 70px;
        }
    }
}
}
</style>