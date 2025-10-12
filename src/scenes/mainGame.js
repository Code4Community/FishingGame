import C4C from 'c4c-lib';
import { gameLoopSpeed } from '..';
import background from '../assets/bkg.png';
import Phaser from 'phaser';
import hook from '../assets/hook-testAsset.png';
import player from '../assets/raccoonAndBoat.png';
import fish from '../assets/testFish.png';

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('MainGame');

        this.speed = 100;
        
    }

    preload(){
        this.load.image('background', background);
        this.load.image('hook', hook);
        this.load.image('player', player);
        this.load.image('fish', fish);

    }

    create(){
    // Add images
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(400, 110, 'player').setDisplaySize(180,120);
        this.player.setCollideWorldBounds(true);
        this.fish = this.physics.add.image(400, 200, 'fish').setDisplaySize(100, 50);
        this.fish.setVelocity(-140, 0);
        this.fish.setBounceX(1, 0);
        this.fish.setCollideWorldBounds(true);


    // C4C default text
        C4C.Editor.setText(`// Enter your code here!\n`);


    // Keyboard Input
        this.cursor = this.input.keyboard.createCursorKeys();

    // Define functions used in the written code----------------------------
        
    // THIS DOES NOTHING ATM
        C4C.Interpreter.define('cast', (speed) => {
            if (speed === undefined) {
                speed = 100;
            }
            this.boat.flipY;
            // Stop after 1 game loop
            setTimeout(() => {
                try {
                    this.boat.flipY;
                } catch (e){};
            }, gameLoopSpeed);
        })
        // ----------------------------------------------------------------
    }

    update(){

    // Conditional logic for keyboard controls
    const speed = this.cursor.shift.isDown ? 300 : 160;

        // Boat & Raccoon movement
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.fish.body.velocity.x < 0) {
            this.fish.setFlipX(false); // facing right
        } else if (this.fish.body.velocity.x > 0) {
            this.fish.setFlipX(true); // facing left
        }

        // Fish movement
        if (this.fish.body.blocked.left || this.fish.body.blocked.right) {
            this.fish.setY(this.getRandomY());
        }

        // Functions
    }

    getRandomY = () => {
        return Math.floor(Math.random() * (80)) + 185;
    }
}