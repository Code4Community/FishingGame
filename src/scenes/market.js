import C4C from 'c4c-lib';
import marketBkg from '../assets/Marketbkg.PNG';
import item1 from '../assets/Market1-worms.PNG';

export default class Market extends Phaser.Scene{
    constructor(){
        super('Market');
    }

    preload(){
        this.load.image('marketBkg', marketBkg);
        this.load.image('item1', item1);
    }

    create(){
    // Add images
        this.add.image(400, 300, 'marketBkg').setDisplaySize(800, 600);
        // Items for sale: Create & store
        this.itemImages = {
            1: this.add.image(400, 300, 'item1').setDisplaySize(800, 600)
        };

        const items = [
                {item: 'item1', name: 'Worms', price: 5, type: 'Bait', itemID: 1, description: "Use as a parameter in the addBait() method."},
        ]

        // Default text:
        C4C.Editor.setText(`// To see item info, enter item number and run:\n details()\n`);


        // Define functions used in the C4C written coding area---------------------
        C4C.Interpreter.define('details', (ID) => {
            ID = Number(ID);
            const i = items.find(item => item.itemID === ID);

            // Handles invalid input:
            if (!i) {
                C4C.Editor.setText(`// To see item info, enter item number and run:\n details()\n// Please enter a valid number!\n`);
                return;
            }
            // Item Details in text editor:
            C4C.Editor.setText(
                `// Item ID: ${i.itemID}\n` +
                `// Name: ${i.name}\n` +
                `// Type: ${i.type}\n` +
                `// Price: $${i.price}\n\n` +
                `// Description: ${i.description}\n\n`+
                `details()`
            );

             highlightItem(ID);
        });

        // Additional Functions ----------------------------------------------------------------
        
        // Grays out all other items
        const highlightItem = (itemID) => {
        Object.entries(this.itemImages).forEach(([id, img]) => {
            if (Number(id) === itemID) {
                img.clearTint();
                img.setAlpha(1);
            } else {
                img.setTint(0x888888); // grey tint
                img.setAlpha(0.5);     // faded
            }
        });
    };
    }

    update(){
        // Game Logic
    }

    // Functions
}