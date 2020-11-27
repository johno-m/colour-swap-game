<template>
    <div class="game-container">
        <div class="game-window" ref="gameWindow" :style="windowStyle">
            <GameSquare v-for="(status, index) in board" :id="`square_${index}`" :active="active" :selected="status ? true : false" :num="index" :key="index" @click.native="handleClick(index)"/>
        </div>
    </div>
</template>
  
<script>
import GameSquare from './GameSquare'
import { store } from '../store'
import { mapGetters } from 'vuex'
import { bus } from '../main'

export default {
    data(){
        return {
            active: true, /** control the user ability to press squares */
            windowWidth: null
        }
    },
    computed: {
        ...mapGetters({
            board: "board",
            game: "game",
            difficulty: "difficulty",
            backupBoard: "backupBoard",
            moveCount: "moveCount"
        }),
        numOfBoxesToRender: function(){
            return this.game.width * this.game.width
        },
        windowStyle: function(){
            return {
                gridTemplateColumns: `repeat(${this.game.width}, 1fr)`,
                height: `${this.windowWidth}px`
            }
        }
    },
    methods: {
        isSelected(){
            return true
        },
        buildGameBoard(){
            let newBoard = []
            for(let i = 0; i < (this.game.width * this.game.width); i++){
                newBoard.push(false)
            }
            store.dispatch('buildBoard', newBoard)
            this.randomiseBoard()
        },
        randomiseBoard(){
            let numOfCComputerClicks = this.game.difficulty + Math.ceil(this.game.width / 2)
            for(let i = 0; i < numOfCComputerClicks; i++){
                setTimeout(() => {
                    let rand = Math.floor(Math.random() * Math.floor(this.numOfBoxesToRender))
                    this.toggleSquare(rand)
                    store.dispatch("setBackup", this.board)
                }, 20*i);
            }
        },
        toggleSquare(index){
                /** list of squares to change */
                let changeList = [{index: index, status: !this.board[index]}]
                /** check left */
                if(index % this.game.width != 0){
                    changeList.push({index: index-1, status: !this.board[index-1]})
                    // console.log('left')
                }
                /** check above */
                if(index >= this.game.width){
                    changeList.push({index: index-this.game.width, status: !this.board[index-this.game.width]})
                    // console.log('above')
                }
                /** check right */
                if(index % this.game.width < (this.game.width-1)){
                    changeList.push({index: index+1, status: !this.board[index+1]})
                    // console.log('right')
                }
                /** check below */
                if((index+this.game.width) < this.numOfBoxesToRender){
                    changeList.push({index: index+this.game.width, status: !this.board[index+this.game.width]})
                    // console.log('below')
                }
                store.dispatch('updateBoard', changeList)
                
        },
        handleClick(index){
            if(this.active){
                this.toggleSquare(index)
                store.dispatch('setClickCount', this.moveCount+1)
                this.checkWin()
            }
        },
        checkWin(){
            
            let numOfTrue = 0
            this.board.forEach(square => {
                if(square == true){
                    numOfTrue++
                }
            })
            
            if(numOfTrue == 0 || numOfTrue == this.numOfBoxesToRender) {
                
                setTimeout(this.winAnimation(), 1000)
            }
        },
        winAnimation(){
            bus.$emit('stopTimer')
            this.active = false
            setTimeout(() => {
                store.dispatch('setActiveScreen', 'win')
            }, 2000)
        }
    },
    components: {
        GameSquare
    },
    beforeMount(){
        this.buildGameBoard()
        bus.$emit('restartTimer')
        this.active = true
    },
    created (){
        bus.$on('newBoard', () => {
            this.active = true
            this.buildGameBoard()
            bus.$emit('restartTimer')
        })
    },
    beforeDestroy(){
        clearTimeout(this.gameTimer)
        this.active = false
    },
    onMount(){

        this.windowWidth = this.$refs.gameWindow
        alert(this.$refs.gameWindow)
    }

}
</script>

<style scoped>
.game-window {
    box-sizing: border-box;
    border: 1px solid transparent;
    flex: 1;
    display: grid;
    padding: 0.05px;

}
.main-window {
    flex: 1;
    display: flex;
    flex-direction: column;
}


.main-window div {
    flex: 1;
}

</style>