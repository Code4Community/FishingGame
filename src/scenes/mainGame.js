import C4C from 'c4c-lib';
import { gameLoopSpeed } from '..';
import background from '../assets/lake-testAsset.jpg';
import boat from '../assets/testBoat.png';
import Phaser from 'phaser';

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('MainGame');

        this.speed = 100;
        
    }

    preload(){
        this.load.image('background', background);
        this.load.image('boat', boat);

    }

    create(){
    // Add images
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.boat = this.physics.add.sprite(400, 300, 'boat').setDisplaySize(130, 100);

        this.boat.setCollideWorldBounds(true);

    // C4C default text
        C4C.Editor.setText(`// Enter your code here!\n`);


    // Keyboard Input
        this.cursor = this.input.keyboard.createCursorKeys();
  
    // Define functions used in the written code----------------------------
        
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
        if (this.cursor.left.isDown) {
            this.boat.setVelocityX(-speed);
        } else if (this.cursor.right.isDown) {
            this.boat.setVelocityX(speed);
        } else {
            this.boat.setVelocityX(0);
        }

    }

    // Functions
}