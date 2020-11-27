<template>
    <div id="new-game-screen" class="row main-window">
        <div class="instructions-panel col">
            <div class="row">
                <video src="http://www.johnomckay.co.uk/example.m4v" preload="true"
                    loop muted autoplay></video>
                <div class="col">
                    <h2>Instructions</h2>
                    <p>
                        Click on a square to change it and all adjacent squares colours. Try to get all the squares to the same colour in as few clicks as possible.
                    </p>
                    <p>The higher the difficulty, the more steps necessary to win.</p>
                    <span class="cta-p">Click the flashing new button to begin</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        
    }
    
}
</script>

<style>
#new-game-screen {
    justify-content: space-evenly;
    align-items: left;
}

#new-game-screen button {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    margin: 10px;
    background: #fbaf2d;
}
video {
    width: 450px;
}

section {

}
#new-game-screen button:hover {
    box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.2);
}

#new-game-screen p {
    margin: 0px;
    line-height: 180%;
    text-align: left;
    padding: 10px;
}

.buttons-panel h3 {
    margin: 0px 0px 10px 0px;
}

.buttons-panel {
    background: rgba(0, 0, 0, 0.03);
    padding: 20px;
    border-radius: 30px;
    margin: 30px;
}

.instructions-panel h2 {
    margin-top: 50px;
    margin-bottom: 10px;
}

.instructions-panel span {
    margin-top: 10px;
    font-weight: bold;
    color: #fbaf2d;
}


</style>