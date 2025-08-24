import C4C from 'c4c-lib';

export default class Guidebook extends Phaser.Scene{
    constructor(){
        super('Guidebook');
    }

    preload(){

    }

    create(){
        C4C.Editor.setText(`// New Information\n:)\n`);
    }

    update(){
        // Game Logic
    }

    // Functions
}