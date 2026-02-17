import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    // Global game state (runs once)

    // Global variables set in the registry:-------------------------------
    this.registry.set('coins', 0);

    // Fish caught status
    this.registry.set('caughtMinnow', false);
    this.registry.set('caughtCarp', false);
    this.registry.set('caughtBluegill', false);
    this.registry.set('caughtTrout', false);
    this.registry.set('caughtCatfish', false);
    this.registry.set('caughtBass', false);
    this.registry.set('caughtTuna', false);
    this.registry.set('caughtSalmon', false);
    this.registry.set('caughtRedSnapper', false);
    this.registry.set('caughtShark', false);
    this.registry.set('caughtSwordfish', false);
    this.registry.set('caughtPufferfish', false);
    this.registry.set('caughtMegalodon', false);

    // Items purchased status
    this.registry.set('boughtWorms', false);
    this.registry.set('boughtApple', false);
    this.registry.set('boughtEquip', false);
    this.registry.set('boughtFlag', false);
    this.registry.set('boughtPizza', false);
    
    //+
    this.registry.set('boughtCake', false);
    this.registry.set('boughtCrown', false);
    
    // --------------------------------------------------------------------

    // Prevent accidental resets if Boot is re-run
    if (!this.registry.has('coins')) {
        this.registry.set('coins', 0);
    }

    // Start the main game
    this.scene.start('MainGame');
  }
}
