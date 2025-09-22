import C4C from 'c4c-lib';

export default class MyFish extends Phaser.Scene{
    constructor(){
        super('MyFish');
    }

    preload(){

    }

    create(){
        C4C.Editor.setText(`// Information about fish goes here\n:)\n`);
    }

    update(){
        // Game Logic
    }

    // Functions
}