<template>
    <div id="app">
        <GameHeader />
        <GameControls />
        <GameContainer />
        <GameFooter> ColorSwapGame made by Johno</GameFooter>
    </div>
</template>

<script>

import GameHeader from './components/GameHeader'
import GameControls from './components/GameControls'
import GameFooter from './components/GameFooter'
import GameContainer from './components/GameContainer'

import { store } from './store'
import { bus } from './main'
import { mapGetters } from 'vuex'

export default {
    name: 'App',
    data(){
        return {
            gameTimer: null
        }
    },
    components: {
        GameHeader,
        GameControls,
        GameFooter,
        GameContainer
    },
    computed: {
        ...mapGetters({
            game: "game",
            gameTimeCounter: "gameTimeCounter"
        })
    },
    created() {
        bus.$on('restartTimer', () => {
            if(this.gameTimer){
                clearInterval(this.gameTimer)
            }
            store.dispatch('setTimeCount', parseInt(0))
            this.gameTimer = setInterval(() => {
                store.dispatch('setTimeCount', parseInt(this.gameTimeCounter)+1)
            }, 1000)
        })
        bus.$on('stopTimer', () => {
            clearInterval(this.gameTimer)
        })
    }
}
</script>

<style>
#app {
  text-align: center;
  color: #353531;
  margin: 0px auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}



</style>
