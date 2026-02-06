import C4C from 'c4c-lib';
import marketBkg from '../assets/Marketbkg.PNG';
import item1 from '../assets/Market1-worms.PNG';
import item2 from '../assets/Market2-apple.png';
import item3 from '../assets/Market3-equip.png';
import item4 from '../assets/Market4-flag.png';
import item5 from '../assets/Market5-pizza.png';

import item7 from '../assets/Market7-cake.png';
import item8 from '../assets/Market8-crown.png';

export default class Market extends Phaser.Scene{
    constructor(){
        super('Market');
    }

    preload(){
        this.load.image('marketBkg', marketBkg);
        this.load.image('item1', item1);
        this.load.image('item2', item2);
        this.load.image('item3', item3);
        this.load.image('item4', item4);
        this.load.image('item5', item5);

        this.load.image('item7', item7);
        this.load.image('item8', item8);
    }

    create(){

    // Add images
        this.add.image(400, 300, 'marketBkg').setDisplaySize(800, 600);
        // Items for sale: Create & store
        this.itemImages = {
            1: this.add.image(400, 300, 'item1').setDisplaySize(800, 600),
            2: this.add.image(400, 300, 'item2').setDisplaySize(800, 600),
            3: this.add.image(400, 300, 'item3').setDisplaySize(800, 600),
            4: this.add.image(400, 300, 'item4').setDisplaySize(800, 600),
            5: this.add.image(400, 300, 'item5').setDisplaySize(800, 600),

            7: this.add.image(400, 300, 'item7').setDisplaySize(800, 600),
            8: this.add.image(400, 300, 'item8').setDisplaySize(800, 600)
        };

        // Create text displaying coin amount
        this.coinText = this.add.text(30, 30, 'Coins: ' + this.registry.get('coins'), {
            fontSize: '20px',
            fill: '#000'
        });
        this.registry.events.on( // Automatically update text
            'changedata-coins',
            this.onCoinsChanged,
            this
        );
          this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.registry.events.off(
            'changedata-coins',
            this.onCoinsChanged,
            this
            );
        });

        const items = [
                {item: 'item1', name: 'Worms', price: 5, type: 'Bait', itemID: 1, description: "Use as a parameter in the addBait() method."},
                {item: 'item2', name: 'Apple', price: 10, type: 'Bait', itemID: 2, description: "Use as a parameter in the addBait() method."},
                {item: 'item3', name: 'Equip', price: 20, type: 'Method', itemID: 3, description: "An instance method.\n// Use on either Rico or the boat to equip an item.\n// Example:\n// Rico.equip(crown);\n// boat.equip(flag);"},
                {item: 'item4', name: 'Flag', price: 10, type: 'Bait', itemID: 4, description: "Use as a parameter in the boat.equip() method."},
                {item: 'item5', name: 'Pizza', price: 15, type: 'Bait', itemID: 5, description: "Use as a parameter in the addBait() method."},

                {item: 'item7', name: 'Cake', price: 25, type: 'Bait', itemID: 7, description: "Use as a parameter in the addBait() method."},
                {item: 'item8', name: 'Crown', price: 50, type: 'Bait', itemID: 8, description: "Use as a parameter in the Rico.equip() method."},
        ]

        // Default text:
        C4C.Editor.setText(`// To see item info, enter item number and run: details()\n`);


        // Define functions used in the C4C written coding area---------------------
        C4C.Interpreter.define('details', (ID) => {
            ID = Number(ID);
            const i = items.find(item => item.itemID === ID);

            // Handles invalid input:
            if (!i) {
                C4C.Editor.setText(`// To see item info, enter item number and run: details()\n// Please enter a valid number!\n`);
                return;
            }
            // Item Details in text editor:
            C4C.Editor.setText(
                `// Item ID: ${i.itemID}\n` +
                `// Name: ${i.name}\n` +
                `// Type: ${i.type}\n` +
                `// Price: ${i.price} coins\n\n` +
                `// Description: ${i.description}\n\n`+
                `// To see item info, enter item number and run: details()\n`
            );

             highlightItem(ID);
        });

        C4C.Interpreter.define('buy', (ID) => {
            ID = Number(ID);
            const i = items.find(item => item.itemID === ID);
            // Handles invalid input:
            if (!i) {
                C4C.Editor.setText(`// Invalid input, try again!`);
                return;
            }
            // Variables:
            let coins = this.registry.get('coins');
            let boughtStatus = this.registry.get('bought'+i.name);
            // Check if the item has been purchased already:
            if(boughtStatus){
                C4C.Editor.setText(`//You've already purchased this item!`);
                return;
            }
            // Purchase if able:
            if (coins >= i.price) {
                this.registry.set('coins', coins -= i.price);
                this.registry.set('bought'+i.name, true);
                //DELETE IMAGE HERE
            } else {
                C4C.Editor.setText(`// You don't have enough coins!`);
                return;
            }
        });

        // Additional Functions ----------------------------------------------------------------
        
        // Grays out all other items
        const highlightItem = (itemID) => {
        Object.entries(this.itemImages).forEach(([id, img]) => {
            if (Number(id) === itemID) {
                img.clearTint();
            } else {
                img.setTint(0x888888); // grey tint
            }
        });
    };
    }

    update(){
        // Game Logic
    }

    // Functions

    onCoinsChanged(parent, value) {
        this.coinText.setText('Coins: ' + value);
    }
}