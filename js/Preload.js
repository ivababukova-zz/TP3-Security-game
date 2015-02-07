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
    this.load.tilemap ('level1', 'assets/tilemaps/map32x32.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image ('32x32TileSet1Encrypt', 'assets/EncryptTileSets/32x32TileSet1Encrypt.png');

    // pickable items:
    this.load.image ('clue', 'assets/images/GameIcons/Clue.png');
    this.load.image ('bluePolicy', 'assets/images/GameIcons/PasswordPolicySheetBlue.png');
    this.load.image ('redPolicy', 'assets/images/GameIcons/PasswordPolicySheetRed.png');
    this.load.image ('greenPolicy', 'assets/images/GameIcons/PasswordPolicySheetGreen.png');
    this.load.image ('magentaPolicy', 'assets/images/GameIcons/PasswordPolicySheetMagenta.png');
    this.load.image ('yellowPolicy', 'assets/images/GameIcons/PasswordPolicySheetYellow.png');
    this.load.image ('firewall', 'assets/images/GameIcons/Firewall.png');
    this.load.image ('AntiKeyLog', 'assets/images/GameIcons/AntiKeyLogger.png');
    this.load.image ('info', 'assets/images/GameIcons/Info.png');
    this.load.image ('antivirus', 'assets/images/GameIcons/AntiVirus.png');

    this.load.image ('enemy', 'assets/images/Virus.png');

    // player and door animations
    this.load.spritesheet ('player', 'assets/images/32x32ExampleSprite.png', 64, 64, 30);
    this.load.spritesheet ('frontDoor','assets/images/Animations/DoorAnimations/FrontDoorAnimationFrames.png', 64, 64, 17, 0, 0 );
    this.load.spritesheet ('sideDoor', 'assets/images/Animations/DoorAnimations/SideDoorAnimationFrames.png', 128, 128, 17, 0, 0);

    //main menu images
    this.load.image('space', 'assets/images/BackDrop.png');
    this.load.image('space2', 'assets/images/MLetters.png');

    // buttons:
    this.load.image('backButton', 'assets/images/gobackButtonIva.png');
    this.load.image('instructionsButton', 'assets/images/instructionsButton.png');
    this.load.image('restartButton', 'assets/images/restart_button.png');

  },
  create: function() {
    // this.state.start('MainMenu');
    this.state.start('MainMenu');
  }
};
