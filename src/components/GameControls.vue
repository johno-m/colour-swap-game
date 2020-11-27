<template>
    <div id="controls" v-if="game">
        <!--  -->
        <div class="section">
            <h2><span></span>Controls<span></span></h2>
            <div class="buttons">
                <button @click="newGame()" :class="(highlightNewButton || activeScreen == 'new') ? 'pulse-btn' : ''">New</button>
                <button @click="resetGame()">Reset</button>
                <button v-if="activeScreen != 'new'" @click="showMenu = !showMenu">
                    <img src="../assets/gear-option.svg" alt="Settings button" />
                </button>
            </div> 
        </div>
        <div class="section" v-if="activeScreen == 'new' || showMenu">
            <h2><span></span>Difficulty<span></span></h2>
            <div class="buttons">
                <button :class="(selectedDifficulty == 5) ? 'selected' : 'unselected'" @click="setDifficulty(5)">Easy</button>
                <button :class="(selectedDifficulty == 10) ? 'selected' : 'unselected'" @click="setDifficulty(10)">Hard</button>
                <button :class="(selectedDifficulty == 20) ? 'selected' : 'unselected'" @click="setDifficulty(20)">Insane</button>
            </div>
        </div> 
        <div class="section" v-else>Click Count <H1>{{moveCount}}</h1></div>
        <div class="section" v-if="activeScreen == 'new' || showMenu">
            <h2><span></span>Grid Size<span></span></h2>
            <div class="buttons circle">
                <button v-for="index in options" :class="(selectedSize == index) ? 'selected' : 'unselected'" :key="index" @click="setSize(index)">{{index}}</button>
            </div>
        </div>
        <div class="section" v-else>Timer <H1>{{humanGameTime()}}</h1></div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { store } from '../store'
import { bus } from '../main'

export default {
    data(){
        return {
            options: [4, 5, 6, 7],
            selectedSize: null,
            selectedDifficulty: null,
            showMenu: false
        }
    },
    computed: {
        ...mapGetters({
            game: "game",
            board: "board",
            activeScreen: "activeScreen",
            gameTimeCounter: "gameTimeCounter",
            moveCount: "moveCount"
        }),
        highlightNewButton(){
            if(this.selectedSize != this.game.width || this.selectedDifficulty != this.game.difficulty){
                return true
            } else {
                return false
            }
            
        }
    },
    methods: {
        newGame(){
            let options = {
                width: this.selectedSize,
                difficulty: this.selectedDifficulty
            }
            if(this.activeScreen != 'active'){
                store.dispatch("startNewGame", options)
                store.dispatch('setActiveScreen', 'active')
            } else {
                if(confirm("Are you sure?")){
                store.dispatch("startNewGame", options)
                    store.dispatch("clearBoard", options)
                    bus.$emit('newBoard')
                }
            }
        },
        resetGame(){
            if(confirm("Are you sure?")){
                store.dispatch("resetBoard")
            }
        },
        setSize(size){
            this.selectedSize = size
        },
        setDifficulty(difficulty){
            this.selectedDifficulty = difficulty
        },
        humanGameTime: function(){
            if(this.gameTimeCounter < 60){
                return `${this.gameTimeCounter}s`
            } else {
                let minutes = Math.floor(this.gameTimeCounter / 60)
                let seconds = this.gameTimeCounter - (minutes * 60)
                return `${minutes}m & ${seconds}s`
            }
        }
    },
    mounted(){
        this.selectedDifficulty = this.game.difficulty
        this.selectedSize = this.game.width
    }
}
</script>

<style scoped>
#controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: left;
}

h1 {
    margin: 10px 0px 0px 0px;
    padding: 0px;
}

h2 {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0px;
    color: #b9b9b9;
    height: 20px;
    line-height: 20px;
    width: 90%;
    margin: 8px auto;
}
h2 span {
    flex: 1;
    border-bottom: 1px solid #cccccc;
    margin: 0px 10px 0px 10px;
    height: 9px;
}

#controls button {
    padding: 10px 15px;
    margin: 0px 10px;
    background: #690375;
}

#controls button img {
    display: inline-block;
    width: 20px;
    margin: -5px;
}

#controls button:hover {
    background: #e24650;
}

#controls .section .selected {
    background: #FF5964;
}

.section {
    flex: 30%;
}

.circle button {
    border-radius: 50%;
}

.pulse-btn {
    animation: pulse 1.5s infinite;
    -webkit-animation: pulse 1.5s infinite;
    animation-timing-function: ease-in-out;
}
.pulse-btn:hover {
    animation:none;
  -webkit-animation: none;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.0)
  }

  50% {
    transform: scale(1.2);
    background: #81268b;
  }
}

@keyframes color-pulse {
  0%, 100% {
    background: #690375;
  }

  50% {
    background: #81268b;
  }
}

@media (prefers-reduced-motion) {
  .animation {
    animation: color-pulse 1.5s infinite;
    -webkit-animation: color-pulse 1.5s infinite;
    animation-timing-function: ease-in-out;
  }
}

</style>