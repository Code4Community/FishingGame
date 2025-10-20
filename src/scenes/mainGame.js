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
        this.length = 100;
        
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
        
            const depthZone = [
                {min: 200, max: 300}, // Shallow
                {min: 300, max: 400}, // Mid
                {min: 400, max: 500},  // Deep
                {min: 500, max: 600},  // Very Deep
                {min: 545, max: 580}  // Abyss
            ]

            // Fish Species
            const fishSpecies = [
                {type: 'Minnow', speedRange: [-100, 100], depth: depthZone[0]},
                {type: 'Carp', speedRange: [-100, 100], depth: depthZone[0]},
                {type: 'Bluegill', speedRange: [-100, 100], depth: depthZone[0]},
                {type: 'Bass', speedRange: [-120, 120], depth: depthZone[1]},
                {type: 'Sunfish', speedRange: [-120, 120], depth: depthZone[1]},
                {type: 'Trout', speedRange: [-120, 120], depth: depthZone[1]},
                {type: 'Catfish', speedRange: [-140, 140], depth: depthZone[2]},
                {type: 'Tuna', speedRange: [-140, 140], depth: depthZone[2]},
                {type: 'Red Snapper', speedRange: [-140, 140], depth: depthZone[2]},
                {type: 'Blobfish', speedRange: [-160, 160], depth: depthZone[3]},
                {type: 'Swordfish', speedRange: [-160, 160], depth: depthZone[3]},
                {type: 'Pufferfish', speedRange: [-160, 160], depth: depthZone[3]},
                {type: 'Megalodon', speedRange: [-200, 200], depth: depthZone[4]},
            ]

        this.fishGroup = this.physics.add.group();
        for (let i = 0; i< 13; i++) {

            // Random starting position
            const species = Phaser.Utils.Array.GetRandom(fishSpecies);
            const startX = Phaser.Math.Between(100, 700);
            const startY = Phaser.Math.Between(species.depth.min + 10, species.depth.max - 10);
            let velocityX = Phaser.Math.RND.pick([species.speedRange[0], species.speedRange[1]]);
            if (velocityX === 0) velocityX = 100; // ensure nonzero


            // Create fish
            const f = this.physics.add.image(startX, startY, 'fish').setDisplaySize(100, 50);
            f.body.allowGravity = false;
            f.setVelocity(velocityX, 0);
            f.setBounce(1, 1);
            f.setCollideWorldBounds(true);
            f.depthRange = species.depth;

            // Flip sprite based on direction
            f.setFlipX(velocityX > 0);

            this.fishGroup.add(f);
        }

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
       
        this.fishGroup.children.iterate((fish) => {
            // Flip sprite based on velocity
            if(fish.body.velocity.x > 0) {
                fish.setFlipX(true);
            } else if (fish.body.velocity.x < 0) {
                fish.setFlipX(false);
            }

            // Bounce fish within depth range
            if (fish.body.blocked.left || fish.body.blocked.right) {
                const newY = Phaser.Math.Between(fish.depthRange.min, fish.depthRange.max);
                fish.setY(newY);
                fish.setVelocityX(-fish.body.velocity.x);
            }
        })
    }
}

