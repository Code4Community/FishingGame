import C4C from 'c4c-lib';
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
        C4C.Editor.setText(`// Information about methods goes here\n:)\n`);

        // Background
        this.add.image(400, 300, 'tackle').setDisplaySize(800, 600);
    }

    update(){
        // Game Logic
    }

    // Functions
}