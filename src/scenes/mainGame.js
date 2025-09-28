import C4C from 'c4c-lib';
import { gameLoopSpeed } from '..';
import background from '../assets/bkg.png';
import boat from '../assets/boat.png';
import Phaser from 'phaser';
import hook from '../assets/hook-testAsset.png';
import raccoon from '../assets/raccoon.png';

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('MainGame');

        this.speed = 100;
        
    }

    preload(){
        this.load.image('background', background);
        this.load.image('raccoon',raccoon);
        this.load.image('boat', boat);
        this.load.image('hook', hook);

    }

    create(){
    // Add images
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.raccoon = this.physics.add.sprite(400, 110, 'raccoon').setDisplaySize(115,110);
        this.boat = this.physics.add.sprite(400, 140, 'boat').setDisplaySize(170, 60);

        this.boat.setCollideWorldBounds(true);
        this.raccoon.setCollideWorldBounds(true);

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
            this.boat.setVelocityX(-speed);
            this.raccoon.setVelocityX(-speed);
            this.raccoon.setFlipX(false);
        } else if (this.cursor.right.isDown) {
            this.boat.setVelocityX(speed);
            this.raccoon.setVelocityX(speed);
            this.raccoon.setFlipX(true);
        } else {
            this.boat.setVelocityX(0);
            this.raccoon.setVelocityX(0);
        }

    // Functions
}
}