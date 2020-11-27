<template>
    <!-- <GamePause v-if="!game.active" /> -->
    <transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in">
        <GameWindow v-if="activeScreen == 'active'" />
        <GameWinPage v-else-if="activeScreen == 'win'" /> 
        <GameNewPage v-else/>
    </transition>
</template>
  
<script>
import { mapGetters } from 'vuex'
import GameNewPage from './GameNewPage'
import GameWinPage from './GameWinPage'
import GameWindow from './GameWindow'

export default {
    components: {
        GameNewPage,
        GameWinPage,
        GameWindow
    },
    computed: {
        ...mapGetters({
            activeScreen: "activeScreen"
        })
    },
    watch: {

    }

}
</script>

<style>

.main-window {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.main-window div {
    flex: 1;
}

</style>