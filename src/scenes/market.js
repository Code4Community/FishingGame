import C4C from 'c4c-lib';

export default class Market extends Phaser.Scene{
    constructor(){
        super('Market');
    }

    preload(){

    }

    create(){
        C4C.Editor.setText(`// You can buy things here\n$__\n`);
    }

    update(){
        // Game Logic
    }

    // Functions
}