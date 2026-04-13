import C4C from 'c4c-lib';

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
import { printlnToConsole } from '../consoleOperations.js';

export default class MyFish extends Phaser.Scene{
    constructor(){
        super('MyFish');
    }

    preload(){

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

    }

    create(){

        let swordCaught = this.registry.get('caughtSwordfish');
        if (swordCaught){
            this.add.image(400, 300, 'Swordfish').setDisplaySize(800, 600);
        } else {
            this.add.image(400, 300, 'Swordfish').setDisplaySize(800, 600).setTint(0x888888);
        }
        

        printlnToConsole("Information about fish goes above");
        printlnToConsole(":)");
        printlnToConsole(swordCaught);
        }

    update(){
        // Game Logic
    }

    // Functions
}