import C4C from 'c4c-lib';
import { gameLoopSpeed } from '..';
import background from '../assets/bkg.png';
import Phaser from 'phaser';
import hook from '../assets/Hook.png';
import player from '../assets/raccoonAndBoat.png';
import fish from '../assets/testFish.png';
import line from '../assets/line.png'
// Fish images:
import Minnow from '../assets/Minnow.png';
import Carp from '../assets/Carp.png';
import Bluegill from '../assets/Bluegill.png';
import Trout from '../assets/Trout.png';
import Catfish from '../assets/Catfish.png';
import Bass from '../assets/Bass.png';
import Tuna from '../assets/Tuna.png';
// Bait images:



export default class MainGame extends Phaser.Scene{
    constructor(){
        super('MainGame');

        this.speed = 100;
        this.length = 100;
        this.baitType = '';
        
    }

    preload(){
        this.load.image('background', background);
        this.load.image('hook', hook);
        this.load.image('player', player);
        this.load.image('fish', fish);
        this.load.image('line', line);
        // Fish images
        this.load.image('Minnow', Minnow);
        this.load.image('Carp', Carp);
        this.load.image('Bluegill', Bluegill);
        this.load.image('Trout', Trout);
        this.load.image('Catfish', Catfish);
        this.load.image('Bass', Bass);
        this.load.image('Tuna', Tuna);
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
                {type: 'Minnow', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Minnow', displayX: 70, displayY: 15},
                {type: 'Carp', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Carp', displayX: 100, displayY: 50},
                {type: 'Bluegill', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Bluegill', displayX: 70, displayY: 40},
                {type: 'Bass', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Bass', displayX: 110, displayY: 40},
                {type: 'Catfish', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Catfish', displayX: 110, displayY: 50},
                {type: 'Trout', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Trout', displayX: 100, displayY: 30},
                {type: 'Salmon', speedRange: [-140, 140], depth: depthZone[2], imgName: 'fish', displayX: 100, displayY: 50},
                {type: 'Tuna', speedRange: [-140, 140], depth: depthZone[2], imgName: 'Tuna', displayX: 110, displayY: 45},
                {type: 'Red Snapper', speedRange: [-140, 140], depth: depthZone[2], imgName: 'fish', displayX: 100, displayY: 50},
                {type: 'Blobfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
                {type: 'Swordfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
                {type: 'Pufferfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
                {type: 'Megalodon', speedRange: [-200, 200], depth: depthZone[4], imgName: 'fish', displayX: 100, displayY: 50},
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
            const f = this.physics.add.sprite(startX, startY, species.imgName).setDisplaySize(species.displayX, species.displayY);
            f.fishName = species.type;
            f.body.allowGravity = false;
            f.setBounce(1, 1);
            f.setCollideWorldBounds(true);
            f.depthRange = species.depth;

            // Flip sprite based on direction
            f.setFlipX(velocityX > 0);

            this.fishGroup.add(f);
            f.setVelocity(velocityX, 0);
        }

    // Variables
        this.moveFreely = true;
        this.rightFacing = true;
        this.canCast = true;

    // C4C default text
        C4C.Editor.setText(`// Enter your code here!\n`);


    // Keyboard Input
        this.cursor = this.input.keyboard.createCursorKeys();

    // Define functions used in the C4C written coding area---------------------

    // addBait(baitType)
    C4C.Interpreter.define('addBait', (baitType) => {
    if (this.canCast) {
        valid = false;

        if (baitType === undefined) {
            baitType = '';
        } 
        else if (baitType != ''){
            // TODO
            // Check if baitType entered is valid & unlocked (using global variables)--> change boolean 'valid' accordingly
            // Retrieve the corresponding image path string
            baitImgVar = baitType.toLowercase();
        }

        // Create bait sprite iff baitType is valid & unlocked
        if (baitType != '' && valid) {
            if (this.rightFacing) {
                this.bait = this.physics.add.sprite(this.player.x + 90, this.player.y - 60, baitImgVar).setDisplaySize(15, 30);
            } else {
                this.bait = this.physics.add.sprite(this.player.x - 90, this.player.y - 60, baitImgVar).setDisplaySize(15, 30);
            }
        }
        // TODO
        // Find a way to make the bait follow/tween with the hook (add this.bait in cast method?)
    }
});

    // cast(length)
    C4C.Interpreter.define('cast', (length) => {
    if (this.canCast) {
        if (length === undefined) length = 100;
        else if (length > 500) length = 500;

        // Create hook sprite
        if (this.rightFacing) {
            this.hook = this.physics.add.sprite(this.player.x + 90, this.player.y - 60, 'hook').setDisplaySize(15, 30);
        } else {
            this.hook = this.physics.add.sprite(this.player.x - 90, this.player.y - 60, 'hook').setDisplaySize(15, 30);
        }

        this.moveFreely = false;
        this.canCast = false;

        // fishing line particle emitter
        const hookemitter = this.add.particles('line', {
            frame: 'black',
            speed: 50,
            scale: { start: 0.5, end: 0},
            blendMode: 'ADD',
            lifespan: 1000,
        });

        //add hookemitter to hook
        hookemitter.startFollow(this.hook, 0, 0)

        // Tween hook downward
        this.tweens.add({
            targets: this.hook,
            y: length + 100,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Store collider reference
                this.hookCollider = this.physics.add.overlap(
                    this.hook,
                    this.fishGroup,
                    handleOverlap,
                    null,
                    this
                );
                // Reset if no collision after delay
                this.time.delayedCall(3000, resumeGame, null, this);
            },
        });
    }
});


// Additional Functions ----------------------------------------------------------------
    
    function handleOverlap(hook, fish) {
        // Disable collider immediately
        if (this.hookCollider) {
            this.physics.world.removeCollider(this.hookCollider);
            this.hookCollider = null;
        }

        // Stop both and attach fish to hook
        fish.body.setVelocity(0);
        fish.setY(hook.y + 10);

        // Show popup
        showCatchPopup.call(this, fish);

        // Make them rise together
        this.tweens.add({
            targets: [hook, fish],
            y: 110,
            duration: 1500,
            ease: 'Power1',
            onComplete: () => {
                fish.destroy();
                hook.destroy();
            },
        });
    }

    function showCatchPopup(fish) {
        const fishName = fish.fishName || 'a Fish?';

        // Create popup text near top center
        const popup = this.add.text(this.player.x, 100, `Caught a ${fishName}!`, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffffff',
            backgroundColor: '#16517bff',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5);

        // Animate popup fading and moving up
        this.tweens.add({
            targets: popup,
            y: 60,
            alpha: 0,
            duration: 8000,
            ease: 'Power3',
            onComplete: () => popup.destroy(),
        });
}

    function resumeGame() {
        // Clean up collider if still active
        if (this.hookCollider) {
            this.physics.world.removeCollider(this.hookCollider);
            this.hookCollider = null;
        }
        // Destroy hook
        if (this.hook) {
            this.hook.destroy();
            this.hook = null;
        }
        // Reset variables
        this.moveFreely = true;
        this.canCast = true;
    }
//--------------------------------------------------------------------------------------
    }

    update(){

    // Conditional logic for keyboard controls
    const speed = this.cursor.shift.isDown ? 300 : 160;
    const depthZone = [
        {min: 200, max: 300}, // Shallow
        {min: 300, max: 400}, // Mid
        {min: 400, max: 500},  // Deep
        {min: 500, max: 600},  // Very Deep
        {min: 545, max: 580}  // Abyss
    ]

    // Fish Species
    const fishSpecies = [
        {type: 'Minnow', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Minnow', displayX: 70, displayY: 15},
        {type: 'Carp', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Carp', displayX: 100, displayY: 50},
        {type: 'Bluegill', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Bluegill', displayX: 70, displayY: 40},
        {type: 'Bass', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Bass', displayX: 110, displayY: 40},
        {type: 'Catfish', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Catfish', displayX: 110, displayY: 50},
        {type: 'Trout', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Trout', displayX: 100, displayY: 30},
        {type: 'Salmon', speedRange: [-140, 140], depth: depthZone[2], imgName: 'fish', displayX: 100, displayY: 50},
        {type: 'Tuna', speedRange: [-140, 140], depth: depthZone[2], imgName: 'Tuna', displayX: 110, displayY: 45},
        {type: 'Red Snapper', speedRange: [-140, 140], depth: depthZone[2], imgName: 'fish', displayX: 100, displayY: 50},
        {type: 'Blobfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
        {type: 'Swordfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
        {type: 'Pufferfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'fish', displayX: 100, displayY: 50},
        {type: 'Megalodon', speedRange: [-200, 200], depth: depthZone[4], imgName: 'fish', displayX: 100, displayY: 50},
    ]

    if(this.moveFreely) {
        // Boat & Raccoon movement
            if (this.cursor.left.isDown) {
                this.player.setVelocityX(-speed);
                this.player.setFlipX(true);
                this.rightFacing = false;
                this.canCast = false;
            } else if (this.cursor.right.isDown) {
                this.player.setVelocityX(speed);
                this.player.setFlipX(false);
                this.rightFacing = true;
                this.canCast = false;
            } else {
                this.player.setVelocityX(0);
                this.canCast = true;
            } 
    }
       
        this.fishGroup.children.iterate((fish) => {
            // Flip sprite based on velocity
            if(fish.body.velocity.x > 0) {
                fish.setFlipX(true);
            } else if (fish.body.velocity.x < 0) {
                fish.setFlipX(false);
            }

            // Delete fish if out of screen bounds and spawn new
            if (fish.x < -150 || fish.x > this.scale.width + 150) {
                fish.destroy();
                // Random starting position
                const species = Phaser.Utils.Array.GetRandom(fishSpecies);
                const startX = Phaser.Math.Between(100, 700);
                const startY = Phaser.Math.Between(species.depth.min + 10, species.depth.max - 10);
                let velocityX = Phaser.Math.RND.pick([species.speedRange[0], species.speedRange[1]]);
                if (velocityX === 0) velocityX = 100; // ensure nonzero

                // Create fish
                const f = this.physics.add.sprite(startX, startY, species.imgName).setDisplaySize(species.displayX, species.displayY);
                f.fishName = species.type;
                f.body.allowGravity = false;
                f.setBounce(1, 1);
                f.setCollideWorldBounds(true);
                f.depthRange = species.depth;

                // Flip sprite based on direction
                f.setFlipX(velocityX > 0);

                // Tween for fade-in effect
                f.alpha = 0; // Start fully transparent
                this.tweens.add({
                    targets: f,
                    alpha: 1, // Fade in to full opacity
                    duration: 1000, // 1 second duration
                    ease: 'Power2', // Optional easing function
                });

                this.fishGroup.add(f);
                f.setVelocity(velocityX, 0);
            }
        })
    }
}

