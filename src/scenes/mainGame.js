import C4C from 'c4c-lib';
import { gameLoopSpeed } from '..';
import background from '../assets/bkg.png';
import Phaser from 'phaser';
import hook from '../assets/hook-testAsset.png';
import player from '../assets/raccoonAndBoat.png';

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('MainGame');

        this.speed = 100;
        this.length = 100;
        
    }

    preload(){
        this.load.image('background', background);
        this.load.image('hook', hook);
        this.load.image('player', player);

    }

    create(){
    // Add images
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(400, 110, 'player').setDisplaySize(180,120);
        this.player.setCollideWorldBounds(true);

    // Variables
        this.moveFreely = true;
        this.rightFacing = true;

    // C4C default text
        C4C.Editor.setText(`// Enter your code here!\n`);


    // Keyboard Input
        this.cursor = this.input.keyboard.createCursorKeys();

    // Define functions used in the written coding area---------------------

        // addBait(bait type)

        // cast(length)
        C4C.Interpreter.define('cast', (length) => {
            if (length === undefined) {
                length = 100;
            }
            // Create hook
            if (this.rightFacing){
                this.hook = this.physics.add.sprite(this.player.x + 90, this.player.y - 60, 'hook').setDisplaySize(30,30);
            } else {
                this.hook = this.physics.add.sprite(this.player.x - 90, this.player.y - 60, 'hook').setDisplaySize(30,30);
            }
            // Stop/freeze player movements
                this.moveFreely = false;

            // Move hook down according to length arg
                this.tweens.add({
                    targets: this.hook, // The sprite you want to move
                    y: length + 100,           // The target Y coordinate
                    duration: 1000,       // Duration of the tween in milliseconds
                    ease: 'Power2',       // Easing function for smoother animation (optional)
                    onComplete: () => {
                        // Code to execute when the sprite reaches the target position
                        //Detect Collisions:
                            //ADD CODE
                        // Waiting Period, then resume game
                            this.timedEvent = this.time.delayedCall(3000, resumeGame, null, this);
                    }
                });

            // Stop after 1 game loop
            setTimeout(() => {
                try {
                  // ?

                } catch (e){};
            }, gameLoopSpeed);
        })
 
    // ----------------------------------------------------------------
    // Other Functions:
        
        function resumeGame() {
            this.hook.destroy();
            this.moveFreely = true;
        }

    }


    update(){

    // Conditional logic for keyboard controls
    const speed = this.cursor.shift.isDown ? 300 : 160;

    if(this.moveFreely) {
        // Boat & Raccoon movement
            if (this.cursor.left.isDown) {
                this.player.setVelocityX(-speed);
                this.player.setFlipX(true);
                this.rightFacing = false;
            } else if (this.cursor.right.isDown) {
                this.player.setVelocityX(speed);
                this.player.setFlipX(false);
                this.rightFacing = true;
            } else {
                this.player.setVelocityX(0);
            } 
    }
       
    // Functions
}
}

