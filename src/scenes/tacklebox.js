import C4C from 'c4c-lib';
import {printlnToConsole, printToConsole} from '../consoleOperations.js';
import tackle from '../assets/tackle-testAsset.jpg';

export default class TackleBox extends Phaser.Scene{
    constructor(){
        super('TackleBox');
    }

    preload(){
        this.load.image('tackle', tackle);
    }

    create(){
        // Text Window
        printlnToConsole("Information about methods goes above")
        printlnToConsole(":)")

        // Background
        this.add.image(400, 300, 'tackle').setDisplaySize(800, 600);
    }

    update(){
        // Game Logic
    }

    // Functions
}