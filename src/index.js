// This is the starting point of your application
import C4C from 'c4c-lib';
import Phaser from 'phaser';
import MainGame from './scenes/mainGame';
import Guidebook from './scenes/guidebook';

// Load style.css into our page
import './assets/style.css'


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
const autocompleteFunctions = ['moveRight', 'moveLeft', 'cast'];
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
    scene: [MainGame, Guidebook]
}

const game = new Phaser.Game(config);

game.scene.start('MainGame');


// This is only for stepEval code, you can delete this line otherwise
// StepEval does not currently allow functions to be defined in the code editor
const codeRunner = C4C.Runner.createRunner();
// Runs 1 step of code every second
const gameLoopSpeed = 1000;
var gameLoop;


// Switch the scene whenever the "Log Book" button is pressed
document.getElementById('log-book').addEventListener('click', () => {
    // Stop running any code that's currently running
    codeRunner.reset();
    clearInterval(gameLoop);
    // If the current scene is mainGame.js, switch to guidebook.js
    if (game.scene.isActive('MainGame')) {
        game.scene.stop('MainGame');
        game.scene.start('Guidebook');
    } else {
        game.scene.stop('Guidebook');
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




// // This is a flag to determine whether or not the game should listen to keyboard events always.
// // If false, the game will only listen to keyboard events when you click on the game window
// const keyboardAlwaysActive = false;


// game.input.keyboard.enabled = keyboardAlwaysActive;
// game.input.keyboard.preventDefault = true;
// game.input.keyboard.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT', 'SHIFT', 'SPACE']);

// // Capture keyboard events when the game is in focus
// document.getElementById('game-container').addEventListener('click', () => {
//     game.input.keyboard.enabled = true;
//     document.getElementById('game-container').classList.add('active');
//     // Blur the code editor or any buttons that are currently active    
//     document.activeElement.blur();
// })

// // Release keyboard events when the game is out of focus
// document.addEventListener('click', (e) => {
//     if (e.target.id === 'game-container' || e.target.parentNode.id === 'game-container') return;
//     game.input.keyboard.enabled = keyboardAlwaysActive;
//     document.getElementById('game-container').classList.remove('active');
// })


// // Export the game loop speed so that it can be used in the scene files

export {gameLoopSpeed};