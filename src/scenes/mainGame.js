import C4C from 'c4c-lib';
import {printlnToConsole, printToConsole} from '../consoleOperations.js';
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
import Salmon from '../assets/Salmon.png';
import RedSnapper from '../assets/RedSnapper.png';
import Shark from '../assets/Shark.png';
import Swordfish from '../assets/Swordfish.png';
import Pufferfish from '../assets/Pufferfish.png';
import Megalodon from '../assets/Megalodon.png';
// Bait images:
import Apple from '../assets/Apple.png';
import Pizza from '../assets/Pizza.png';
import Cake from '../assets/Cake.png';


// Fish Data:
const depthZone = [
    {min: 200, max: 300}, // Shallow
    {min: 300, max: 400}, // Mid
    {min: 400, max: 500},  // Deep
    {min: 500, max: 600},  // Very Deep
    {min: 570, max: 610}  // Abyss
    ]

const fishSpecies = [
    {type: 'Minnow', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Minnow', displayX: 70, displayY: 15, price: 1},
    {type: 'Carp', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Carp', displayX: 100, displayY: 50, price: 1},
    {type: 'Bluegill', speedRange: [-100, 100], depth: depthZone[0], imgName: 'Bluegill', displayX: 70, displayY: 40, price: 1},
    {type: 'Bass', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Bass', displayX: 110, displayY: 40, price: 2},
    {type: 'Catfish', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Catfish', displayX: 110, displayY: 50, price: 2},
    {type: 'Trout', speedRange: [-120, 120], depth: depthZone[1], imgName: 'Trout', displayX: 100, displayY: 30, price: 2},
    {type: 'Salmon', speedRange: [-140, 140], depth: depthZone[2], imgName: 'Salmon', displayX: 105, displayY: 40, price: 3},
    {type: 'Tuna', speedRange: [-140, 140], depth: depthZone[2], imgName: 'Tuna', displayX: 110, displayY: 45, price: 3},
    {type: 'RedSnapper', speedRange: [-140, 140], depth: depthZone[2], imgName: 'RedSnapper', displayX: 90, displayY: 40, price: 3},
    {type: 'Shark', speedRange: [-160, 160], depth: depthZone[3], imgName: 'Shark', displayX: 135, displayY: 70, price: 4},
    {type: 'Swordfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'Swordfish', displayX: 145, displayY: 60, price: 4},
    {type: 'Pufferfish', speedRange: [-160, 160], depth: depthZone[3], imgName: 'Pufferfish', displayX: 65, displayY: 50, price: 4},
    {type: 'Megalodon', speedRange: [-200, 200], depth: depthZone[4], imgName: 'Megalodon', displayX: 500, displayY: 300, price: 100},
    ]

const functions = [
    {
        name: "print",
        arguments: ["message"],
        description: "Prints out the message passed in to the in-game console."
    },
    {
        name: "addBait",
        arguments: ["baitType"],
        description: "Adds a bait to the hook. Valid options: 'apple', 'pizza', 'cake'. Player must own the bait."
    },
    {
        name: "cast",
        arguments: ["length"],
        description: "Casts the hook into the water. Optionally specify a length (default 100, max 500)."
    }
];


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
        // Fish Images
        this.load.image('Minnow', Minnow);
        this.load.image('Carp', Carp);
        this.load.image('Bluegill', Bluegill);
        this.load.image('Trout', Trout);
        this.load.image('Catfish', Catfish);
        this.load.image('Bass', Bass);
        this.load.image('Tuna', Tuna);
        this.load.image('Salmon', Salmon);
        this.load.image('RedSnapper', RedSnapper);
        this.load.image('Shark', Shark);
        this.load.image('Swordfish', Swordfish);
        this.load.image('Pufferfish',Pufferfish);
        this.load.image('Megalodon', Megalodon);
        // Bait Images
        this.load.image('apple', Apple);
        this.load.image('pizza', Pizza);
        this.load.image('cake', Cake);

    }

    create(){
    // Add images
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(400, 110, 'player').setDisplaySize(180,120);
        this.player.setCollideWorldBounds(true);

        // Create text displaying coin amount
        this.coinText = this.add.text(30, 30, 'Coins: ' + this.registry.get('coins'), {
            fontSize: '20px',
            fill: '#000'
        });
        this.registry.events.on( // Automatically update text
            'changedata-coins',
            this.onCoinsChanged,
            this
        );
          this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.registry.events.off(
            'changedata-coins',
            this.onCoinsChanged,
            this
            );
        });

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
            f.price = species.price;
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
        this.baitAdded = false;

    // Default text in console
        printlnToConsole(`Enter your code in the editor! manual() to see various functions!`);

    // Keyboard Input
        this.cursor = this.input.keyboard.createCursorKeys();

        
    // Define functions used in the C4C written coding area---------------------

    // addBait(baitType)
    C4C.Interpreter.define('addBait', (baitType) => {
    if (!this.canCast) return;
    if (!baitType) return;
    baitType = String(baitType).toLowerCase();

    const baitMap = {
        apple: 'boughtApple',
        pizza: 'boughtPizza',
        cake: 'boughtCake'
    };

    const registryKey = baitMap[baitType];
    if (!registryKey) {
        //console.log("Invalid bait type");
        return;
    }

    const isPurchased = this.registry.get(registryKey);
    if (!isPurchased) {
        //console.log("Bait not purchased");
        return;
    }

    this.baitAdded = true;
    this.baitChosen = baitType;
    //console.log("Bait added:", baitType);
});

    C4C.Interpreter.define('manual', () => {
        printlnToConsole("---------------------");
        for (const fn of functions) {
            const args = fn.arguments.join(", ");
            printlnToConsole(`${fn.name}(${args}) - ${fn.description}`);
        }
        printlnToConsole("---------------------");
    })

    C4C.Interpreter.define('cast', (length) => {
    if (!this.canCast) return;

    if (length === undefined) length = 100;
    else if (length > 500) length = 500;

    this.moveFreely = false;
    this.canCast = false;

    const hookX = this.rightFacing
        ? this.player.x + 90
        : this.player.x - 90;

    const hookY = this.player.y - 60;

    // Create physics hook normally (NOT inside container)
    this.hook = this.physics.add.sprite(hookX, hookY, 'hook')
        .setDisplaySize(15, 30);

    this.hook.body.allowGravity = false;

    // Create bait attached visually by positioning relative to hook
    if (this.baitAdded) {
        this.bait = this.add.sprite(hookX, hookY + 20, this.baitChosen)
            .setDisplaySize(25, 25);

        this.hasBaitOnHook = true;
    } else {
        this.hasBaitOnHook = false;
    }

    this.baitAdded = false;

    // Tween hook downward
    this.tweens.add({
        targets: this.hook,
        y: length + 100,
        duration: 1000,
        ease: 'Power2',
        onUpdate: () => {
            // Make bait follow hook manually
            if (this.bait) {
                this.bait.x = this.hook.x;
                this.bait.y = this.hook.y + 20;
            }
        },
        onComplete: () => {
            this.hookCollider = this.physics.add.overlap(
                this.hook,
                this.fishGroup,
                handleOverlap,
                null,
                this
            );

            this.time.delayedCall(3000, resumeGame, null, this);
        }
    });
});




// Additional Functions ----------------------------------------------------------------
    
    function handleOverlap(hook, fish) {
        // Disable collider immediately
        if (this.hookCollider) {
            this.physics.world.removeCollider(this.hookCollider);
            this.hookCollider = null;
        }

            let coins = this.registry.get('coins');
            coins += fish.price || 1;
            this.registry.set('coins', coins);

            // Consume bait if it exists
            if (this.hasBaitOnHook && this.bait) {
                this.bait.destroy();
                this.bait = null;
                this.hasBaitOnHook = false;
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
        // Remove overlap collider
        if (this.hookCollider) {
            this.physics.world.removeCollider(this.hookCollider);
            this.hookCollider = null;
        }
        // Destroy bait if still attached
        if (this.bait) {
            this.bait.destroy();
            this.bait = null;
        }
        // Destroy hook
        if (this.hook) {
            this.hook.destroy();
            this.hook = null;
        }
        // Reset variables
        this.hasBaitOnHook = false;
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


    if(this.moveFreely) {
        // Boat & Raccoon movement
            if (this.cursor.left.isDown) {
                this.player.setVelocityX(-speed);
                this.player.setFlipX(true);
                this.rightFacing = false;
                this.canCast = false;
                this.bobObject(this.player, 10, 1000, 1)
            } else if (this.cursor.right.isDown) {
                this.player.setVelocityX(speed);
                this.player.setFlipX(false);
                this.rightFacing = true;
                this.canCast = false;
                this.bobObject(this.player, 10, 1000, 1)
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
                f.price = species.price;
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

    onCoinsChanged(parent, value) {
        this.coinText.setText('Coins: ' + value);
    }

    /**
     * Makes the selected object go up and down for the selected duration and distance
     *
     * @param obj - The obj that will bob
     * @param distance - The max distance to bob in one direction
     * @param duration - The amount of time the object should bob for, measured in milliseconds
     * @param cycles - The amount of times the boat should go up and down
     */
    bobObject(obj, distance, duration, cycles){
        if(obj.bobTween && obj.bobTween.isPlaying()) return;

        obj.bobTween = this.tweens.add({
            targets: obj,
            y: obj.y - distance,
            duration: duration / 2,
            yoyo: true,
            repeat: cycles - 1
        })
    }
}

