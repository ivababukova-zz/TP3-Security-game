var Encrypt = Encrypt || {};

//loading the game assets
Encrypt.Preload = function(){};

Encrypt.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/map32x32.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('32x32TileSet1Encrypt', 'assets/EncryptTileSets/32x32TileSet1Encrypt.png');
    this.load.image('clue', 'assets/images/GameIcons/Clue.png');
    this .load.image('door', 'assets/images/32pixelPlayer.png');
    this .load.image('ceiling', 'assets/images/32pixelPlayer.png');
    // this.load.image('firewall', 'assets/images/GameIcons/Firewall.png');
    this.load.spritesheet('player', 'assets/images/32x32ExampleSprite.png', 95, 158, 48);

  },
  create: function() {
    this.state.start('Game');
  }
};
