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
    this.load.tilemap('level1', 'assets/tilemaps/finalMap.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('TileSet1Encrypt', 'assets/EncryptTileSets/TileSet1Encrypt.png');
    this.load.image('clue', 'assets/images/GameIcons/Clue.png');
    this.load.image('greencup', 'assets/images/greencup.png');
    this.load.image('bluecup', 'assets/images/bluecup.png');
    this.load.image('player', 'assets/images/Player1.png');
    this.load.image('browndoor', 'assets/images/browndoor.png');
    this.load.image('browndoorRotated', 'assets/images/browndoorRotated.png');

  },
  create: function() {
    this.state.start('Game');
  }
};
