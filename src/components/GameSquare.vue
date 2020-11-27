<template>
    <div class="spacer">
        <div :class="`square ${selected ? 'selected' : 'unselected'} ${!active ? 'win-square' : ''}`">
        
        </div>
    </div>
    
</template>

<script>
export default {
    props: ['selected', 'handleClick', 'active'],
    methods: {

    }
}
</script>

<style scoped>

.spacer {
    padding: 5%;
}

.square {
    width: 100%;
    padding-bottom: 100%;
    border-radius: 10%;
    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.unselected {
    background: #00d0cb;
}

.unselected:hover {
    background: #3eddda;
    transform: scale(1.02);
    box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.2);
}

.selected:hover {
    background: #fbaf2d;
    transform: scale(1.02);
    box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.2);
}

.selected {
    background: #fbaf2d;
}

.win-square {
    animation: winanimation 1.5s infinite;
    -webkit-animation: winanimation 1.5s infinite;
    animation-timing-function: ease-in-out;
}

@keyframes winanimation {
    0%, 100% {
        background: #fbaf2d;
    }

    50% {
        background: #3eddda;
    }
    
}

</style>