import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    // Global game state (runs once)

    // Global variables set in the registry:-------------------------------
    this.registry.set('coins', 0);
    this.registry.set('caughtMinnow', false);

    
    // --------------------------------------------------------------------

    // Prevent accidental resets if Boot is re-run
    if (!this.registry.has('coins')) {
        this.registry.set('coins', 0);
    }

    // Start the main game
    this.scene.start('MainGame');
  }
}
