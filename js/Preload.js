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
    this.load.image('passNote', 'assets/images/GameIcons/PasswordNote.png');
    this.load.image('firewall', 'assets/images/GameIcons/Firewall.png');
    this.load.image('antivirus', 'assets/images/GameIcons/AntiVirus.png');
    this.load.image('antikeylogger', 'assets/images/GameIcons/AntiKeyLogger.png');
    this.load.image('policy', 'assets/images/GameIcons/PasswordPolicySheet.png');
    this.load.image('player', 'assets/images/Player1.png');

  },
  create: function() {
    this.game.state.start('MainMenu');
  }
};
