<template>
    <div id="win-screen" class="main-window col">
        <h1>You Win!</h1>
        <h2>You beat the game on a {{game.width}}x{{game.width}} board in {{humanGameTime}} on the {{humanDifficulty}} setting!</h2>
        <button @click="newGame()">Play Again</button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { store } from '../store'
import { bus } from '../main'

export default {
    computed: {
        ...mapGetters({
            board: "board",
            game: "game",
            difficulty: "difficulty",
            backupBoard: "backupBoard",
            moveCount: "moveCount",
            gameTimeCounter: "gameTimeCounter"
        }),
        humanGameTime: function(){
            if(this.gameTimeCounter < 60){
                return `${this.gameTimeCounter} seconds`
            } else {
                let minutes = Math.floor(this.gameTimeCounter / 60)
                let seconds = this.gameTimeCounter - (minutes * 60)
                return `${minutes} minutes & ${seconds} seconds`
            }
        },
        humanDifficulty: function(){
            switch(this.game.difficulty){
                case 5: {
                    return 'easy'
                }
                case 10: {
                    return 'hard'
                }
                case 20: {
                    return 'insane'
                }
                default: {
                    return 'an unknown'
                }
            }
        }
    
    },
    methods: {
        newGame(){
            let options = {
                width: this.game.width,
                difficulty: this.difficulty
            }
            store.dispatch("startNewGame", options)
            store.dispatch("clearBoard", options)
            bus.$emit('newBoard')
            store.dispatch('setActiveScreen', 'active')
        }
    }
}
</script>

<style scoped>

#win-screen {
    align-items: center;
}

button {
    background: #eda202;
    transform: scale(1.5);
}

button:hover {
    background: #dd9701;
    box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.1);
    transform: scale(1.6);
}

h1 {
    font-size: 5rem;
    padding-bottom: 0px;
    margin-bottom: 0px;
}

h2 {
    padding-bottom: 25px;
}



</style>
