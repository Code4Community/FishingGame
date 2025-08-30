import C4C from 'c4c-lib';

export default class TackleBox extends Phaser.Scene{
    constructor(){
        super('TackleBox');
    }

    preload(){

    }

    create(){
        C4C.Editor.setText(`// Information about methods goes here\n:)\n`);
    }

    update(){
        // Game Logic
    }

    // Functions
}