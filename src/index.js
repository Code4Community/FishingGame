// This is the starting point of your application
import C4C from 'c4c-lib';
import Phaser from 'phaser';
import MainGame from './scenes/mainGame';
import TackleBox from './scenes/tacklebox';
import MyFish from './scenes/myfish';
import Market from './scenes/market'

// Load style.css into our page
import './assets/style.css';

// Constants, sizes
    const gameWidth = 800;
    const gameHeight = 600;

// Theme for the C4C editor.  Look into the codemirror documentation for more options
const theme = {
    "&": {
        color: "#00007F",
        backgroundColor: "#fafafa",
        height: gameHeight + "px",
        width: "calc(100vw - "+gameWidth+"px)",        
    }
}

// Create the C4C editor
// The functions that you want the code editor to autocomplete
// If you want to add more on the fly depending on the scene, you will have to create a new editor
const autocompleteFunctions = ['cast', 'addBait'];
C4C.Editor.create(document.getElementById('code-editor'), theme, false, autocompleteFunctions);

// Create the game
const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    // Where the game is located (id of the DOM element)
    parent: 'game-container',
    // All the scenes in the game
    scene: [MainGame, TackleBox, MyFish, Market]
}

const game = new Phaser.Game(config);

game.scene.start('MainGame');


// This is only for stepEval code, you can delete this line otherwise
// StepEval does not currently allow functions to be defined in the code editor
const codeRunner = C4C.Runner.createRunner();
// Runs 1 step of code every second
const gameLoopSpeed = 1000;
var gameLoop;


// Switch the scene whenever the "Tackle Box" button is pressed
document.getElementById('tackle-box').addEventListener('click', () => {
    // Stop running any code that's currently running
    codeRunner.reset();
    clearInterval(gameLoop);
    // If the current scene is mainGame.js, or myfish.js, switch to tacklebox.js
    if (game.scene.isActive('MainGame')) {
        game.scene.stop('MainGame');
        game.scene.start('TackleBox');
    } else if(game.scene.isActive('MyFish')){
        game.scene.stop('MyFish');
        game.scene.start('TackleBox');
    } else {
        game.scene.stop('TackleBox');
        game.scene.start('MainGame');
    }
});

// Switch the scene whenever the "My Fish" button is pressed
document.getElementById('my-fish').addEventListener('click', () => {
    // Stop running any code that's currently running
    codeRunner.reset();
    clearInterval(gameLoop);
    // If the current scene is mainGame.js, or tacklebox.js, switch to myfish.js
    if (game.scene.isActive('MainGame')) {
        game.scene.stop('MainGame');
        game.scene.start('MyFish');
    } else if(game.scene.isActive('TackleBox')){
        game.scene.stop('TackleBox');
        game.scene.start('MyFish');
    } else {
        game.scene.stop('MyFish');
        game.scene.start('MainGame');
    }
});

// Switch the scene whenever the "Market" button is pressed
document.getElementById('market').addEventListener('click', () => {
    // Stop running any code that's currently running
    codeRunner.reset();
    clearInterval(gameLoop);
    // If the current scene is mainGame.js, or myfish.js, switch to tacklebox.js
    if (game.scene.isActive('MainGame')) {
        game.scene.stop('MainGame');
        game.scene.start('Market');
    } else if(game.scene.isActive('MyFish')){
        game.scene.stop('MyFish');
        game.scene.start('Market');
    } else {
        game.scene.stop('TackleBox');
        game.scene.start('MainGame');
    }
});

// Run the code whenever the "Run Code" button is pressed
document.getElementById('run-code').addEventListener('click', () => {
    // Get the code from the editor, and remove any comments
    const code = C4C.Editor.getText().replaceAll(/\/\/.*/g, '');
    console.log(code)

    // We want to use stepEval to run the code one line at a time
    codeRunner.programText = code;
    codeRunner.reset();
    clearInterval(gameLoop);
    // Make sure the code works before running it
    try {
        codeRunner.check();
    } catch (e) {
        // You may want to give better feedback here
        alert("There's a problem in your code: "+e);
        return;
    }

    // Restart the gameloop right now
    // Note phaser has a way to do a game loop that's probably better than this, I would look into using that instead maybe
    codeRunner.step();
    gameLoop = setInterval(() => codeRunner.step(), gameLoopSpeed)
});


export {gameLoopSpeed};