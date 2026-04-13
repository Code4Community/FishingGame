import C4C from 'c4c-lib';
import {printlnToConsole, printToConsole} from '../consoleOperations.js';
import tackleBkg from '../assets/Tackle_bkg.png';
import apple from '../assets/Tackle_apple.png';
import worm from '../assets/Tackle_worm.png';
import pizza from '../assets/Tackle_pizza.png';
import flag from '../assets/Tackle_flag.png';
import equip from '../assets/Tackle_equip.png';
import crown from '../assets/Tackle_crown.png';
import cake from '../assets/Tackle_cake.png';
import baitFor from '../assets/Tackle_baitFor.png';

export default class TackleBox extends Phaser.Scene{
    constructor(){
        super('TackleBox');
    }

    preload(){
        this.load.image('bkg', tackleBkg);

        this.load.image('Apple', apple);
        this.load.image('Worms', worm);
        this.load.image('Pizza', pizza);
        this.load.image('Flag', flag);
        this.load.image('Equip', equip);
        this.load.image('Crown', crown);
        this.load.image('Cake', cake);
        this.load.image('BaitFor', baitFor);
    }

    create(){
        // Text Window
        printlnToConsole("Learn about the tools you own and how to use them!");

        // Background
        this.add.image(400, 300, 'bkg').setDisplaySize(800, 600);

        const items = ['Apple', 'Worms', 'Pizza', 'Flag', 'Equip', 'Crown', 'Cake', 'BaitFor'];
        
        for (const item of items){
            if (this.registry.get('bought'+ item)){
                this.add.image(400, 300, item).setDisplaySize(800,600); // If you own the item, add the image
                }
        }

        // const items = [
        //     {name: 'Worms', type: 'Bait', itemID: 1, description: "Use as a parameter in the addBait() method."},
        //     {name: 'Apple', type: 'Bait', itemID: 2, description: "Use as a parameter in the addBait() method."},
        //     {name: 'Equip', type: 'Method', itemID: 3, description: "An instance method.\n// Use on either Rico or the boat to equip an item.\n// Example:\n// Rico.equip(crown);\n// boat.equip(flag);"},
        //     {name: 'Flag', type: 'Item', itemID: 4, description: "Use as a parameter in the boat.equip() method."},
        //     {name: 'Pizza', type: 'Bait', itemID: 5, description: "Use as a parameter in the addBait() method."},
        //     {name: 'BaitFor', type: 'Method', itemID: 6, description: "A static method.\n// Use to find what bait is needed for each species of fish. \n// Example:\n// baitFor(tuna);"},
        //     {name: 'Cake', type: 'Bait', itemID: 7, description: "Use as a parameter in the addBait() method."},
        //     {name: 'Crown', type: 'Item', itemID: 8, description: "Use as a parameter in the Rico.equip() method."},
        // ]

    }

    update(){
        // Game Logic
    }

    // Functions
}