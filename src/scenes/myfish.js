import C4C from 'c4c-lib';
import { printlnToConsole } from '../consoleOperations.js';

export default class MyFish extends Phaser.Scene{
    constructor(){
        super('MyFish');
    }

    preload(){

    }

    create(){
        printlnToConsole("Information about fish goes above")
        printlnToConsole(":)")    }

    update(){
        // Game Logic
    }

    // Functions
}